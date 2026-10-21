import { DONATION_TYPES } from "@/lib/api/donations";
import styles from "./DonationFlow.module.css";

/** White "General donation" card at the top of the General donation screens */
export default function GeneralDonationInfo() {
  const { label, description } = DONATION_TYPES.general;
  return (
    <section className={styles.generalCard} aria-labelledby="general-info">
      <span className={styles.generalCircle} aria-hidden="true">
        <span className={styles.generalIcon} />
      </span>
      <div>
        <h3 id="general-info" className={styles.generalTitle}>
          {label}
        </h3>
        <p className={styles.generalText}>{description}</p>
      </div>
    </section>
  );
}
