"use client";

import { motion } from "motion/react";
import GridBackground from "../shared/GridBackground";
import TypingAnimation from "./TypingAnimation";
import styles from "./Hero.module.css";

const APP_URL = "https://app.billpromax.com";

const TERMINAL_LINES = [
  { text: "> bill-pro-max --status", type: "command" as const },
  { text: "", type: "label" as const },
  { text: "BUSINESS: Sharma Scaffolding Pvt. Ltd.", type: "label" as const },
  { text: "ACTIVE AGREEMENTS: 47", type: "value" as const },
  { text: "PENDING CHALLANS: 12", type: "value" as const },
  { text: "THIS MONTH REVENUE: ₹4,82,000", type: "value" as const },
  { text: "", type: "label" as const },
  { text: "STATUS: [ACTIVE]  HEALTH: [GOOD]", type: "status" as const },
];

function fadeUp(delay: number) {
  return {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, delay, ease: "easeOut" as const },
  };
}

export default function Hero() {
  return (
    <section className={styles.hero}>
      <GridBackground />
      <div className={styles.aura} aria-hidden="true" />

      <div className={styles.content}>
        <motion.div {...fadeUp(0)}>
          <span className={styles.badge}>[NOW IN BETA]</span>
        </motion.div>

        <motion.h1 className={styles.headline} {...fadeUp(0.2)}>
          Scaffolding Rental Management.
          <br />
          <span className={styles.headlineAccent}>
            <TypingAnimation text="Simplified." delay={800} />
          </span>
        </motion.h1>

        <motion.p className={styles.subtitle} {...fadeUp(0.4)}>
          An AI assistant that reads challans and handles everyday tasks,
          instant ⌘K search, automated GST billing, client portals, and full
          audit trails — all in one platform built for scaffolding businesses.
        </motion.p>

        <motion.div className={styles.buttons} {...fadeUp(0.6)}>
          <a
            href={APP_URL + "/signup"}
            className={styles.btnPrimary}
            target="_blank"
            rel="noopener noreferrer"
          >
            [GET STARTED FREE]
          </a>
          <a
            href={APP_URL + "/demo"}
            className={styles.btnSecondary}
            target="_blank"
            rel="noopener noreferrer"
          >
            [VIEW DEMO]
          </a>
        </motion.div>

        <motion.div
          className={styles.terminal}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
        >
          <div className={styles.terminalBar}>
            <span className={`${styles.terminalDot} ${styles.dotRed}`} />
            <span className={`${styles.terminalDot} ${styles.dotYellow}`} />
            <span className={`${styles.terminalDot} ${styles.dotGreen}`} />
            <span className={styles.terminalTitle}>
              bash — bill-pro-max
            </span>
          </div>
          <TerminalBody />
        </motion.div>
      </div>
    </section>
  );
}

function TerminalBody() {
  return (
    <div className={styles.terminalBody}>
      {TERMINAL_LINES.map((line, i) => (
        <TerminalLine key={i} line={line} index={i} />
      ))}
    </div>
  );
}

function TerminalLine({
  line,
  index,
}: {
  line: (typeof TERMINAL_LINES)[number];
  index: number;
}) {
  const styleMap = {
    command: styles.terminalCommand,
    label: styles.terminalLabel,
    value: styles.terminalValue,
    status: styles.terminalStatus,
  };

  return (
    <motion.div
      className={styles.terminalLine}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.2 + index * 0.2, duration: 0.3 }}
    >
      <span className={styleMap[line.type]}>{line.text}</span>
    </motion.div>
  );
}
