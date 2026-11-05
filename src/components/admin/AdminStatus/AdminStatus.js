import styles from "./AdminStatus.module.css";

/**
 * Coloured status label used in admin tables and panels (Figma: Status).
 * tone: "neutral" | "gold" | "green" | "orange" | "red" | "active" | "muted"
 */
export default function AdminStatus({
  tone = "neutral",
  children,
  className = "",
}) {
  return (
    <span className={`${styles.status} ${styles[tone]} ${className}`}>
      {children}
    </span>
  );
}
