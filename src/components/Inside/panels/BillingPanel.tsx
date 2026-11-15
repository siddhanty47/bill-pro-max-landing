"use client";

import { useEffect, useRef } from "react";
import { countUp, formatINR } from "@/lib/motion";
import styles from "./panels.module.css";

const BILLS = 47;
const TILES = 48; // 4 rows of 12; the last one stays empty
const BILLED = 1234500;
const TILE_STAGGER_S = 0.035;

/** Month grid of bills filling in, with counters. */
export default function BillingPanel({ active }: { active: boolean }) {
  const tilesRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLDivElement>(null);
  const amountRef = useRef<HTMLDivElement>(null);

  // Stagger is index-based; set once so CSS only has to say "animate when on".
  useEffect(() => {
    tilesRef.current?.querySelectorAll<HTMLElement>("i").forEach((t, i) => {
      t.style.animationDelay = `${(i * TILE_STAGGER_S).toFixed(3)}s`;
    });
  }, []);

  useEffect(() => {
    if (!active) return;
    const stopCount = countUp(BILLS, 1600, (v) => {
      if (countRef.current) countRef.current.textContent = `${Math.round(v)} bills`;
    });
    const stopAmount = countUp(BILLED, 1800, (v) => {
      if (amountRef.current) amountRef.current.textContent = formatINR(Math.round(v));
    });
    return () => {
      stopCount();
      stopAmount();
    };
  }, [active]);

  return (
    <div className={`${styles.bills} ${active ? styles.on : ""}`} aria-hidden="true">
      <div className={styles.billsTop}>
        <div>
          <small>November 2026</small>
          <div ref={countRef} className={styles.big}>
            0 bills
          </div>
        </div>
        <div className={styles.billedCol}>
          <small>Billed</small>
          <div ref={amountRef} className={`${styles.big} ${styles.billed}`}>
            ₹0
          </div>
        </div>
      </div>
      <div ref={tilesRef} className={styles.tiles}>
        {Array.from({ length: TILES }, (_, i) => (
          <i key={i} className={i < BILLS ? styles.tileFilled : undefined} />
        ))}
      </div>
      <div className={styles.gst}>
        <div>
          CGST<b>₹94,140</b>
        </div>
        <div>
          SGST<b>₹94,140</b>
        </div>
        <div>
          IGST<b>₹12,600</b>
        </div>
      </div>
    </div>
  );
}
