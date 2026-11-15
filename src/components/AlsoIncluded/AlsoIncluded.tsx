"use client";

import { useEffect, useRef } from "react";
import styles from "./AlsoIncluded.module.css";

const ITEMS = [
  {
    name: "Full audit trail",
    body: "Who changed what and when, on every party, challan, bill, payment and item.",
  },
  {
    name: "Team roles",
    body: "Owner, manager, staff, accountant and viewer, each seeing only what they should.",
  },
  {
    name: "Employee management",
    body: "Salaries, emergency contacts and roles, kept next to your rental operations.",
  },
  {
    name: "PDF bills & statements",
    body: "Invoices, challans, ledgers and ageing statements, ready to download or email.",
  },
  {
    name: "Business analytics",
    body: "Revenue, outstanding, overdue bills and inventory use on one dashboard.",
  },
  {
    name: "Inventory presets",
    body: "Start from a ready list of scaffolding items with rates already filled in.",
  },
  {
    name: "Payment reminders",
    body: "Overdue bills are flagged daily and reminders go out automatically.",
  },
  {
    name: "GSTIN lookup",
    body: "Enter a GSTIN to pull in the party's registered business details.",
  },
];

/** Crawlable list of the smaller features that don't get their own panel. */
export default function AlsoIncluded() {
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          list.classList.add(styles.shown);
          io.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    io.observe(list);
    return () => io.disconnect();
  }, []);

  return (
    <section className={styles.section} aria-labelledby="also-included">
      <div className={styles.inner}>
        <div className={styles.head}>
          <p className="eyebrow">Also included</p>
          <h2 id="also-included" className={`display ${styles.title}`}>
            And the rest
            <br />
            <span className="thin">of the paperwork.</span>
          </h2>
        </div>
        <ul ref={listRef} className={styles.list}>
          {ITEMS.map((it, i) => (
            <li key={it.name}>
              <span className={styles.no}>{String(i + 6).padStart(2, "0")}</span>
              <h3 className={styles.name}>{it.name}</h3>
              <p className={styles.body}>{it.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
