import { RiInformationLine } from "react-icons/ri";
import { formatNaira } from "@/lib/format";
import styles from "./DonationFlow.module.css";

/**
 * Donation / Processing Fee / Total rows (Figma: Review your donation, Donation successful).
 * className sets the gap above it (it differs between the two screens).
 */
export default function DonationSummary({
  amount,
  fee,
  total,
  className = "",
}) {
  return (
    <div className={`${styles.summary} ${className}`}>
      <dl>
        <div className={styles.summaryRow}>
          <dt>Donation</dt>
          <dd>{formatNaira(amount)}</dd>
        </div>
        <div className={styles.summaryRow}>
          <dt>
            Processing Fee
            <span
              className={styles.feeInfo}
              title="Charged by the payment provider to process your payment"
              aria-label="About the processing fee"
              role="img"
            >
              <RiInformationLine aria-hidden="true" />
            </span>
          </dt>
          <dd>{formatNaira(fee)}</dd>
        </div>
      </dl>
      <hr className={styles.divider} />
      <dl className={styles.totalRow}>
        <dt>Total</dt>
        <dd>{formatNaira(total)}</dd>
      </dl>
    </div>
  );
}
