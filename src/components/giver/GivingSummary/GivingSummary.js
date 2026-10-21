import { RiErrorWarningLine } from "react-icons/ri";
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
        <RiErrorWarningLine
          className={styles.info}
          role="img"
          aria-label="Totals from donations you have made on Sadaqua"
        />
      </h2>

      <div className={styles.stats}>
        <Stat value={formatNaira(totalDonated)} label="Total donated" icon="/icons/give.svg" />
        <span className={styles.divider} aria-hidden="true" />
        <Stat value={causesSupported} label="Causes supported" icon="/icons/need-help.svg" />
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

// icon: an SVG in /public/icons used as a stencil, so CSS sets its colour
// (the same hand-and-heart and open-hands icons as the Welcome cards).
function Stat({ value, label, icon }) {
  return (
    <div className={styles.stat}>
      <span className={styles.circle} aria-hidden="true">
        <span className={styles.icon} style={{ "--icon": `url(${icon})` }} />
      </span>
      <p>
        <span className={styles.value}>{value}</span>
        <span className={styles.label}>{label}</span>
      </p>
    </div>
  );
}
