import { RiArrowDownLine, RiArrowUpLine } from "react-icons/ri";
import styles from "./ReportStats.module.css";

/**
 * The four number cards on Reports (Figma: "Registered users 120,
 * ↑8.2% from 1 Aug - 7 Aug").
 * items: [{ label, value, icon, tone, change, compareText }]
 *   change: percent up (+) or down (-); compareText: "1 Aug - 7 Aug" or null
 */
export default function ReportStats({ items }) {
  return (
    <ul className={styles.stats}>
      {items.map(({ label, value, icon: Icon, tone, change, compareText }) => {
        const Arrow = change < 0 ? RiArrowDownLine : RiArrowUpLine;
        return (
          <li key={label} className={styles.card}>
            <span
              className={`${styles.icon} ${styles[tone]}`}
              aria-hidden="true"
            >
              <Icon />
            </span>
            <div>
              <p className={styles.label}>{label}</p>
              <p className={styles.value}>{value}</p>
              {compareText && (
                <p className={styles.change}>
                  <Arrow className={styles.arrow} aria-hidden="true" />
                  <span className={styles.percent}>{Math.abs(change)}%</span>
                  <span className={styles.from}>from {compareText}</span>
                </p>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
