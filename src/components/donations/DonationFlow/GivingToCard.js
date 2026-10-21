import Image from "next/image";
import Link from "next/link";
import { RiArrowRightLine, RiMapPinLine } from "react-icons/ri";
import SadaqahIcon from "@/components/icons/SadaqahIcon";
import ProgressBar from "@/components/ui/ProgressBar";
import { getCategory } from "@/lib/categories";
import { formatNaira, percentRaised } from "@/lib/format";
import styles from "./DonationFlow.module.css";

/**
 * Green "Giving to" card with the cause photo, title, category and place.
 *
 * show: "progress" - amount needed / raised and the bar (Choose an option screen)
 *       "type"     - the "Sadaqah" chip and a "Change" link (amount and review screens)
 * label: "Giving to", or "Gave to" on the Donation successful screen
 */
export default function GivingToCard({
  cause,
  show = "progress",
  changeHref,
  label = "Giving to",
}) {
  const category = getCategory(cause.category);
  const CategoryIcon = category.Icon;
  const percent = percentRaised(cause.raised, cause.goal);

  return (
    <section
      className={`${styles.givingCard} ${show === "type" ? styles.givingCardType : ""}`}
      aria-labelledby="giving-to"
    >
      <h3 id="giving-to" className={styles.givingLabel}>
        {label}
      </h3>

      <div className={styles.givingRow}>
        <div className={styles.photo}>
          <Image src={cause.image} alt="" fill sizes="112px" />
        </div>

        <div>
          <p className={styles.causeTitle}>{cause.title}</p>
          <ul className={styles.meta}>
            <li>
              <CategoryIcon className={styles.metaIcon} aria-hidden="true" />
              {category.label}
            </li>
            <li>
              <RiMapPinLine className={styles.metaIcon} aria-hidden="true" />
              {cause.location}
            </li>
          </ul>

          {show === "type" && (
            <div className={styles.typeRow}>
              <span className={styles.typeChip}>
                <SadaqahIcon width={16} height={14.46} />
                Sadaqah
              </span>
              {changeHref && (
                <Link href={changeHref} className={styles.change}>
                  Change <RiArrowRightLine aria-hidden="true" />
                </Link>
              )}
            </div>
          )}
        </div>
      </div>

      {show === "progress" && (
        <>
          <div className={styles.amounts}>
            <div>
              <p>Amount needed: {formatNaira(cause.goal)}</p>
              <p>Amount raised: {formatNaira(cause.raised)}</p>
            </div>
            <p className={styles.amountsPercent}>{percent}%</p>
          </div>
          <ProgressBar
            value={percent}
            label={`${percent}% raised`}
            className={styles.cardBar}
          />
        </>
      )}
    </section>
  );
}
