import styles from "./Hero.module.css";

const STANDARDS_X = [60, 167, 273, 380];
const LEVELS_Y = [260, 160, 60];

/**
 * Blueprint-style scaffold (3 bays × 3 lifts) that draws itself:
 * standards → ledgers → braces → planks → couplers → dimensions and callouts.
 * Timing lives in Hero.module.css.
 */
export default function ScaffoldDrawing() {
  return (
    <svg
      className={styles.scaf}
      viewBox="0 0 520 400"
      role="img"
      aria-label="Scaffold drawing: 3 bays, 4.5 metres wide and 6 metres high, with 16 standards, 48 couplers and 24 planks out on site"
    >
      <g className={styles.standards}>
        {STANDARDS_X.map((x) => (
          <path key={x} className={styles.pipe} d={`M${x} 360 V60`} />
        ))}
      </g>
      <g className={styles.ledgers}>
        {[360, ...LEVELS_Y].map((y) => (
          <path key={y} className={styles.pipe} d={`M60 ${y} H380`} />
        ))}
      </g>
      <path
        className={`${styles.brace} ${styles.braces}`}
        d="M60 360 L167 260 M167 260 L273 160 M273 160 L380 60"
      />
      <path className={`${styles.brace} ${styles.planks}`} d="M60 256 H380 M60 156 H380" />

      {LEVELS_Y.map((y, i) => (
        <g key={y} className={styles[`row${i}`]}>
          {STANDARDS_X.map((x) => (
            <circle key={x} className={styles.coupler} cx={x} cy={y} r="4" />
          ))}
        </g>
      ))}

      <g className={`${styles.ann} ${styles.annDims}`}>
        <path className={styles.dim} d="M60 380 H380 M60 374 v12 M380 374 v12" />
        <text x="190" y="396">
          4.5 m · 3 bays
        </text>
        <path className={styles.dim} d="M40 60 V360 M34 60 h12 M34 360 h12" />
        <text x="-240" y="32" transform="rotate(-90)">
          6.0 m
        </text>
      </g>
      <g className={`${styles.ann} ${styles.annCallouts}`}>
        <path className={styles.dim} d="M380 160 L430 130 H510" />
        <text x="432" y="124">
          Coupler
        </text>
        <text className={styles.tag} x="432" y="144">
          × 48 out
        </text>
        <path className={styles.dim} d="M273 60 L320 30 H510" />
        <text x="402" y="24">
          Standard 3.0 m
        </text>
        <text className={styles.tag} x="444" y="44">
          × 16 out
        </text>
        <path className={styles.dim} d="M220 256 L250 230" />
        <text x="254" y="228">
          Plank
        </text>
        <text className={styles.tag} x="292" y="228">
          × 24
        </text>
      </g>
    </svg>
  );
}
