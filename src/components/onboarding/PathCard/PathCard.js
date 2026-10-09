import Link from "next/link";
import styles from "./PathCard.module.css";

/**
 * The large "I want to give" / "I need help" choice cards on the Welcome screen.
 * The whole card is one link, so it is easy to tap on a phone.
 *
 * icon: path to an SVG in /public/icons. It is used as a mask, so CSS can
 *       recolour it (gold normally, deep green when the card turns green).
 */
export default function PathCard({ href, title, description, icon }) {
  return (
    <Link href={href} className={styles.card}>
      <span className={styles.iconCircle} aria-hidden="true">
        <span className={styles.icon} style={{ "--icon": `url(${icon})` }} />
      </span>

      <span className={styles.text}>
        <span className={styles.title}>{title}</span>
        <span className={styles.description}>{description}</span>
      </span>

      <span className={styles.arrow} aria-hidden="true">
        <svg viewBox="0 0 24 24">
          <path d="M12 4 10.6 5.4 16.2 11H4v2h12.2l-5.6 5.6L12 20l8-8-8-8Z" />
        </svg>
      </span>
    </Link>
  );
}
