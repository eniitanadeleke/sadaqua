import { RiLockLine } from "react-icons/ri";
import styles from "./DonationFlow.module.css";

/** "Secured and encrypted" under the main button (12px, or 14px on the review screen) */
export default function SecureNote({ size = "small" }) {
  return (
    <p
      className={`${styles.secure} ${size === "large" ? styles.secureLarge : ""}`}
    >
      <RiLockLine aria-hidden="true" />
      Secured and encrypted
    </p>
  );
}
