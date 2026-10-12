import ProgressBar from "@/components/ui/ProgressBar";
import { formatNaira, formatNairaShort, percentRaised } from "@/lib/format";
import styles from "./CauseProgress.module.css";

/**
 * "N180,000 raised of N300,000   60%" with the bar under it.
 * size: "md" (big card) | "sm" (small card, short amounts like N14.5m)
 */
export default function CauseProgress({ raised, goal, size = "md", className = "" }) {
  const percent = percentRaised(raised, goal);
  const format = size === "sm" ? formatNairaShort : formatNaira;
  return (
    <div className={`${styles.progress} ${styles[size]} ${className}`}>
      <p className={styles.text}>
        <span>
          <strong>{format(raised)}</strong> raised of {format(goal)}
        </span>
        <span className={styles.percent}>{percent}%</span>
      </p>
      <ProgressBar value={percent} label={`${percent}% of the goal raised`} className={styles.bar} />
    </div>
  );
}
