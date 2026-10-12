import { MdVerifiedUser, MdWarningAmber } from "react-icons/md";
import styles from "./Badge.module.css";

/**
 * Small pill labels on cause cards.
 * variant: "verified" (green, shield) | "urgent" (red, warning sign) | "fulfilled" (grey, no icon)
 * size:    "md" (big cards) | "sm" (small cards)
 */
export default function Badge({ variant = "verified", size = "md", className = "" }) {
  const Icon = { verified: MdVerifiedUser, urgent: MdWarningAmber }[variant];
  const text = { verified: "VERIFIED", urgent: "URGENT", fulfilled: "FULFILLED" }[variant];
  return (
    <span className={`${styles.badge} ${styles[variant]} ${styles[size]} ${className}`}>
      {Icon && <Icon className={styles.icon} aria-hidden="true" />}
      {text}
    </span>
  );
}
