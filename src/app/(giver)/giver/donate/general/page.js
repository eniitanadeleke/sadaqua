import {
  AmountForm,
  DonationScreen,
  GeneralDonationInfo,
} from "@/components/donations/DonationFlow";
import { getGeneralFund } from "@/lib/api/donations";

export const metadata = { title: "General donation | Sadaqua" };

// General donation: money goes to Sadaqua's general fund, not one cause.
// Reached from the Home card, or from "Choose an option" (?from=<causeId>).
// Figma: General donation - Amount empty / Amount filled / processing
export default async function GeneralAmountPage({ searchParams }) {
  const { from, amount } = await searchParams;
  const fund = await getGeneralFund();
  const fromQuery = from ? `&from=${encodeURIComponent(from)}` : "";

  return (
    <DonationScreen
      backTitle="General donation"
      backHref={from ? `/giver/donate/${encodeURIComponent(from)}` : "/giver"}
      heading="How would you like to give?"
      subtitle="Every contribution can make a difference."
    >
      <GeneralDonationInfo />
      <AmountForm
        fund={fund}
        initialAmount={Number(amount) || 0}
        reviewPath={`/giver/donate/review?type=general${fromQuery}`}
      />
    </DonationScreen>
  );
}
