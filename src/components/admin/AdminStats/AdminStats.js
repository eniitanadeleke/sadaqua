import styles from "./AdminStats.module.css";

/**
 * The row of number cards under the page title (Figma: "New request 16"...).
 * items: [{ label, value, icon: Component, tone: "green" | "gold" | "orange" | "deep" | "red" }]
 */
export default function AdminStats({ items, className = "" }) {
  return (
    <ul className={`${styles.stats} ${className}`}>
      {items.map(({ label, value, icon: Icon, tone = "deep", note }) => (
        <li key={label} className={styles.card}>
          <span className={`${styles.icon} ${styles[tone]}`} aria-hidden="true">
            <Icon />
          </span>
          <div>
            <p className={styles.label}>{label}</p>
            <p className={styles.value}>{value}</p>
            {note && <p className={styles.note}>{note}</p>}
          </div>
        </li>
      ))}
    </ul>
  );
}
