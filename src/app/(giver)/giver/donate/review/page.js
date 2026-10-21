import { notFound, redirect } from "next/navigation";
import {
  DonationReview,
  DonationScreen,
  GeneralDonationInfo,
  GivingToCard,
} from "@/components/donations/DonationFlow";
import { getCause } from "@/lib/api/causes";
import { getDonationQuote } from "@/lib/api/donations";

export const metadata = { title: "Review your donation | Sadaqua" };

// Step 3: check the summary, then Make Payment (Paystack).
// /giver/donate/review?type=sadaqah&cause=amina-leukemia&amount=100000
// /giver/donate/review?type=general&amount=100000
// Figma: Review Donation / Review Donation-1 / Make Payment Loading
export default async function ReviewDonationPage({ searchParams }) {
  const {
    type = "sadaqah",
    cause: causeId,
    from,
    amount: amountText,
  } = await searchParams;
  const amount = Number(amountText);
  const general = type === "general";

  if (!general && !causeId) redirect("/giver/causes");
  const cause = general ? null : await getCause(causeId);
  if (!general && !cause) notFound();

  const amountHref = general
    ? `/giver/donate/general?${new URLSearchParams({ ...(from && { from }), ...(amount > 0 && { amount: String(amount) }) })}`
    : `/giver/donate/${cause.id}/amount${amount > 0 ? `?amount=${amount}` : ""}`;
  if (!(amount > 0)) redirect(amountHref);

  const quote = await getDonationQuote(amount);

  return (
    <DonationScreen
      backTitle={general ? "General donation" : "Give now"}
      backHref={amountHref}
    >
      <DonationReview
        type={general ? "general" : "sadaqah"}
        causeId={cause?.id}
        quote={quote}
        card={
          general ? (
            <GeneralDonationInfo />
          ) : (
            <GivingToCard
              cause={cause}
              show="type"
              changeHref={`/giver/donate/${cause.id}`}
            />
          )
        }
      />
    </DonationScreen>
  );
}
