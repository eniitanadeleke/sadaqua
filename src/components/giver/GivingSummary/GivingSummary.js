import { MdErrorOutline, MdOutlineAccountBalanceWallet } from "react-icons/md";
import Button from "@/components/ui/Button";
import { formatNaira } from "@/lib/format";
import styles from "./GivingSummary.module.css";

/** "Your Giving" card: total donated, causes supported and a nudge to give. */
export default function GivingSummary({ totalDonated, causesSupported }) {
  const isNew = causesSupported === 0;
  return (
    <section className={styles.card} aria-labelledby="your-giving">
      <h2 id="your-giving" className={styles.title}>
        Your Giving
        <MdErrorOutline
          className={styles.info}
          role="img"
          aria-label="Totals from donations you have made on Sadaqua"
        />
      </h2>

      <div className={styles.stats}>
        <Stat value={formatNaira(totalDonated)} label="Total donated" />
        <span className={styles.divider} aria-hidden="true" />
        <Stat value={causesSupported} label="Causes supported" />
      </div>

      <p className={styles.nudge}>
        {isNew ? "You are yet to make a donation" : "Keep making an impact"}
      </p>
      <p className={styles.hint}>Browse causes and support people in need</p>

      <div className={styles.actions}>
        <Button href="/giver/causes" variant="outlined" className={styles.button}>
          Browse causes
        </Button>
      </div>
    </section>
  );
}

function Stat({ value, label }) {
  return (
    <div className={styles.stat}>
      <span className={styles.circle} aria-hidden="true">
        <MdOutlineAccountBalanceWallet />
      </span>
      <p>
        <span className={styles.value}>{value}</span>
        <span className={styles.label}>{label}</span>
      </p>
    </div>
  );
}
