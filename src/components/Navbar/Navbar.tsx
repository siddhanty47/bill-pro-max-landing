"use client";

import { useRef } from "react";
import { useScrollUpdate } from "../scroll/ScrollProvider";
import BrandMark from "../shared/BrandMark";
import { SIGNUP_URL } from "@/lib/site";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useScrollUpdate(() => {
    const y = window.scrollY;
    navRef.current?.classList.toggle(styles.scrolled, y > 40);
    const max = document.documentElement.scrollHeight - window.innerHeight;
    if (barRef.current) {
      barRef.current.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
    }
  });

  return (
    <>
      <div ref={barRef} className={styles.progress} aria-hidden="true" />
      <nav ref={navRef} className={styles.nav} aria-label="Main">
        <a href="#top" className={styles.brand}>
          <span className={styles.mark}>
            <BrandMark />
          </span>
          Bill Pro Max
        </a>
        <div className={styles.links}>
          <a href="#how-it-works" className={styles.link}>
            How it works
          </a>
          <a href="#features" className={styles.link}>
            What&apos;s inside
          </a>
          <a
            href={SIGNUP_URL}
            className={styles.cta}
            target="_blank"
            rel="noopener noreferrer"
          >
            Start free
          </a>
        </div>
      </nav>
    </>
  );
}
