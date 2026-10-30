import {
  HelpRequestScreen,
  ReviewStep,
} from "@/components/requests/RequestForm";

export const metadata = { title: "Review your request | Sadaqua" };

// Step 4 of 4 (Figma: Help Request - Review)
export default function ReviewPage() {
  return (
    <HelpRequestScreen
      step={4}
      backHref="/recipient/request-help/verify"
      title="Review your request"
      subtitle="Please check your information before submitting."
    >
      <ReviewStep />
    </HelpRequestScreen>
  );
}
