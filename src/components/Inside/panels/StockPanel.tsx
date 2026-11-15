"use client";

import { useEffect, useRef } from "react";
import styles from "./panels.module.css";

/** Share of each item: at sites / in yard / damaged (percent). */
const STOCK = [
  { name: "Standard 3.0 m", out: 62, yard: 34, damaged: 4, label: "248 out" },
  { name: "Coupler", out: 71, yard: 27, damaged: 2, label: "1,104 out" },
  { name: "Plank", out: 48, yard: 45, damaged: 7, label: "382 out" },
  { name: "Base jack", out: 55, yard: 44, damaged: 1, label: "96 out" },
];

/** Truck shuttles yard ↔ site while stock bars fill. */
export default function StockPanel({ active }: { active: boolean }) {
  const barsRef = useRef<HTMLDivElement>(null);

  // Bar widths are data, so they're set here rather than in CSS.
  useEffect(() => {
    const segs = barsRef.current?.querySelectorAll<HTMLElement>("[data-w]") ?? [];
    if (!active) {
      segs.forEach((s) => (s.style.width = "0"));
      return;
    }
    const raf = requestAnimationFrame(() =>
      segs.forEach((s) => (s.style.width = `${s.dataset.w}%`)),
    );
    return () => cancelAnimationFrame(raf);
  }, [active]);

  return (
    <div className={`${styles.yard} ${active ? styles.on : ""}`} aria-hidden="true">
      <div className={styles.road}>
        <div className={`${styles.place} ${styles.placeL}`}>
          <svg width="34" height="26" viewBox="0 0 34 26" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M2 24V10l15-8 15 8v14M2 24h30M11 24v-8h12v8" />
          </svg>
          Yard
        </div>
        <div className={styles.roadLine} />
        <div className={styles.truck}>
          <svg width="54" height="30" viewBox="0 0 54 30" fill="none" stroke="currentColor" strokeWidth="1.6">
            <rect x="2" y="6" width="32" height="16" rx="2" />
            <path d="M34 11h10l7 6v5H34z" />
            <circle cx="12" cy="25" r="3.5" className={styles.wheel} />
            <circle cx="42" cy="25" r="3.5" className={styles.wheel} />
            <path d="M6 10h24M6 14h24M6 18h24" className={styles.load} />
          </svg>
        </div>
        <div className={`${styles.place} ${styles.placeR}`}>
          <svg width="34" height="26" viewBox="0 0 34 26" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M4 24V2M16 24V2M28 24V2M4 8h24M4 16h24M4 24h24M4 8l12 8M16 16l12 8" />
          </svg>
          Andheri
        </div>
      </div>

      <div ref={barsRef} className={styles.stock}>
        {STOCK.map((s) => (
          <div key={s.name} className={styles.stockRow}>
            <span>{s.name}</span>
            <div className={styles.bar}>
              <i className={styles.segOut} data-w={s.out} />
              <i className={styles.segYard} data-w={s.yard} />
              <i className={styles.segDamaged} data-w={s.damaged} />
            </div>
            <span className={styles.stockVal}>{s.label}</span>
          </div>
        ))}
      </div>
      <div className={styles.legend}>
        <span className={styles.lgOut}>At sites</span>
        <span className={styles.lgYard}>In yard</span>
        <span className={styles.lgDamaged}>Damaged</span>
      </div>
    </div>
  );
}
