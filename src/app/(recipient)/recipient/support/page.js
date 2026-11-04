import HelpSupport from "@/components/support/HelpSupport";
import SupportScreen from "@/components/support/SupportScreen";

export const metadata = { title: "Help & Support | Sadaqua" };

// Figma: Help & Support (accessible by recipient and giver users)
export default function RecipientSupportPage() {
  return (
    <SupportScreen
      role="recipient"
      backTitle="Help & Support"
      backHref="/recipient"
      title="How can we help?"
      subtitle="Find answers or get support from the Sadaqua team."
      subtitleWidth={245}
    >
      <HelpSupport role="recipient" contactHref="/recipient/support/contact" />
    </SupportScreen>
  );
}
