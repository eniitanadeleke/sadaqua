import { HelpRequestScreen, NeedStep } from "@/components/requests/RequestForm";

export const metadata = { title: "Help request | Sadaqua" };

// Step 1 of 4 (Figma: Help Request - Need)
export default function NeedPage() {
  return (
    <HelpRequestScreen
      step={1}
      backHref="/recipient"
      title="What do you need help with?"
      subtitle="Choose the category that best describes your need."
    >
      <NeedStep />
    </HelpRequestScreen>
  );
}
