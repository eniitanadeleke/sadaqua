import styles from "./DotSpinner.module.css";

// Figma: seven 3px dots on a 19px circle (half a ring), fading from full to 14%.
const DOTS = [1, 0.86, 0.71, 0.57, 0.43, 0.29, 0.14];

/** The dotted spinner on the "Processing" and "Preparing payment" buttons (24 x 24 box) */
export default function DotSpinner({ className = "" }) {
  return (
    <svg
      viewBox="-12 -12 24 24"
      width="24"
      height="24"
      className={`${styles.spinner} ${className}`}
      aria-hidden="true"
    >
      {DOTS.map((opacity, i) => {
        const angle = Math.PI + (i * Math.PI) / 6; // left, then over the top to the right
        return (
          <circle
            key={opacity}
            cx={(9.5 * Math.cos(angle)).toFixed(2)}
            cy={(9.5 * Math.sin(angle)).toFixed(2)}
            r="1.5"
            fill="currentColor"
            fillOpacity={opacity}
          />
        );
      })}
    </svg>
  );
}
