import styles from "./panels.module.css";

/** Share link travels to the client's phone statement. */
export default function PortalPanel({ active }: { active: boolean }) {
  return (
    <div className={`${styles.portal} ${active ? styles.on : ""}`} aria-hidden="true">
      <div>
        <div className={styles.link}>
          billpromax.com/share/x7k2… <span className={styles.copy}>Copy</span>
        </div>
        <svg className={styles.arrow} width="120" height="40" viewBox="0 0 120 40">
          <path d="M10 5 C 50 5, 70 35, 110 35" />
        </svg>
      </div>
      <div className={styles.phone}>
        <div className={styles.phoneScreen}>
          <div className={styles.who}>Statement for</div>
          <div className={styles.party}>Sharma Builders</div>
          <div className={styles.balance}>
            <small>Balance due</small>
            <b>₹34,250</b>
          </div>
          <div className={styles.line}>
            <span>INV-0412</span>
            <span>₹5,522</span>
          </div>
          <div className={styles.line}>
            <span>INV-0388</span>
            <span className={styles.paid}>Paid</span>
          </div>
          <div className={styles.line}>
            <span>DC-1187</span>
            <span>12 Nov</span>
          </div>
          <div className={styles.line}>
            <span>RC-0942</span>
            <span>04 Nov</span>
          </div>
        </div>
      </div>
    </div>
  );
}
