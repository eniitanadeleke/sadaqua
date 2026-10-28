import Button from "@/components/ui/Button";
import styles from "./IconEmptyState.module.css";

/**
 * Round icon, Fraunces title, grey message and an optional full-width button
 * (Figma: Giving History - Empty, No Saved Causes, Impact updates - Empty state).
 *
 * tone: "mint" (pale green circle) | "green" (green at 10%)
 * The gaps differ from screen to screen in Figma, so the page sets them with
 * className (--title-gap, --message-gap, --button-gap).
 */
export default function IconEmptyState({
  icon,
  tone = "green",
  title,
  children,
  actionLabel,
  actionHref,
  className = "",
}) {
  return (
    <section className={`${styles.empty} ${className}`}>
      <span className={`${styles.circle} ${styles[tone]}`} aria-hidden="true">
        {icon}
      </span>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.message}>{children}</div>
      {actionHref && (
        <Button href={actionHref} fullWidth className={styles.button}>
          {actionLabel}
        </Button>
      )}
    </section>
  );
}
