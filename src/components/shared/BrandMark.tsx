/** Scaffold-frame logo mark: two standards, two ledgers, one brace. */
export default function BrandMark({ size = 22 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 22 22"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path d="M4 2v18M18 2v18M4 7h14M4 15h14M4 7l14 8" />
    </svg>
  );
}
