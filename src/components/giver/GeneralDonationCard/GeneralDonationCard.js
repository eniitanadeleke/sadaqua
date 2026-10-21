import Button from "@/components/ui/Button";
import styles from "./GeneralDonationCard.module.css";

/**
 * Gold "General donation" card on Giver Home (updated Figma).
 * It leads to the General donation path of the donation flow, where the
 * money goes to Sadaqua's general fund instead of one cause.
 */
export default function GeneralDonationCard({ href = "/giver/donate/general" }) {
  return (
    <section className={styles.card} aria-labelledby="general-donation">
      <span className={styles.circle} aria-hidden="true">
        <span className={styles.icon} />
      </span>

      <div className={styles.text}>
        <h2 id="general-donation" className={styles.title}>
          General donation
        </h2>
        <p className={styles.description}>{"Support Sadaqua\u2019s broader assistance efforts."}</p>
      </div>

      <div className={styles.actions}>
        <Button href={href} className={styles.donate}>
          Donate
        </Button>
      </div>
    </section>
  );
}
