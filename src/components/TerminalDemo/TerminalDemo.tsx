"use client";

import { motion } from "motion/react";
import Container from "../shared/Container";
import ScrollReveal from "../shared/ScrollReveal";
import styles from "./TerminalDemo.module.css";

const TERMINAL_LINES = [
  { text: "> bill-pro-max generate-bills --month mar-2026", cls: "command" as const },
  { text: "", cls: "output" as const },
  { text: "Scanning active agreements...", cls: "output" as const },
  { text: "Found 47 agreements with pending billing.", cls: "output" as const },
  { text: "", cls: "output" as const },
  { text: "Generating bills... ████████████████ 47/47", cls: "accent" as const },
  { text: "GST calculated (SGST + CGST) for all entries.", cls: "output" as const },
  { text: "", cls: "output" as const },
  { text: "✓ 47 bills generated. Total: ₹12,34,500", cls: "success" as const },
  { text: "✓ PDF invoices ready for download.", cls: "success" as const },
];

const STEPS = [
  {
    title: "Set up your business",
    description: "Create your business profile, import inventory items, and configure GST details.",
  },
  {
    title: "Add clients & agreements",
    description: "Add parties, create rental agreements with item rates and terms.",
  },
  {
    title: "Track & bill automatically",
    description: "Log challans, generate monthly bills in bulk, track payments — all automated.",
  },
];

export default function TerminalDemo() {
  return (
    <section id="how-it-works" className={styles.section}>
      <Container>
        <ScrollReveal>
          <p className={styles.label}>// HOW IT WORKS</p>
          <h2 className={styles.title}>
            Three steps to streamline your business
          </h2>
          <p className={styles.subtitle}>
            From setup to automated billing — get running in minutes, not days.
          </p>
        </ScrollReveal>

        <div className={styles.layout}>
          <ScrollReveal delay={0.1}>
            <div className={styles.terminal}>
              <div className={styles.terminalBar}>
                <span className={`${styles.dot} ${styles.dotRed}`} />
                <span className={`${styles.dot} ${styles.dotYellow}`} />
                <span className={`${styles.dot} ${styles.dotGreen}`} />
                <span className={styles.terminalTitle}>
                  bash — bill-pro-max
                </span>
              </div>
              <div className={styles.terminalBody}>
                {TERMINAL_LINES.map((line, i) => (
                  <motion.div
                    key={i}
                    className={styles.line}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15, duration: 0.3 }}
                  >
                    <span className={styles[line.cls]}>{line.text}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <div className={styles.steps}>
            {STEPS.map((step, i) => (
              <ScrollReveal key={step.title} delay={0.2 + i * 0.15}>
                <div className={styles.step}>
                  <div className={styles.stepNumber}>{i + 1}</div>
                  <div className={styles.stepContent}>
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
