/** Small, dependency-free helpers for scroll-driven animation. */

export const MOBILE_QUERY = "(max-width: 860px)";
export const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

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

/**
 * Progress (0..1) through a pinned section: 0 when its top reaches the
 * viewport top, 1 when its bottom reaches the viewport bottom.
 */
export function progressOf(el: HTMLElement): number {
  const total = el.offsetHeight - window.innerHeight;
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
