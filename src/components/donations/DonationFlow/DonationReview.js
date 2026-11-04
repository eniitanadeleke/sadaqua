"use client";

import { useState } from "react";
import { RiErrorWarningLine } from "react-icons/ri";
import ImagePlaceholderIcon from "@/components/icons/ImagePlaceholderIcon";
import Button from "@/components/ui/Button";
import { startPayment } from "@/lib/api/donations";
import BusyButton from "./BusyButton";
import DonationSummary from "./DonationSummary";
import SecureNote from "./SecureNote";
import styles from "./DonationFlow.module.css";

/**
 * Review your donation: summary, top-up note and "Make Payment".
 * (The "Payment / What is Paystack?" card was removed at the client's request.)
 * On Make Payment the screen turns into the grey loading version
 * (Figma: Make Payment Loading) until the payment page is ready.
 *
 * card:  the "Giving to" or "General donation" card (drawn by the page)
 * quote: { amount, fee, total }
 */
export default function DonationReview({ type, causeId, card, quote }) {
  const [preparing, setPreparing] = useState(false);
  const [error, setError] = useState("");

  async function handlePay() {
    setError("");
    setPreparing(true);
    try {
      const { checkoutUrl } = await startPayment({
        type,
        causeId,
        amount: quote.amount,
      });
      window.location.assign(checkoutUrl);
    } catch {
      setError("We could not start the payment. Please try again.");
      setPreparing(false);
    }
  }

  if (preparing) return <ReviewSkeleton type={type} />;

  return (
    <>
      <h2 className={styles.heading}>Review your donation</h2>
      <p className={styles.subtitle}>
        Please check your details before continuing to payment
      </p>

      {card}

      <h3 className={styles.sectionTitle}>Donation summary</h3>
      <DonationSummary
        amount={quote.amount}
        fee={quote.fee}
        total={quote.total}
      />

      <div className={`${styles.goalNote} ${styles.topUpNote}`}>
        <RiErrorWarningLine className={styles.goalIcon} aria-hidden="true" />
        <p>The platform top-up is optional and separate from your donation.</p>
      </div>

      <Button fullWidth onClick={handlePay} className={styles.makePayment}>
        Make Payment
      </Button>
      {error && (
        <p className={styles.payError} role="alert">
          {error}
        </p>
      )}
      <SecureNote size="large" />
    </>
  );
}

/** Grey placeholder of the Review screen while the payment is being prepared */
function ReviewSkeleton({ type }) {
  const bone = (width, extra = {}) => (
    <span
      className={styles.bone}
      style={{ width, ...extra }}
      aria-hidden="true"
    />
  );

  return (
    <div aria-busy="true">
      <span
        className={`${styles.bone} ${styles.skHeading}`}
        aria-hidden="true"
      />
      <span
        className={`${styles.bone} ${styles.skSubtitle}`}
        aria-hidden="true"
      />

      {type === "general" ? (
        <div
          className={`${styles.skCard} ${styles.skCardGeneral}`}
          aria-hidden="true"
        >
          <span className={styles.skCircle} />
          <div>
            {bone(157, { marginTop: 9 })}
            {bone(274, { marginTop: 14, maxWidth: "100%" })}
            {bone(51, { marginTop: 6 })}
          </div>
        </div>
      ) : (
        <div className={styles.skCard} aria-hidden="true">
          {bone(66)}
          <div className={styles.givingRow} style={{ marginTop: 14 }}>
            <div className={styles.skPhoto}>
              <ImagePlaceholderIcon />
            </div>
            <div>
              {bone(201, { maxWidth: "100%" })}
              <div className={styles.skPair} style={{ marginTop: 8 }}>
                {bone(77, { height: 14 })}
                {bone(78, { height: 14 })}
              </div>
              <div
                className={styles.skPair}
                style={{ marginTop: 18, gap: 8, alignItems: "center" }}
              >
                {bone(91, { height: 24 })}
                {bone(61, { height: 16 })}
              </div>
            </div>
          </div>
        </div>
      )}

      <span
        className={`${styles.bone} ${styles.skSummaryTitle}`}
        aria-hidden="true"
      />
      <div className={styles.skSummary} aria-hidden="true">
        <div className={styles.skRow}>
          {bone(59)}
          {bone(54)}
        </div>
        <div className={styles.skRow} style={{ marginTop: 8 }}>
          {bone(132)}
          {bone(34)}
        </div>
        <hr className={styles.divider} style={{ marginTop: 11 }} />
        <div className={styles.skRow} style={{ marginTop: 9 }}>
          {bone(38)}
          {bone(62)}
        </div>
      </div>

      <span className={`${styles.bone} ${styles.skNote}`} aria-hidden="true" />

      <BusyButton label="Preparing payment" className={styles.skButton} />
      <SecureNote size="large" />
    </div>
  );
}
