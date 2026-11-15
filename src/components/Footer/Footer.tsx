import BrandMark from "../shared/BrandMark";
import { CONTACT_EMAIL } from "@/lib/site";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brandCol}>
          <span className={styles.brand}>
            <span className={styles.mark}>
              <BrandMark size={18} />
            </span>
            Bill Pro Max
          </span>
          <span className={styles.tagline}>Made for scaffolding rental businesses.</span>
        </div>
        <nav className={styles.links} aria-label="Footer">
          <a href="#how-it-works">How it works</a>
          <a href="#features">What&apos;s inside</a>
          <a href={`mailto:${CONTACT_EMAIL}`}>Contact</a>
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
        </nav>
      </div>
      <div className={styles.bottom}>&copy; 2026 Bill Pro Max</div>
    </footer>
  );
}
