import {
  HelpRequestScreen,
  VerifyStep,
} from "@/components/requests/RequestForm";

export const metadata = { title: "Help request: location | Sadaqua" };

// Step 3 of 4 (Figma: Help Request - Verify)
export default function VerifyPage() {
  return (
    <HelpRequestScreen
      step={3}
      backHref="/recipient/request-help/details"
      title="Where do you need help?"
      subtitle="We will only show a general area to the public to protect your privacy"
    >
      <VerifyStep />
    </HelpRequestScreen>
  );
}
