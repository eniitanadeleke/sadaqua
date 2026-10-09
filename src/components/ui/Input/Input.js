import styles from "./Input.module.css";

/**
 * Text field used on every form.
 *
 * label:    text shown above the field (optional; many mobile screens have none)
 * hint:     grey helper text under the field
 * error:    red message under the field; also turns the border red
 * prefix:   something shown inside the field on the left, e.g. the naira sign
 * suffix:   something on the right, e.g. a show/hide password button
 */
export default function Input({
  id,
  name,
  label,
  required = false,
  hint,
  error,
  prefix,
  suffix,
  className = "",
  ...rest
}) {
  const inputId = id || name;
  const hintId = hint ? `${inputId}-hint` : undefined;
  const errorId = error ? `${inputId}-error` : undefined;

  return (
    <div className={`${styles.field} ${className}`}>
      {label && (
        <label htmlFor={inputId} className={styles.label}>
          {label}
          {required && <span className={styles.required}> *</span>}
        </label>
      )}

      <div className={styles.box}>
        {prefix && <span className={styles.prefix}>{prefix}</span>}
        <input
          id={inputId}
          name={name}
          required={required}
          className={styles.input}
          aria-invalid={error ? true : undefined}
          aria-describedby={[errorId, hintId].filter(Boolean).join(" ") || undefined}
          {...rest}
        />
        {suffix && <span className={styles.suffix}>{suffix}</span>}
      </div>

      {error && (
        <p id={errorId} className={styles.error} role="alert">
          <svg
            className={styles.errorIcon}
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M12 2 1 21h22L12 2Zm1 15h-2v-2h2v2Zm0-4h-2V9h2v4Z" />
          </svg>
          {error}
        </p>
      )}

      {hint && !error && (
        <p id={hintId} className={styles.hint}>
          {hint}
        </p>
      )}
    </div>
  );
}
