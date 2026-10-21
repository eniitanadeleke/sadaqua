import { notFound } from "next/navigation";
import {
  AmountForm,
  DonationScreen,
  GivingToCard,
} from "@/components/donations/DonationFlow";
import { getCause } from "@/lib/api/causes";

export const metadata = { title: "Give now | Sadaqua" };

// Step 2 (Sadaqah): how much to give to this cause.
// Figma: Donation- Sadaqah Amount empty / Sadaqah Amount filled / Sadaqah processing
// ?amount=100000 fills the field (used when coming back from Review).
export default async function SadaqahAmountPage({ params, searchParams }) {
  const { causeId } = await params;
  const { amount } = await searchParams;
  const cause = await getCause(causeId);
  if (!cause) notFound();

  return (
    <DonationScreen
      backTitle="Give now"
      backHref={`/giver/donate/${cause.id}`}
      heading="How would you like to give?"
      subtitle="Every contribution can make a difference."
    >
      <GivingToCard
        cause={cause}
        show="type"
        changeHref={`/giver/donate/${cause.id}`}
      />
      <AmountForm
        fund={{ raised: cause.raised, goal: cause.goal }}
        initialAmount={Number(amount) || 0}
        reviewPath={`/giver/donate/review?type=sadaqah&cause=${cause.id}`}
      />
    </DonationScreen>
  );
}
