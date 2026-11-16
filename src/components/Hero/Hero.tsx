"use client";

import { useRef } from "react";
import { useScrollUpdate } from "../scroll/ScrollProvider";
import { clamp, prefersReducedMotion, stableViewportHeight } from "@/lib/motion";
import { SIGNUP_URL } from "@/lib/site";
import ScaffoldDrawing from "./ScaffoldDrawing";
import styles from "./Hero.module.css";

export default function Hero() {
  const artRef = useRef<HTMLDivElement>(null);

  // Drawing drifts down and fades as the page scrolls away.
  useScrollUpdate(() => {
    const art = artRef.current;
    if (!art || prefersReducedMotion()) return;
    const y = window.scrollY;
    art.style.transform = `translate3d(0, ${y * 0.25}px, 0) scale(${1 + y * 0.0003})`;
    art.style.opacity = String(1 - clamp(y / (stableViewportHeight() * 0.9)));
  });

  return (
    <section id="top" className={`${styles.hero} gridBg`} data-snap>
      <div className={styles.inner}>
        <div className={styles.top}>
          <div>
            <p className={`eyebrow ${styles.kicker}`}>For scaffolding rental businesses</p>
            <h1 className={styles.headline}>
              <span className={styles.w}>Every</span> <span className={styles.w}>pipe,</span>{" "}
              <span className={styles.w}>coupler</span>
              <br />
              <span className={styles.w}>and</span> <span className={styles.w}>plank.</span>
              <br />
              <span className={`${styles.w} ${styles.thin}`}>Accounted</span>{" "}
              <span className={`${styles.w} ${styles.thin}`}>for.</span>
            </h1>
          </div>
          <div>
            <p className={styles.lede}>
              What goes out on a challan comes back on a bill. <strong>Bill Pro Max</strong>{" "}
              tracks every item at every site, works out the rent and GST, and tells you who
              owes what, so the month-end isn&apos;t a week of retyping.
            </p>
            <div className={styles.actions}>
              <a className="btn" href={SIGNUP_URL} target="_blank" rel="noopener noreferrer">
                Start free
              </a>
              <a className="textLink" href="#how-it-works">
                Watch a challan become a bill ↓
              </a>
            </div>
          </div>
        </div>

        <div ref={artRef} className={styles.art}>
          <ScaffoldDrawing />
        </div>
      </div>
      <div className={styles.hint} aria-hidden="true">
        scroll
        <i />
      </div>
    </section>
  );
}
