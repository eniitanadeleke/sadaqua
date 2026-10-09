import styles from "./InfoCard.module.css";

/**
 * Small bordered card with an icon on the left, a title and a short message.
 * Used for reassurance notes, e.g. "Your information is protected".
 *
 * icon: an SVG element (drawn in the current text colour)
 */
export default function InfoCard({ icon, title, children }) {
  return (
    <div className={styles.card}>
      <span className={styles.iconCircle} aria-hidden="true">
        {icon}
      </span>
      <div className={styles.text}>
        <p className={styles.title}>{title}</p>
        <p className={styles.body}>{children}</p>
      </div>
    </div>
  );
}
