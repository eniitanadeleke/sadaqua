import { RiAlertLine, RiNotification3Line, RiShieldCheckFill } from "react-icons/ri";
import styles from "./Badge.module.css";

/**
 * Small pill labels on cause cards.
 * variant: "verified" (green, shield) | "urgent" (red, warning sign) | "fulfilled" (grey, no icon)
 * size:    "lg" (Cause details) | "md" (big cards) | "sm" (small cards)
 * bell:    urgent badge with a bell instead of the warning sign (Figma: Cause details - Urgent)
 */
export default function Badge({ variant = "verified", size = "md", bell = false, className = "" }) {
  const Icon = { verified: RiShieldCheckFill, urgent: bell ? RiNotification3Line : RiAlertLine }[variant];
  const text = { verified: "VERIFIED", urgent: "URGENT", fulfilled: "FULFILLED" }[variant];
  return (
    <span className={`${styles.badge} ${styles[variant]} ${styles[size]} ${className}`}>
      {Icon && <Icon className={styles.icon} aria-hidden="true" />}
      {text}
    </span>
  );
}
