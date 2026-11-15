"use client";

import { useEffect, useRef, useState } from "react";
import { useScrollUpdate } from "../scroll/ScrollProvider";
import { progressOf, STACKED_QUERY } from "@/lib/motion";
import AssistantPanel from "./panels/AssistantPanel";
import SearchPanel from "./panels/SearchPanel";
import StockPanel from "./panels/StockPanel";
import BillingPanel from "./panels/BillingPanel";
import PortalPanel from "./panels/PortalPanel";
import styles from "./Inside.module.css";

interface Feature {
  tab: string;
  title: string;
  body: string;
  figure: React.ReactNode;
  Visual: (props: { active: boolean }) => React.ReactElement;
}

const FEATURES: Feature[] = [
  {
    tab: "Assistant",
    title: "An assistant that knows your parties.",
    body: "Ask what someone owes, or just say “they paid 50,000 by UPI”. It drafts the entry from your real data. Nothing is saved until you confirm.",
    figure: (
      <>
        type · <em>speak</em> · send a photo
      </>
    ),
    Visual: AssistantPanel,
  },
  {
    tab: "Search",
    title: "Find anything before you finish typing.",
    body: "One search box for every party, site, agreement, item, bill and challan. It only shows what your role is allowed to see.",
    figure: (
      <>
        <em>⌘K</em> on Mac · <em>Ctrl K</em> on Windows
      </>
    ),
    Visual: SearchPanel,
  },
  {
    tab: "Stock",
    title: "Know what’s out, what’s back, what’s broken.",
    body: "Delivery and return challans move stock between your yard and each site, item by item. Damages and shortages get recorded on the return.",
    figure: (
      <>
        DC-1187 out → <em>RC-0942</em> back
      </>
    ),
    Visual: StockPanel,
  },
  {
    tab: "Billing",
    title: "A whole month’s bills. One click.",
    body: "Rent by the day for every item at every site, SGST/CGST or IGST worked out, and PDFs ready to send. Payments and reminders are tracked after that.",
    figure: (
      <>
        <em>47</em> bills · 1 click · PDF + ledger
      </>
    ),
    Visual: BillingPanel,
  },
  {
    tab: "Portal",
    title: "Your client sees it too. No login.",
    body: "Send a link. Your client opens their own challans, bills and balance on their phone. Fewer “please send the statement” calls.",
    figure: (
      <>
        one link per party · <em>revoke any time</em>
      </>
    ),
    Visual: PortalPanel,
  },
];

const pad = (n: number) => String(n).padStart(2, "0");

export default function Inside() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<(HTMLElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const [stacked, setStacked] = useState(false);
  const [seen, setSeen] = useState<Set<number>>(() => new Set());

  useEffect(() => {
    const mq = window.matchMedia(STACKED_QUERY);
    const sync = () => setStacked(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  // Desktop: vertical scroll drives the horizontal track.
  useScrollUpdate(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;
    if (window.matchMedia(STACKED_QUERY).matches) {
      track.style.transform = "";
      return;
    }
    const p = progressOf(section);
    const max = track.scrollWidth - window.innerWidth + 80;
    track.style.transform = `translate3d(${-p * Math.max(0, max)}px, 0, 0)`;
    const next = Math.round(p * (FEATURES.length - 1));
    setActive((cur) => (cur === next ? cur : next));
  });

  // Stacked (phones, reduced motion): each panel plays once when scrolled into view.
  useEffect(() => {
    if (!stacked) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const i = panelRefs.current.indexOf(entry.target as HTMLElement);
          setSeen((prev) => (prev.has(i) ? prev : new Set(prev).add(i)));
        });
      },
      { threshold: 0.35 },
    );
    panelRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, [stacked]);

  const isOn = (i: number) => (stacked ? seen.has(i) : i === active);

  return (
    <section ref={sectionRef} id="features" className={styles.inside} data-snap-pin>
      <div className={styles.sticky}>
        <div className={styles.rail}>
          <div>
            <p className="eyebrow">What&apos;s inside</p>
            <h2 className={`display ${styles.title}`}>
              Built around
              <br />
              <span className="thin">how your yard works.</span>
            </h2>
          </div>
          <ol className={styles.tabs} aria-hidden="true">
            {FEATURES.map((f, i) => (
              <li key={f.tab} className={i === active ? styles.tabOn : undefined}>
                {pad(i + 1)} {f.tab}
              </li>
            ))}
          </ol>
        </div>

        <div ref={trackRef} className={styles.track}>
          {FEATURES.map(({ tab, title, body, figure, Visual }, i) => (
            <article
              key={tab}
              ref={(el) => {
                panelRefs.current[i] = el;
              }}
              className={`${styles.panel} ${isOn(i) ? styles.panelOn : ""}`}
            >
              <div className={styles.text}>
                <div>
                  <div className={styles.no}>{pad(i + 1)}</div>
                  <h3 className={styles.panelTitle}>{title}</h3>
                  <p className={styles.body}>{body}</p>
                </div>
                <div className={styles.figure}>{figure}</div>
              </div>
              <div className={styles.visual}>
                <div className={`gridBg ${styles.visualGrid}`} />
                <Visual active={isOn(i)} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
