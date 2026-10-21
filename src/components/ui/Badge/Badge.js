import { RiAlertLine, RiShieldCheckFill } from "react-icons/ri";
import styles from "./Badge.module.css";

/**
 * Small pill labels on cause cards.
 * variant: "verified" (green, shield) | "urgent" (red, warning sign) | "fulfilled" (grey, no icon)
 * size:    "md" (big cards) | "sm" (small cards)
 */
export default function Badge({ variant = "verified", size = "md", className = "" }) {
  const Icon = { verified: RiShieldCheckFill, urgent: RiAlertLine }[variant];
  const text = { verified: "VERIFIED", urgent: "URGENT", fulfilled: "FULFILLED" }[variant];
  return (
    <span className={`${styles.badge} ${styles[variant]} ${styles[size]} ${className}`}>
      {Icon && <Icon className={styles.icon} aria-hidden="true" />}
      {text}
    </span>
  );
}
