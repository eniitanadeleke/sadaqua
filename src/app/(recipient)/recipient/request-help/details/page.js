import {
  DetailsStep,
  HelpRequestScreen,
} from "@/components/requests/RequestForm";

export const metadata = { title: "Help request: details | Sadaqua" };

// Step 2 of 4 (Figma: Help Request - Details)
export default function DetailsPage() {
  return (
    <HelpRequestScreen
      step={2}
      backHref="/recipient/request-help"
      title="Tell us about your situation"
      subtitle="Briefly explain what you need help with and how the support will be used."
    >
      <DetailsStep />
    </HelpRequestScreen>
  );
}
