import Image from "next/image";
import Link from "next/link";
import {
  RiArrowRightLine,
  RiCheckboxCircleLine,
  RiMapPinLine,
  RiTimeLine,
} from "react-icons/ri";
import { ReceiptButton } from "@/components/donations/DonationResult";
import SadaqahIcon from "@/components/icons/SadaqahIcon";
import Button from "@/components/ui/Button";
import { getCategory } from "@/lib/categories";
import { formatNaira, formatShortDate } from "@/lib/format";
import styles from "./DonationHistoryCard.module.css";

/**
 * One donation in Giving history (Figma: Giving History).
 * donation: from getGivingHistory() - { reference, status, amount, paidAt, cause, ... }
 */
export default function DonationHistoryCard({ donation }) {
  const { cause } = donation;
  const general = donation.type === "general" || !cause;
  const category = cause ? getCategory(cause.category) : null;
  const pending = donation.status === "pending";
  const StatusIcon = pending ? RiTimeLine : RiCheckboxCircleLine;
  const detailsHref = `/giver/giving-history/${donation.reference}`;

  return (
    <article className={styles.card}>
      <div className={styles.top}>
        <div
          className={`${styles.photo} ${general ? styles.generalPhoto : ""}`}
        >
          {general ? (
            <span className={styles.generalIcon} aria-hidden="true" />
          ) : (
            <Image src={cause.image} alt="" fill sizes="112px" />
          )}
        </div>

        <div className={styles.info}>
          <div className={styles.header}>
            <span
              className={`${styles.status} ${pending ? styles.pending : styles.completed}`}
            >
              <StatusIcon aria-hidden="true" />
              {pending ? "Pending" : "Completed"}
            </span>
            <Link href={detailsHref} className={styles.details}>
              View details <RiArrowRightLine aria-hidden="true" />
            </Link>
          </div>

          <h3 className={styles.title}>
            {general ? "General donation" : cause.title}
          </h3>
          {!general && (
            <ul className={styles.meta}>
              <li>
                <category.Icon className={styles.metaIcon} aria-hidden="true" />
                {category.label}
              </li>
              <li>
                <RiMapPinLine className={styles.metaIcon} aria-hidden="true" />
                {cause.location}
              </li>
            </ul>
          )}

          <div className={styles.bottom}>
            {!general && (
              <span className={styles.typeChip}>
                <SadaqahIcon width={16} height={14.46} />
                Sadaqah
              </span>
            )}
            <p className={styles.amount}>
              <strong>{formatNaira(donation.amount)}</strong>
              <span>{formatShortDate(donation.paidAt.slice(0, 10))}</span>
            </p>
          </div>
        </div>
      </div>

      <div className={styles.actions}>
        <Button
          href={general ? "/giver/donate/general" : `/giver/causes/${cause.id}`}
          variant="outlined"
          className={styles.action}
        >
          {general ? "Give again" : "View cause"}
        </Button>
        <ReceiptButton
          variant="large"
          className={styles.action}
          donation={{
            reference: donation.reference,
            paidAt: donation.paidAt,
            amount: donation.amount,
            fee: donation.fee,
            total: donation.total,
            causeTitle: general ? "General donation" : cause.title,
          }}
        />
      </div>
    </article>
  );
}
