import { RiShieldKeyholeLine } from "react-icons/ri";
import styles from "./PrivacyNotice.module.css";

/** Pale green "Your privacy matters" note (Figma: Recipient Home) */
export default function PrivacyNotice({ className = "" }) {
  return (
    <aside className={`${styles.notice} ${className}`}>
      <RiShieldKeyholeLine className={styles.icon} aria-hidden="true" />
      <div>
        <p className={styles.title}>Your privacy matters</p>
        <p className={styles.text}>
          Your information is safe with us and will only be
          <br />
          used to process your request.
        </p>
      </div>
    </aside>
  );
}
