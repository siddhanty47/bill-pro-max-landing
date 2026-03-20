"use client";

import Container from "../shared/Container";
import ScrollReveal from "../shared/ScrollReveal";
import styles from "./CTA.module.css";

const APP_URL = "https://app.billpromax.com";

export default function CTA() {
  return (
    <section className={styles.section}>
      <Container>
        <ScrollReveal>
          <div className={styles.inner}>
            <h2 className={styles.headline}>
              Ready to streamline your scaffolding business?
            </h2>
            <p className={styles.subtitle}>
              Start free. No credit card required.
            </p>
            <a
              href={APP_URL + "/signup"}
              className={styles.btn}
              target="_blank"
              rel="noopener noreferrer"
            >
              [GET STARTED FREE]
            </a>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
