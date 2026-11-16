/** Small, dependency-free helpers for scroll-driven animation. */

export const MOBILE_QUERY = "(max-width: 860px)";
export const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
/** Layouts that drop pinned/horizontal scroll: phones and reduced motion. */
export const STACKED_QUERY = `${MOBILE_QUERY}, ${REDUCED_MOTION_QUERY}`;

export function clamp(v: number, min = 0, max = 1): number {
  return Math.min(max, Math.max(min, v));
}

/** Progress (0..1) of `p` through the sub-range [a, b]. */
export function seg(p: number, a: number, b: number): number {
  return clamp((p - a) / (b - a));
}

export function easeOut(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

/** Devices where Lenis smooth scrolling makes sense (mouse/trackpad). Touch keeps native scrolling. */
export const FINE_POINTER_QUERY = "(hover: hover) and (pointer: fine)";

let stableHeight = 0;
let stableWidth = 0;

/**
 * Viewport height that ignores mobile browser toolbars sliding in and out.
 *
 * On iOS (Safari, Chrome, the Google app) the toolbars change
 * `window.innerHeight` and fire `resize` mid-scroll. Anything sized or
 * animated from it jumps. This measures the small viewport (`100svh`, the
 * height with toolbars shown) and only re-measures when the width changes,
 * i.e. on rotation, never on toolbar show/hide.
 */
export function stableViewportHeight(): number {
  const width = window.innerWidth;
  if (stableHeight && width === stableWidth) return stableHeight;
  const probe = document.createElement("div");
  const unit = CSS.supports("height", "100svh") ? "100svh" : "100vh";
  probe.style.cssText = `position:fixed;top:0;left:0;width:0;height:${unit};visibility:hidden;pointer-events:none`;
  document.body.appendChild(probe);
  stableHeight = probe.offsetHeight || window.innerHeight;
  probe.remove();
  stableWidth = width;
  return stableHeight;
}

/**
 * Progress (0..1) through a pinned section: 0 when its top reaches the
 * viewport top, 1 when its bottom reaches the viewport bottom.
 */
export function progressOf(el: HTMLElement): number {
  const total = el.offsetHeight - stableViewportHeight();
  if (total <= 0) return 0;
  return clamp(-el.getBoundingClientRect().top / total);
}

export function isMobile(): boolean {
  return window.matchMedia(MOBILE_QUERY).matches;
}

export function prefersReducedMotion(): boolean {
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

export function formatINR(value: number, decimals = 0): string {
  return (
    "₹" +
    value.toLocaleString("en-IN", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    })
  );
}

/** Animate a number from 0 to `to` over `ms`, calling `onFrame` each frame. Returns a cancel fn. */
export function countUp(
  to: number,
  ms: number,
  onFrame: (value: number) => void,
): () => void {
  let raf = 0;
  const t0 = performance.now();
  const tick = (t: number) => {
    const k = clamp((t - t0) / ms);
    onFrame(to * easeOut(k));
    if (k < 1) raf = requestAnimationFrame(tick);
  };
  raf = requestAnimationFrame(tick);
  return () => cancelAnimationFrame(raf);
}
