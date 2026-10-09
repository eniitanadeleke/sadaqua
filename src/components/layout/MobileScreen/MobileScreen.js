import styles from "./MobileScreen.module.css";

/**
 * The frame every giver and recipient screen sits in:
 * cream background, the geometric pattern along the bottom,
 * and a centred phone-width column on larger screens.
 *
 * top: "default" (Welcome screens) | "compact" (screens with the small header)
 */
export default function MobileScreen({ children, top = "default", className = "" }) {
  const topClass = top === "compact" ? styles.compact : "";
  return (
    <div className={styles.screen}>
      <main className={`${styles.content} ${topClass} ${className}`}>{children}</main>
    </div>
  );
}
