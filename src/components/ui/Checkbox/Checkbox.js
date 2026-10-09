import styles from "./Checkbox.module.css";

/**
 * Checkbox with a label, styled like the Figma design system
 * (green box with a white tick when checked).
 */
export default function Checkbox({
  id,
  name,
  children,
  error,
  className = "",
  ...rest
}) {
  const inputId = id || name;
  const errorId = error ? `${inputId}-error` : undefined;

  return (
    <div className={`${styles.field} ${className}`}>
      <label className={styles.row} htmlFor={inputId}>
        <input
          type="checkbox"
          id={inputId}
          name={name}
          className={styles.box}
          aria-invalid={error ? true : undefined}
          aria-describedby={errorId}
          {...rest}
        />
        <span className={styles.label}>{children}</span>
      </label>
      {error && (
        <p id={errorId} className={styles.error} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
