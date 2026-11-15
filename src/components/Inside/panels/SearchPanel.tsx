"use client";

import { useEffect, useState } from "react";
import styles from "./panels.module.css";

type Kind = "party" | "bill" | "challan" | "item";

const RESULTS: { kind: Kind; label: string; meta: string; keys: string; group: "parties" | "docs" }[] = [
  { kind: "party", label: "Sharma Builders", meta: "3 sites", keys: "sharma builders", group: "parties" },
  { kind: "party", label: "Sharma Infra Pvt Ltd", meta: "1 site", keys: "sharma infra", group: "parties" },
  { kind: "party", label: "Mehta Constructions", meta: "2 sites", keys: "mehta constructions", group: "parties" },
  { kind: "bill", label: "INV-0412 · Sharma Builders", meta: "₹5,522", keys: "inv-0412 sharma builders", group: "docs" },
  { kind: "challan", label: "DC-1187 · Sharma, Andheri", meta: "12 Nov", keys: "dc-1187 sharma andheri", group: "docs" },
  { kind: "item", label: "Coupler (item)", meta: "312 in yard", keys: "coupler item", group: "docs" },
];

const ICON: Record<Kind, { letter: string; cls: string }> = {
  party: { letter: "P", cls: styles.icParty },
  bill: { letter: "B", cls: styles.icBill },
  challan: { letter: "C", cls: styles.icChallan },
  item: { letter: "I", cls: styles.icItem },
};

const QUERY = "sharma";
const KEY_MS = 220;

function Highlight({ text, q }: { text: string; q: string }) {
  const i = q ? text.toLowerCase().indexOf(q) : -1;
  if (i < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, i)}
      <mark>{text.slice(i, i + q.length)}</mark>
      {text.slice(i + q.length)}
    </>
  );
}

/** Search palette: types "sharma" and filters live. */
export default function SearchPanel({ active }: { active: boolean }) {
  const [typed, setTyped] = useState(0);

  useEffect(() => {
    if (!active) return;
    setTyped(0);
    const id = setInterval(() => {
      setTyped((n) => {
        if (n >= QUERY.length) {
          clearInterval(id);
          return n;
        }
        return n + 1;
      });
    }, KEY_MS);
    return () => clearInterval(id);
  }, [active]);

  const q = QUERY.slice(0, typed);
  const firstHit = RESULTS.findIndex((r) => r.keys.includes(q));

  const renderGroup = (group: "parties" | "docs") =>
    RESULTS.map((r, i) =>
      r.group !== group ? null : (
        <div
          key={r.label}
          className={`${styles.result} ${r.keys.includes(q) ? "" : styles.out} ${i === firstHit ? styles.hl : ""}`}
        >
          <span className={`${styles.ic} ${ICON[r.kind].cls}`}>{ICON[r.kind].letter}</span>
          <span>
            <Highlight text={r.label} q={q} />
          </span>
          <span className={styles.meta}>{r.meta}</span>
        </div>
      ),
    );

  return (
    <div className={styles.palette} aria-hidden="true">
      <div className={styles.searchBox}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="7" />
          <path d="M21 21l-4.3-4.3" />
        </svg>
        <span className={styles.query}>{q}</span>
        <span className={styles.caret} />
        <span className={styles.kbd}>⌘K</span>
      </div>
      <div className={styles.group}>Parties</div>
      {renderGroup("parties")}
      <div className={styles.group}>Bills, challans &amp; items</div>
      {renderGroup("docs")}
    </div>
  );
}
