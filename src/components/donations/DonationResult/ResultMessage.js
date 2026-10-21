import { RiCheckLine, RiCloseLine } from "react-icons/ri";
import styles from "./DonationResult.module.css";

const ICONS = {
  success: <RiCheckLine aria-hidden="true" />,
  failed: <RiCloseLine aria-hidden="true" />,
  cancelled: (
    <span className={styles.bang} aria-hidden="true">
      !
    </span>
  ),
};

/**
 * Round icon, Fraunces title and grey message at the top of a result screen.
 * tone: "success" (green tick) | "failed" (red cross) | "cancelled" (orange "!")
 * lines: the message, one string per line as in Figma
 */
export default function ResultMessage({ tone, title, lines }) {
  const position = tone === "success" ? styles.resultTop : styles.resultMiddle;
  return (
    <div
      className={`${styles.result} ${styles[tone]} ${position}`}
      role="status"
    >
      <span className={styles.circle}>{ICONS[tone]}</span>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.message}>
        {lines.map((line, i) => (
          <span key={line}>
            {i > 0 && <br />}
            {line}
          </span>
        ))}
      </p>
    </div>
  );
}
