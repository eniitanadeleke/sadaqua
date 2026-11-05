import styles from "./AdminPageHeading.module.css";

/**
 * Page title and the line under it (Figma: "Verification", "Approved Causes"...).
 * actions: buttons shown on the right (e.g. "+ Add user", "Share report")
 */
export default function AdminPageHeading({ title, subtitle, actions }) {
  return (
    <div className={styles.heading}>
      <div>
        <h1 className={styles.title}>{title}</h1>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      </div>
      {actions && <div className={styles.actions}>{actions}</div>}
    </div>
  );
}
