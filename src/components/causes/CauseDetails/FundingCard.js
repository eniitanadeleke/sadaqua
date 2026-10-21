import { RiArrowDownLine, RiArrowUpLine } from "react-icons/ri";
import { formatDateTime, formatNaira } from "@/lib/format";
import styles from "./CauseDetails.module.css";

/** "Funding": money raised and money already paid out, with the last update time. */
export default function FundingCard({ raised, disbursed, lastUpdated }) {
  return (
    <section className={styles.block} aria-labelledby="funding">
      <h2 id="funding" className={styles.heading}>
        Funding
      </h2>
      <dl className={styles.funding}>
        <div className={styles.fundingRow}>
          <dt>
            <span className={styles.arrow} aria-hidden="true">
              <RiArrowUpLine />
            </span>
            Raised
          </dt>
          <dd>{formatNaira(raised)}</dd>
        </div>
        <div className={styles.fundingRow}>
          <dt>
            <span className={styles.arrow} aria-hidden="true">
              <RiArrowDownLine />
            </span>
            Disbursed
          </dt>
          <dd>{formatNaira(disbursed)}</dd>
        </div>
      </dl>
      {lastUpdated && <p className={styles.lastUpdated}>Last updated: {formatDateTime(lastUpdated)}</p>}
    </section>
  );
}
