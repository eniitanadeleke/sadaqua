import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  RiArrowRightLine,
  RiArrowRightUpLine,
  RiCalendarLine,
  RiCheckboxCircleLine,
  RiCoinsLine,
  RiHeadphoneLine,
  RiInformationLine,
  RiMailCheckLine,
  RiMapPinLine,
  RiMoneyDollarCircleLine,
  RiTimeLine,
} from "react-icons/ri";
import { ReceiptButton } from "@/components/donations/DonationResult";
import styles from "@/components/donations/DonationResult/DonationResult.module.css";
import flow from "@/components/donations/DonationFlow/DonationFlow.module.css";
import SadaqahIcon from "@/components/icons/SadaqahIcon";
import BackHeader from "@/components/layout/BackHeader";
import MobileHeader from "@/components/layout/MobileHeader";
import MobileScreen from "@/components/layout/MobileScreen";
import { getDonation } from "@/lib/api/donations";
import { getCategory } from "@/lib/categories";
import { formatDateTime, formatNaira } from "@/lib/format";
import { GIVER_MENU } from "@/lib/navigation";

export const metadata = { title: "Donation details | Sadaqua" };

// One donation from Giving history (Figma: Donation details).
// Try: /giver/giving-history/SADQ-2782026-2K4A8M
export default async function DonationDetailsPage({ params, searchParams }) {
  const { donationId } = await params;
  const { type, amount, cause: causeId } = await searchParams;
  const donation = await getDonation(decodeURIComponent(donationId), {
    type,
    amount,
    causeId,
  });
  if (!donation) notFound();

  const general = donation.type === "general";
  const cause = donation.cause;
  const category = cause ? getCategory(cause.category) : null;
  const CategoryIcon = category?.Icon;
  const updatesHref = cause
    ? `/giver/impact?cause=${cause.id}`
    : "/giver/impact";

  return (
    <MobileScreen top="flush" className={styles.detailsScreen}>
      <MobileHeader
        homeHref="/giver"
        profileHref="/giver/profile"
        menuItems={GIVER_MENU}
      />
      <BackHeader
        title="Donation details"
        backHref="/giver/giving-history"
        className={styles.backRow}
      />

      {/* What the money went to */}
      <section className={styles.causeCard} aria-label="Donation">
        {general ? (
          <div className={`${styles.causePhoto} ${styles.generalPhoto}`}>
            <span className={flow.generalIcon} aria-hidden="true" />
          </div>
        ) : (
          <div className={styles.causePhoto}>
            <Image src={cause.image} alt="" fill sizes="112px" />
          </div>
        )}
        <div>
          <p className={styles.causeTitle}>
            {general ? "General donation" : cause.title}
          </p>
          {!general && (
            <ul className={flow.meta}>
              <li>
                <CategoryIcon className={flow.metaIcon} aria-hidden="true" />
                {category.label}
              </li>
              <li>
                <RiMapPinLine className={flow.metaIcon} aria-hidden="true" />
                {cause.location}
              </li>
            </ul>
          )}
          <div className={styles.causeActions}>
            {!general && (
              <span className={flow.typeChip}>
                <SadaqahIcon width={16} height={14.46} />
                Sadaqah
              </span>
            )}
            {!general && (
              <Link
                href={`/giver/causes/${cause.id}`}
                className={styles.viewCause}
              >
                View cause <RiArrowRightUpLine aria-hidden="true" />
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Status, date, amounts, reference */}
      <section
        className={`${styles.panel} ${styles.facts}`}
        aria-label="Payment"
      >
        <dl>
          <div className={styles.factRow}>
            <dt>
              <RiCheckboxCircleLine
                className={styles.factIcon}
                aria-hidden="true"
              />
              <span>Status</span>
            </dt>
            <dd className={styles.pillCell}>
              <span
                className={`${styles.pill} ${donation.status === "pending" ? styles.pillPending : ""}`}
              >
                {donation.status === "pending" ? (
                  <RiTimeLine aria-hidden="true" />
                ) : (
                  <RiCheckboxCircleLine aria-hidden="true" />
                )}
                {donation.status === "completed" ? "Completed" : "Pending"}
              </span>
            </dd>
          </div>
          <div className={styles.factRow}>
            <dt>
              <RiCalendarLine className={styles.factIcon} aria-hidden="true" />
              <span>Donation date</span>
            </dt>
            <dd className={styles.strong}>{formatDateTime(donation.paidAt)}</dd>
          </div>
          <div className={styles.factRow}>
            <dt>
              <RiMoneyDollarCircleLine
                className={styles.factIcon}
                aria-hidden="true"
              />
              <span>Amount</span>
            </dt>
            <dd className={styles.strong}>{formatNaira(donation.amount)}</dd>
          </div>
          <div className={styles.factRow}>
            <dt>
              <RiCoinsLine className={styles.factIcon} aria-hidden="true" />
              <span>Processing fee</span>
              <RiInformationLine
                className={styles.infoIcon}
                aria-label="Charged by the payment provider"
              />
            </dt>
            <dd className={styles.strong}>{formatNaira(donation.fee)}</dd>
          </div>
        </dl>
        <hr className={styles.line} />
        <dl className={styles.totalPaid}>
          <dt>Total paid</dt>
          <dd>{formatNaira(donation.total)}</dd>
        </dl>
        <hr className={`${styles.line} ${styles.lineAfterTotal}`} />
        <dl>
          <div className={styles.reference}>
            <dt>Transaction reference</dt>
            <dd>{donation.reference}</dd>
          </div>
          <div className={styles.paymentStatus}>
            <dt>Payment status</dt>
            <dd>
              <span className={styles.pill}>
                {donation.paymentStatus === "successful"
                  ? "Successful"
                  : "Pending"}
              </span>
            </dd>
          </div>
        </dl>
      </section>

      {/* Receipt */}
      <section
        className={`${styles.panel} ${styles.receipt}`}
        aria-label="Receipt"
      >
        <span className={styles.mailCircle}>
          <RiMailCheckLine aria-hidden="true" />
        </span>
        <div>
          <p className={styles.receiptTitle}>Receipt sent to your email</p>
          <p className={styles.receiptEmail}>{donation.receiptEmail}</p>
          <ReceiptButton
            variant="small"
            className={styles.smallButton}
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
      </section>

      {/* Impact updates */}
      <section className={styles.panel} aria-labelledby="impact-title">
        <h2 id="impact-title" className={styles.panelTitle}>
          Impact updates
        </h2>
        <p className={styles.panelText}>
          {general
            ? "Stay tuned for updates from Sadaqua"
            : "Stay tuned for updates from this cause"}
        </p>
        {donation.hasNewUpdates && (
          <Link href={updatesHref} className={styles.panelLink}>
            New updates available <RiArrowRightLine aria-hidden="true" />
          </Link>
        )}
      </section>

      {/* Need help */}
      <section
        className={`${styles.panel} ${styles.help}`}
        aria-labelledby="help-title"
      >
        <RiHeadphoneLine aria-hidden="true" />
        <div>
          <h2 id="help-title" className={styles.panelTitle}>
            Need help?
          </h2>
          <p className={styles.panelText}>
            If you have any question about this donation, we{"’"}re here to help
          </p>
          <Link href="/giver/support" className={styles.panelLink}>
            Contact support <RiArrowRightUpLine aria-hidden="true" />
          </Link>
        </div>
      </section>
    </MobileScreen>
  );
}
