"use client";

import { useEffect, useRef } from "react";
import { useScrollUpdate } from "../scroll/ScrollProvider";
import { easeOut, formatINR, prefersReducedMotion, progressOf, seg } from "@/lib/motion";
import styles from "./Story.module.css";

const STEPS = [
  {
    title: "Snap the paper challan",
    body: "Take a photo of the handwritten copy. The assistant reads party, site, items and quantities.",
  },
  {
    title: "It becomes a real challan",
    body: "Matched to your parties, sites and inventory. Stock at the site updates instantly.",
  },
  {
    title: "Month-end bills itself",
    body: "Rent by the day for every item, GST split right, totals ready to send.",
  },
];

const CHALLAN_ITEMS = [
  { hand: "Std 3m", name: "Standard 3.0 m", qty: 16, rate: 3 },
  { hand: "Coupler", name: "Coupler", qty: 48, rate: 1 },
  { hand: "Plank", name: "Plank", qty: 24, rate: 2.5 },
];
const DAYS = 30;
const GST_RATE = 0.09;
const SUBTOTAL = CHALLAN_ITEMS.reduce((s, i) => s + i.qty * DAYS * i.rate, 0);
const CGST = SUBTOTAL * GST_RATE;
const TOTAL = SUBTOTAL + CGST * 2;

const money = (v: number) => v.toLocaleString("en-IN", { minimumFractionDigits: 2 });

interface Els {
  paper: HTMLElement;
  scan: HTMLElement;
  tint: HTMLElement;
  dig: HTMLElement;
  bill: HTMLElement;
  total: HTMLElement;
  bar: HTMLElement;
  dRows: HTMLElement[];
  bRows: HTMLElement[];
  steps: HTMLElement[];
}

export default function Story() {
  const sectionRef = useRef<HTMLElement>(null);
  const els = useRef<Els | null>(null);

  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;
    const q = (k: string) => root.querySelector<HTMLElement>(`[data-el="${k}"]`)!;
    const all = (k: string) => [...root.querySelectorAll<HTMLElement>(`[data-el="${k}"]`)];
    els.current = {
      paper: q("paper"),
      scan: q("scan"),
      tint: q("tint"),
      dig: q("dig"),
      bill: q("bill"),
      total: q("total"),
      bar: q("bar"),
      dRows: all("drow"),
      bRows: all("brow"),
      steps: all("step"),
    };
  }, []);

  useScrollUpdate(() => {
    const root = sectionRef.current;
    const e = els.current;
    if (!root || !e) return;
    const p = prefersReducedMotion() ? 1 : progressOf(root);

    const scan = seg(p, 0.05, 0.3);
    const toDigital = seg(p, 0.33, 0.48);
    const toBill = seg(p, 0.62, 0.76);
    const d = easeOut(toDigital);
    const b = easeOut(toBill);

    e.bar.style.transform = `scaleX(${p})`;
    e.scan.style.top = `${scan * 100}%`;
    e.scan.style.opacity = scan > 0 && scan < 1 ? "1" : "0";
    e.tint.style.height = `${scan * 100}%`;

    e.paper.style.opacity = String(1 - toDigital * 0.85);
    e.paper.style.transform = `translate(calc(-50% - ${d * 150}px), calc(-50% + ${d * 30}px)) rotate(${-5 - d * 8}deg) scale(${1 - toDigital * 0.12})`;

    e.dig.style.opacity = String(toDigital * (1 - toBill * 0.55));
    e.dig.style.transform = `translate(calc(-50% + ${(1 - d) * 80 - b * 120}px), calc(-50% - ${b * 70}px)) scale(${1 - toBill * 0.14})`;
    e.dRows.forEach((row, i) => row.classList.toggle(styles.hide, p < 0.38 + i * 0.035));

    e.bill.style.opacity = String(toBill);
    e.bill.style.transform = `translate(calc(-50% + ${(1 - b) * 100 + b * 40}px), calc(-50% + ${(1 - b) * 40 + b * 50}px))`;
    e.bRows.forEach((row, i) => row.classList.toggle(styles.hide, p < 0.7 + i * 0.035));
    e.total.textContent = formatINR(seg(p, 0.82, 0.95) * TOTAL, 2);

    const active = p < 0.32 ? 0 : p < 0.6 ? 1 : 2;
    e.steps.forEach((s, i) => s.classList.toggle(styles.on, i === active));
  });

  return (
    <section ref={sectionRef} id="how-it-works" className={styles.story} data-snap-pin>
      <div className={styles.sticky}>
        <div className={styles.inner}>
          <div>
            <p className="eyebrow">How it works</p>
            <h2 className={`display ${styles.title}`}>
              From the challan book
              <br />
              <span className="thin">to the bill.</span>
            </h2>
            <ol className={styles.steps}>
              {STEPS.map((s, i) => (
                <li key={s.title} data-el="step" className={i === 0 ? styles.on : undefined}>
                  <b>{s.title}</b>
                  <span>{s.body}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className={styles.vis} aria-hidden="true">
            <div className={`gridBg ${styles.visGrid}`} />

            {/* Handwritten paper challan */}
            <div data-el="paper" className={`${styles.card} ${styles.paper}`}>
              <div data-el="tint" className={styles.tint} />
              <div data-el="scan" className={styles.scan} />
              <div className={styles.paperHead}>
                <span>Delivery Challan</span>
                <span>No. 1187</span>
              </div>
              <div className={styles.handLine}>
                <span>Sharma Builders</span>
              </div>
              <div className={styles.handLine}>
                <span>Andheri site</span>
                <span>12/11</span>
              </div>
              {CHALLAN_ITEMS.map((it) => (
                <div key={it.hand} className={styles.handLine}>
                  <span>{it.hand}</span>
                  <span>{it.qty}</span>
                </div>
              ))}
              <div className={styles.sig}>— Ramesh</div>
            </div>

            {/* Digital challan */}
            <div data-el="dig" className={`${styles.card} ${styles.screen} ${styles.dig}`}>
              <div className={styles.head}>
                <b>DC-1187</b>
                <span className={styles.chipBlue}>Delivery</span>
              </div>
              <div data-el="drow" className={styles.row}>
                <span>Sharma Builders · Andheri</span>
                <span>12 Nov</span>
              </div>
              {CHALLAN_ITEMS.map((it) => (
                <div key={it.name} data-el="drow" className={styles.row}>
                  <span>{it.name}</span>
                  <span>{it.qty}</span>
                </div>
              ))}
              <div className={styles.matched}>✓ Matched party, site &amp; 3 items</div>
            </div>

            {/* Bill */}
            <div data-el="bill" className={`${styles.card} ${styles.screen} ${styles.bill}`}>
              <div className={styles.head}>
                <b>INV-2026-0412</b>
                <span className={styles.chipGreen}>Nov 2026</span>
              </div>
              {CHALLAN_ITEMS.map((it) => (
                <div key={it.name} data-el="brow" className={styles.row}>
                  <span className={styles.label}>{it.name}</span>
                  <span className={styles.calc}>
                    {it.qty} × {DAYS}d × ₹{it.rate}
                  </span>
                  <span>{money(it.qty * DAYS * it.rate)}</span>
                </div>
              ))}
              <div data-el="brow" className={styles.row}>
                <span className={styles.label}>CGST 9%</span>
                <span>{money(CGST)}</span>
              </div>
              <div data-el="brow" className={styles.row}>
                <span className={styles.label}>SGST 9%</span>
                <span>{money(CGST)}</span>
              </div>
              <div className={styles.total}>
                <span>Total</span>
                <b data-el="total">₹0.00</b>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.progress} aria-hidden="true">
          <i data-el="bar" />
        </div>
      </div>
    </section>
  );
}
