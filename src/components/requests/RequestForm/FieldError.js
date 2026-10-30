import { RiErrorWarningLine } from "react-icons/ri";
import styles from "./RequestForm.module.css";

/** Red message under a field when something is missing or wrong */
export default function FieldError({ id, children }) {
  if (!children) return null;
  return (
    <p id={id} className={styles.error} role="alert">
      <RiErrorWarningLine className={styles.errorIcon} aria-hidden="true" />
      {children}
    </p>
  );
}
