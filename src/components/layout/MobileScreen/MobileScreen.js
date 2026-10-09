import styles from "./MobileScreen.module.css";

/**
 * The frame every giver and recipient screen sits in:
 * cream background, the geometric pattern along the bottom,
 * and a centred phone-width column on larger screens.
 */
export default function MobileScreen({ children, className = "" }) {
  return (
    <div className={styles.screen}>
      <main className={`${styles.content} ${className}`}>{children}</main>
    </div>
  );
}
