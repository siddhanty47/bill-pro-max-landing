"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import styles from "./Navbar.module.css";

const APP_URL = "https://app.billpromax.com";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <motion.nav
      className={`${styles.navbar} ${scrolled ? styles.navbarScrolled : ""}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className={styles.inner}>
        <a href="#" className={styles.brand}>
          _BILL PRO MAX<span className={styles.cursor} />
        </a>

        <div className={styles.links}>
          <a href="#features" className={styles.navLink}>
            Features
          </a>
          <a href="#how-it-works" className={styles.navLink}>
            How It Works
          </a>
          <a
            href={APP_URL + "/signup"}
            className={styles.signupBtn}
            target="_blank"
            rel="noopener noreferrer"
          >
            [SIGN UP]
          </a>
        </div>

        <button
          className={styles.hamburger}
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
        >
          &#9776;
        </button>
      </div>

      {mobileOpen && (
        <div className={styles.mobileOverlay}>
          <button
            className={styles.closeBtn}
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
          >
            &#10005;
          </button>
          <a
            href="#features"
            className={styles.mobileLink}
            onClick={() => setMobileOpen(false)}
          >
            Features
          </a>
          <a
            href="#how-it-works"
            className={styles.mobileLink}
            onClick={() => setMobileOpen(false)}
          >
            How It Works
          </a>
          <a
            href={APP_URL + "/signup"}
            className={styles.mobileSignup}
            target="_blank"
            rel="noopener noreferrer"
          >
            [SIGN UP]
          </a>
        </div>
      )}
    </motion.nav>
  );
}
