import Link from "next/link";
import styles from "./Button.module.css";

/**
 * The one button used across Sadaqua.
 *
 * variant:  "filled" (green) | "outlined" (white with green border)
 * size:     "large" | "medium" | "small"
 * loading:  shows a spinner and blocks clicks (e.g. "Creating account...")
 * href:     if given, the button becomes a link to that page
 */
export default function Button({
  children,
  variant = "filled",
  size = "large",
  fullWidth = false,
  loading = false,
  loadingText,
  disabled = false,
  href,
  type = "button",
  className = "",
  ...rest
}) {
  const classes = [
    styles.button,
    styles[variant],
    styles[size],
    fullWidth ? styles.fullWidth : "",
    loading ? styles.loading : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      <span>{loading && loadingText ? loadingText : children}</span>
      {loading && <span className={styles.spinner} aria-hidden="true" />}
    </>
  );

  // A button that only takes you to another page is really a link.
  if (href && !disabled && !loading) {
    return (
      <Link href={href} className={classes} {...rest}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...rest}
    >
      {content}
    </button>
  );
}
