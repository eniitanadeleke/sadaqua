import { getRequestStatus } from "@/lib/requestStatus";
import styles from "./RequestStatusBadge.module.css";

/**
 * Pill with a dot showing where a help request is (Figma: "Under review").
 * status: a key from lib/requestStatus.js, e.g. "under_review"
 */
export default function RequestStatusBadge({ status, className = "" }) {
  const { label, tone } = getRequestStatus(status);
  return (
    <span className={`${styles.badge} ${styles[tone]} ${className}`}>
      <span className={styles.dot} aria-hidden="true" />
      {label}
    </span>
  );
}
