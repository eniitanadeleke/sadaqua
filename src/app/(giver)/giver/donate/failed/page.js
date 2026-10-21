import Link from "next/link";
import { ResultMessage } from "@/components/donations/DonationResult";
import styles from "@/components/donations/DonationResult/DonationResult.module.css";
import MobileHeader from "@/components/layout/MobileHeader";
import MobileScreen from "@/components/layout/MobileScreen";
import Button from "@/components/ui/Button";
import { donationLinks } from "@/lib/donationLinks";
import { GIVER_MENU } from "@/lib/navigation";

export const metadata = { title: "Payment failed | Sadaqua" };

// Paystack sends the giver here when the payment does not go through.
// /giver/donate/failed?type=sadaqah&cause=amina-leukemia&amount=100000
// Figma: Donation Failed
export default async function PaymentFailedPage({ searchParams }) {
  const { reviewHref, amountHref } = donationLinks(await searchParams);

  return (
    <MobileScreen top="flush">
      <MobileHeader
        homeHref="/giver"
        profileHref="/giver/profile"
        menuItems={GIVER_MENU}
      />
      <ResultMessage
        tone="failed"
        title="Payment failed"
        lines={[
          "We couldn’t complete your payment.",
          "Your donation was not processed.",
        ]}
      />
      <Button
        href={reviewHref}
        variant="outlined"
        fullWidth
        className={`${styles.outlined} ${styles.retry}`}
      >
        Try again
      </Button>
      <Link href={amountHref} className={styles.textLink}>
        Back to donation
      </Link>
    </MobileScreen>
  );
}
