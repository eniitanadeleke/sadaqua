import Link from "next/link";
import styles from "./SectionHeader.module.css";

/** Section title on the left, optional "View all" link on the right. */
export default function SectionHeader({ title, subtitle, actionHref, actionLabel = "View all", id }) {
  return (
    <div className={styles.header}>
      <div>
        <h2 id={id} className={styles.title}>
          {title}
        </h2>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      </div>
      {actionHref && (
        <Link href={actionHref} className={styles.action}>
          {actionLabel}
        </Link>
      )}
    </div>
  );
}
