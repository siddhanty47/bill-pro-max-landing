"use client";

import ScrollReveal from "../shared/ScrollReveal";
import styles from "./Features.module.css";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}

export default function FeatureCard({
  icon,
  title,
  description,
  index,
}: FeatureCardProps) {
  return (
    <ScrollReveal delay={index * 0.1}>
      <div className={styles.card}>
        <div className={styles.cardIcon}>{icon}</div>
        <h3 className={styles.cardTitle}>{title}</h3>
        <p className={styles.cardDesc}>{description}</p>
      </div>
    </ScrollReveal>
  );
}
