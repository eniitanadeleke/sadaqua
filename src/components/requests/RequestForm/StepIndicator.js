import { RiCheckLine } from "react-icons/ri";
import styles from "./RequestForm.module.css";

const STEPS = ["Need", "Details", "Verify", "Review"];

/**
 * The 1-2-3-4 row at the top of Help request (Figma: Need, Details, Verify, Review).
 * Steps before the current one show a green tick; the current one is a
 * filled green circle; the rest are beige outlines.
 *
 * current: 1 to 4
 */
export default function StepIndicator({ current }) {
  return (
    <ol className={styles.steps} aria-label={`Step ${current} of 4`}>
      {STEPS.map((label, i) => {
        const number = i + 1;
        const state =
          number < current ? "done" : number === current ? "current" : "todo";
        return (
          <li
            key={label}
            className={`${styles.step} ${styles[state]}`}
            aria-current={state === "current" ? "step" : undefined}
          >
            {i > 0 && <span className={styles.stepLine} aria-hidden="true" />}
            <span className={styles.stepCircle}>
              {state === "done" ? (
                <RiCheckLine className={styles.stepTick} aria-hidden="true" />
              ) : (
                number
              )}
            </span>
            <span className={styles.stepLabel}>{label}</span>
          </li>
        );
      })}
    </ol>
  );
}
