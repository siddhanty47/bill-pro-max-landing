import styles from "./panels.module.css";

/** Chat: balance question → answer → payment drafted → user confirms. */
export default function AssistantPanel({ active }: { active: boolean }) {
  return (
    <div className={`${styles.chat} ${active ? styles.on : ""}`} aria-hidden="true">
      <div className={`${styles.msg} ${styles.me} ${styles.s1}`}>
        How much does Sharma Builders owe?
      </div>
      <div className={`${styles.msg} ${styles.bot} ${styles.s2}`}>
        Sharma Builders has <span className={styles.num}>₹84,250</span> outstanding across 3
        bills. The oldest is 42 days overdue.
      </div>
      <div className={`${styles.msg} ${styles.me} ${styles.s3}`}>They paid 50,000 by UPI today</div>
      <div className={`${styles.confirm} ${styles.s4}`}>
        <b>Record payment?</b>
        <div className={styles.kv}>
          Party<b>Sharma Builders</b>
        </div>
        <div className={styles.kv}>
          Amount<b>₹50,000</b>
        </div>
        <div className={styles.kv}>
          Mode<b>UPI</b>
        </div>
        <div className={styles.buttons}>
          <span className={styles.ok}>Confirm</span>
          <span className={styles.cancel}>Cancel</span>
        </div>
      </div>
      <div className={`${styles.done} ${styles.s5}`}>✓ Payment recorded · balance ₹34,250</div>
    </div>
  );
}
