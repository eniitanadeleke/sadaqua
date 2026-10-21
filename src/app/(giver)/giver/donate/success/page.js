import Link from "next/link";
import { redirect } from "next/navigation";
import { RiCheckboxCircleLine } from "react-icons/ri";
import {
  DonationSummary,
  GeneralDonationInfo,
  GivingToCard,
} from "@/components/donations/DonationFlow";
import {
  ReceiptButton,
  ResultMessage,
} from "@/components/donations/DonationResult";
import styles from "@/components/donations/DonationResult/DonationResult.module.css";
import MobileHeader from "@/components/layout/MobileHeader";
import MobileScreen from "@/components/layout/MobileScreen";
import Button from "@/components/ui/Button";
import { getDonation } from "@/lib/api/donations";
import { GIVER_MENU } from "@/lib/navigation";

export const metadata = { title: "Donation successful | Sadaqua" };

// Paystack sends the giver here after paying: /giver/donate/success?ref=...
// Figma: Donation Successful
export default async function DonationSuccessPage({ searchParams }) {
  const { ref, type, amount, cause: causeId } = await searchParams;
  const donation = await getDonation(ref, { type, amount, causeId });
  if (!donation) redirect("/giver");

  const general = donation.type === "general";
  const detailsQuery = new URLSearchParams({
    type: donation.type,
    amount: String(donation.amount),
    ...(donation.causeId && { cause: donation.causeId }),
  });

  return (
    <MobileScreen top="flush">
      <MobileHeader
        homeHref="/giver"
        profileHref="/giver/profile"
        menuItems={GIVER_MENU}
      />

      <ResultMessage
        tone="success"
        title="Donation successful!"
        lines={[
          general
            ? "Thank you for supporting Sadaqua"
            : "Thank you for supporting this cause",
        ]}
      />

      {general ? (
        <GeneralDonationInfo />
      ) : (
        <GivingToCard cause={donation.cause} show="type" label="Gave to" />
      )}

      <DonationSummary
        amount={donation.amount}
        fee={donation.fee}
        total={donation.total}
        className={styles.summary}
      />

      <p className={styles.receiptNote}>
        <RiCheckboxCircleLine aria-hidden="true" />
        Receipt was sent to your email
      </p>

      <ReceiptButton
        donation={{
          reference: donation.reference,
          paidAt: donation.paidAt,
          amount: donation.amount,
          fee: donation.fee,
          total: donation.total,
          causeTitle: general ? "General donation" : donation.cause.title,
        }}
        className={`${styles.outlined} ${styles.download}`}
      />
      <Button
        href={`/giver/giving-history/${donation.reference}?${detailsQuery}`}
        fullWidth
        className={styles.viewDonation}
      >
        View donation
      </Button>
      <Link href="/giver" className={styles.textLink}>
        Back to home
      </Link>
    </MobileScreen>
  );
}
