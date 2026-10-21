import { RiCalendarLine, RiMapPinLine, RiPriceTag3Line, RiTeamLine } from "react-icons/ri";
import { getCategory } from "@/lib/categories";
import { formatShortDate } from "@/lib/format";
import styles from "./CauseDetails.module.css";

/** The cream box: who it helps, where, category, start date and campaign ID. */
export default function CauseFacts({ cause }) {
  const category = getCategory(cause.category);
  const CategoryIcon = category.Icon;
  return (
    <dl className={styles.facts}>
      <div className={styles.factsTop}>
        <div className={styles.factHalf}>
          <dt>Beneficiaries</dt>
          <dd>
            <RiTeamLine className={styles.factIcon} aria-hidden="true" />
            {cause.beneficiaries}
          </dd>
        </div>
        <div className={`${styles.factHalf} ${styles.factHalfRight}`}>
          <dt>Location</dt>
          <dd>
            <RiMapPinLine className={styles.factIcon} aria-hidden="true" />
            {cause.location}
          </dd>
        </div>
      </div>
      <FactRow Icon={CategoryIcon} label="Category" value={category.label} />
      <FactRow Icon={RiCalendarLine} label="Started on" value={formatShortDate(cause.startedOn)} />
      <FactRow Icon={RiPriceTag3Line} label="Campaign ID" value={cause.campaignId} />
    </dl>
  );
}

function FactRow({ Icon, label, value }) {
  return (
    <div className={styles.factRow}>
      <dt>
        <Icon className={styles.factIcon} aria-hidden="true" />
        {label}
      </dt>
      <dd>{value}</dd>
    </div>
  );
}
