"use client";

import Lenis from "lenis";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { isMobile, prefersReducedMotion } from "@/lib/motion";

type Updater = () => void;

interface ScrollContextValue {
  /** Register a callback run on every scroll frame and on resize. Returns unsubscribe. */
  subscribe: (fn: Updater) => () => void;
}

const ScrollContext = createContext<ScrollContextValue | null>(null);

const SNAP_IDLE_MS = 180;
const SNAP_RANGE = 0.3; // fraction of viewport height
const SNAP_DURATION = 0.9;
const ANCHOR_DURATION = 1.4;

/* Wheel feel. Lower lerp = softer glide; the caps stop a hard flick from
   racing to the bottom of the page. */
const WHEEL_LERP = 0.07;
const WHEEL_MULTIPLIER = 0.8;
const MAX_DELTA_PER_EVENT = 100; // px
const MAX_AHEAD = 0.8; // how far (in viewports) the target may lead the page

const expoOut = (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t));

/** Section edges worth settling on: tops of [data-snap] and [data-snap-pin], ends of pinned sections, page bottom. */
function snapPoints(): number[] {
  const vh = window.innerHeight;
  const points: number[] = [];
  document
    .querySelectorAll<HTMLElement>("[data-snap], [data-snap-pin]")
    .forEach((el) => {
      const top = el.getBoundingClientRect().top + window.scrollY;
      points.push(top);
      const pinned = el.hasAttribute("data-snap-pin") && el.offsetHeight > vh * 1.1;
      if (pinned) points.push(top + el.offsetHeight - vh);
    });
  // The very bottom is a resting place too, so a short footer is never pulled back up.
  points.push(document.documentElement.scrollHeight - vh);
  return points;
}

export default function ScrollProvider({ children }: { children: React.ReactNode }) {
  const updaters = useRef(new Set<Updater>());

  const subscribe = useCallback((fn: Updater) => {
    updaters.current.add(fn);
    return () => {
      updaters.current.delete(fn);
    };
  }, []);

  useEffect(() => {
    const runAll = () => updaters.current.forEach((fn) => fn());
    const reduced = prefersReducedMotion();

    let lenis: Lenis | null = null;
    let raf = 0;
    if (!reduced) {
      const instance = new Lenis({
        lerp: WHEEL_LERP,
        wheelMultiplier: WHEEL_MULTIPLIER,
        smoothWheel: true,
        virtualScroll: (data) => {
          if (!data.event.type.includes("wheel")) return true;
          let d = Math.max(-MAX_DELTA_PER_EVENT, Math.min(MAX_DELTA_PER_EVENT, data.deltaY));
          const ahead = instance.targetScroll - instance.animatedScroll;
          const room = window.innerHeight * MAX_AHEAD;
          if (Math.sign(d) === Math.sign(ahead)) {
            d = Math.sign(d) * Math.min(Math.abs(d), Math.max(0, room - Math.abs(ahead)));
          }
          if (d === 0) {
            // Fully capped: swallow the tick so the browser doesn't scroll natively.
            if (data.event.cancelable) data.event.preventDefault();
            return false;
          }
          data.deltaY = d;
          return true;
        },
      });
      lenis = instance;
      const loop = (time: number) => {
        lenis?.raf(time);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    }

    let idle: ReturnType<typeof setTimeout> | undefined;
    const trySnap = () => {
      if (!lenis || isMobile()) return;
      const y = window.scrollY;
      let best: number | null = null;
      let bestDist = Infinity;
      for (const p of snapPoints()) {
        const d = Math.abs(p - y);
        if (d < bestDist) {
          bestDist = d;
          best = p;
        }
      }
      if (best !== null && bestDist > 2 && bestDist < window.innerHeight * SNAP_RANGE) {
        lenis.scrollTo(best, { duration: SNAP_DURATION, easing: expoOut });
      }
    };

    const onScroll = () => {
      runAll();
      clearTimeout(idle);
      idle = setTimeout(trySnap, SNAP_IDLE_MS);
    };

    // Smooth in-page anchor navigation.
    const onClick = (e: MouseEvent) => {
      if (!lenis) return;
      const link = (e.target as Element | null)?.closest<HTMLAnchorElement>('a[href^="#"]');
      if (!link) return;
      const hash = link.getAttribute("href") ?? "";
      const target = hash === "#" || hash === "#top" ? 0 : document.querySelector<HTMLElement>(hash);
      if (target === null) return;
      e.preventDefault();
      lenis.scrollTo(target, { duration: ANCHOR_DURATION, easing: expoOut });
    };

    if (lenis) lenis.on("scroll", onScroll);
    else window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", runAll);
    document.addEventListener("click", onClick);
    runAll();

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(idle);
      lenis?.destroy();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", runAll);
      document.removeEventListener("click", onClick);
    };
  }, []);

  const value = useMemo(() => ({ subscribe }), [subscribe]);
  return <ScrollContext.Provider value={value}>{children}</ScrollContext.Provider>;
}

/** Run `cb` on every scroll frame, on resize, and once on mount. */
export function useScrollUpdate(cb: Updater): void {
  const ctx = useContext(ScrollContext);
  const latest = useRef(cb);
  useEffect(() => {
    latest.current = cb;
  });

  useEffect(() => {
    if (!ctx) return;
    const fn = () => latest.current();
    fn();
    return ctx.subscribe(fn);
  }, [ctx]);
}
