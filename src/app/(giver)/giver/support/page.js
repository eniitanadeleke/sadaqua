import HelpSupport from "@/components/support/HelpSupport";
import SupportScreen from "@/components/support/SupportScreen";

export const metadata = { title: "Help & Support | Sadaqua" };

// Figma: Help & Support (accessible by recipient and giver users)
export default function GiverSupportPage() {
  return (
    <SupportScreen
      role="giver"
      backTitle="Help & Support"
      backHref="/giver"
      title="How can we help?"
      subtitle="Find answers or get support from the Sadaqua team."
      subtitleWidth={245}
    >
      <HelpSupport role="giver" contactHref="/giver/support/contact" />
    </SupportScreen>
  );
}
