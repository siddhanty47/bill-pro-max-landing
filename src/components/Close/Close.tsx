"use client";

import { useEffect, useRef } from "react";
import { useScrollUpdate } from "../scroll/ScrollProvider";
import { clamp, prefersReducedMotion } from "@/lib/motion";
import { SIGNUP_URL } from "@/lib/site";
import styles from "./Close.module.css";

const LEVELS = 10;
const LIFT = 60;
const HEIGHT = LEVELS * LIFT;

/** Closing call to action; a scaffold tower builds one lift at a time as it scrolls in. */
export default function Close() {
  const sectionRef = useRef<HTMLElement>(null);
  const towerRef = useRef<SVGSVGElement>(null);

  useScrollUpdate(() => {
    const section = sectionRef.current;
    const tower = towerRef.current;
    if (!section || !tower) return;
    const p = prefersReducedMotion()
      ? 1
      : clamp(1 - section.getBoundingClientRect().top / window.innerHeight);
    tower.querySelectorAll("g").forEach((g, i) => g.classList.toggle(styles.built, p > i / 12));
  });

  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll<HTMLElement>(`.${styles.reveal}`) ?? [];
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => e.isIntersecting && e.target.classList.add(styles.shown)),
      { threshold: 0.3 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="get-started" className={`${styles.close} gridBg`} data-snap>
      <svg
        ref={towerRef}
        className={styles.tower}
        viewBox={`0 0 200 ${HEIGHT}`}
        fill="none"
        aria-hidden="true"
      >
        {Array.from({ length: LEVELS }, (_, i) => {
          const y = HEIGHT - i * LIFT;
          const top = y - LIFT;
          return (
            <g key={i}>
              <path d={`M20 ${y}V${top}M180 ${y}V${top}M20 ${top}H180M20 ${y}L180 ${top}`} />
              <circle cx="20" cy={top} r="3" />
              <circle cx="180" cy={top} r="3" />
            </g>
          );
        })}
      </svg>
      <div className={styles.inner}>
        <div className={styles.reveal}>
          <p className="eyebrow">Get started</p>
          <h2 className={`display ${styles.title}`}>
            Close the month
            <br />
            <span className="thin">in an afternoon.</span>
          </h2>
        </div>
        <div className={styles.reveal}>
          <a className="btn" href={SIGNUP_URL} target="_blank" rel="noopener noreferrer">
            Start free
          </a>
        </div>
      </div>
    </section>
  );
}
