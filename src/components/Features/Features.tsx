"use client";

import Container from "../shared/Container";
import ScrollReveal from "../shared/ScrollReveal";
import styles from "./Features.module.css";

const FEATURES = [
  {
    title: "AI Assistant",
    description:
      "Ask in plain words, by voice, or with a photo of a handwritten challan. Check ledgers, outstanding balances, overdue bills and stock — or have it create challans, add parties and record payments. Every action waits for your confirmation and respects your role.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        <path d="M12 7l1 2.5L15.5 10 13 11l-1 2.5L11 11l-2.5-1L11 9.5z" />
      </svg>
    ),
  },
  {
    title: "Global Search (⌘K)",
    description:
      "Press ⌘K / Ctrl+K and jump to any party, site, agreement, item, bill or challan in a few keystrokes. Results only show what your role can see.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="11" cy="11" r="7" />
        <path d="M21 21l-4.35-4.35" />
      </svg>
    ),
  },
  {
    title: "Smart Billing",
    description:
      "Automated GST calculations (SGST/CGST/IGST), bulk bill generation for all clients in one click, editable bill numbers, and payment tracking.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2v20" />
        <path d="M17 5H9.5a3.5 3.5 0 1 0 0 7h5a3.5 3.5 0 1 1 0 7H6" />
      </svg>
    ),
  },
  {
    title: "Challan Tracking",
    description:
      "Delivery and return challans with item-level tracking, damage recording, and editable challan numbers. Know what's out and what's back.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
        <path d="M14 2v6h6" />
        <path d="M9 15l2 2 4-4" />
      </svg>
    ),
  },
  {
    title: "Full Audit Trail",
    description:
      "Every change to inventory, challans, bills, and payments is tracked with who changed what and when. Jira-style change history on every record.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 8v4l3 3" />
        <circle cx="12" cy="12" r="10" />
      </svg>
    ),
  },
  {
    title: "Inventory Management",
    description:
      "Track scaffolding items with real-time stock levels, cost prices, short rates, and damage tracking. Import presets to get started in seconds.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M20 7H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1Z" />
        <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
        <path d="M12 11v4" />
        <path d="M10 13h4" />
      </svg>
    ),
  },
  {
    title: "Shared Client Portal",
    description:
      "Give clients a no-auth, shareable URL to view their challans, bills, and payment status in real-time. Full transparency, zero friction.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
      </svg>
    ),
  },
  {
    title: "PDF & Statements",
    description:
      "Generate professional PDF invoices, challan documents, ledgers, and account statements. Download or email directly to clients.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
        <path d="M14 2v6h6" />
        <path d="M10 17l2-2 2 2" />
        <path d="M12 13v4" />
      </svg>
    ),
  },
  {
    title: "Business Analytics",
    description:
      "Dashboard with real-time insights — revenue trends, outstanding amounts, overdue bills, and inventory utilization at a glance.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M18 20V10" />
        <path d="M12 20V4" />
        <path d="M6 20v-6" />
      </svg>
    ),
  },
  {
    title: "Automated Workflows",
    description:
      "Inventory presets, GST auto-fetch, bulk billing, automatic monthly billing, overdue detection, and payment reminders — less manual work, fewer errors.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2v4" />
        <path d="M12 18v4" />
        <path d="M4.93 4.93l2.83 2.83" />
        <path d="M16.24 16.24l2.83 2.83" />
        <path d="M2 12h4" />
        <path d="M18 12h4" />
        <path d="M4.93 19.07l2.83-2.83" />
        <path d="M16.24 7.76l2.83-2.83" />
      </svg>
    ),
  },
  {
    title: "Party Management",
    description:
      "Client database with multi-site support, agreement history, opening balances, and role-based access.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    title: "Team & Employees",
    description:
      "Invite teammates with role-based permissions (owner, manager, staff, accountant, viewer) and manage employees with salary details and emergency contacts. Real-time notifications keep everyone in sync.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
];

export default function Features() {
  return (
    <section id="features" className={styles.section}>
      <Container>
        <ScrollReveal>
          <p className={styles.label}>// FEATURES</p>
          <h2 className={styles.title}>
            Everything you need to run your rental business
          </h2>
        </ScrollReveal>

        <div className={styles.grid}>
          {FEATURES.map((feature, i) => (
            <ScrollReveal key={feature.title} delay={i * 0.1}>
              <div className={styles.card}>
                <div className={styles.cardIcon}>{feature.icon}</div>
                <h3 className={styles.cardTitle}>{feature.title}</h3>
                <p className={styles.cardDesc}>{feature.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
