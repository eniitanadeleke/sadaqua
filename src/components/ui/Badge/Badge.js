import { MdVerifiedUser, MdWarningAmber } from "react-icons/md";
import styles from "./Badge.module.css";

/**
 * Small pill labels on cause cards.
 * variant: "verified" (green, shield) | "urgent" (red, warning sign)
 * size:    "md" (big cards) | "sm" (small cards)
 */
export default function Badge({ variant = "verified", size = "md", className = "" }) {
  const Icon = variant === "urgent" ? MdWarningAmber : MdVerifiedUser;
  const text = variant === "urgent" ? "URGENT" : "VERIFIED";
  return (
    <span className={`${styles.badge} ${styles[variant]} ${styles[size]} ${className}`}>
      <Icon className={styles.icon} aria-hidden="true" />
      {text}
    </span>
  );
}
