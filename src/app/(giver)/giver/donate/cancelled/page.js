import Link from "next/link";
import { ResultMessage } from "@/components/donations/DonationResult";
import styles from "@/components/donations/DonationResult/DonationResult.module.css";
import MobileHeader from "@/components/layout/MobileHeader";
import MobileScreen from "@/components/layout/MobileScreen";
import Button from "@/components/ui/Button";
import { donationLinks } from "@/lib/donationLinks";
import { GIVER_MENU } from "@/lib/navigation";

export const metadata = { title: "Payment cancelled | Sadaqua" };

// Paystack sends the giver here when they close the payment page.
// /giver/donate/cancelled?type=sadaqah&cause=amina-leukemia&amount=100000
// Figma: Donation Cancelled
export default async function PaymentCancelledPage({ searchParams }) {
  const { reviewHref } = donationLinks(await searchParams);

  return (
    <MobileScreen top="flush">
      <MobileHeader
        homeHref="/giver"
        profileHref="/giver/profile"
        menuItems={GIVER_MENU}
      />
      <ResultMessage
        tone="cancelled"
        title="Payment cancelled"
        lines={["You cancelled payment.", "No amount was charged."]}
      />
      <Button
        href={reviewHref}
        variant="outlined"
        fullWidth
        className={`${styles.outlined} ${styles.retry}`}
      >
        Go back
      </Button>
      <Link href="/giver" className={styles.textLink}>
        Back to home
      </Link>
    </MobileScreen>
  );
}
