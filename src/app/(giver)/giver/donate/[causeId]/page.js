import { notFound } from "next/navigation";
import {
  ChooseDonation,
  DonationScreen,
  GivingToCard,
} from "@/components/donations/DonationFlow";
import { getCause } from "@/lib/api/causes";

export const metadata = { title: "Give now | Sadaqua" };

// Step 1 of giving: choose Sadaqah (this cause) or General donation.
// Figma: Donation - Unselected / Sadaqah selected / General Donation Selected
export default async function ChooseDonationPage({ params }) {
  const { causeId } = await params;
  const cause = await getCause(causeId);
  if (!cause) notFound();

  return (
    <DonationScreen
      backTitle="Give now"
      backHref={`/giver/causes/${cause.id}`}
      heading="How would you like to give?"
      subtitle={"Choose how you’d like your contribution to be used."}
    >
      <GivingToCard cause={cause} show="progress" />
      <ChooseDonation causeId={cause.id} />
    </DonationScreen>
  );
}
