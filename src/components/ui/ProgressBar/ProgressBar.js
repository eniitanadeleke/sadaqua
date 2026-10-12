import styles from "./ProgressBar.module.css";

/** A thin bar showing how much of a goal is reached. value: 0 to 100 */
export default function ProgressBar({ value, label, className = "" }) {
  return (
    <div
      className={`${styles.track} ${className}`}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={value}
      aria-label={label}
    >
      <div className={styles.fill} style={{ width: `${value}%` }} />
    </div>
  );
}
