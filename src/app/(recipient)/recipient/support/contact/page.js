import ContactUs from "@/components/support/ContactUs";
import SupportScreen from "@/components/support/SupportScreen";

export const metadata = { title: "Contact us | Sadaqua" };

// Figma: Help & Support-1 (Contact us)
export default function RecipientContactPage() {
  return (
    <SupportScreen
      role="recipient"
      backTitle="Contact us"
      backHref="/recipient/support"
      title="We're here to help"
      subtitle="Have a question or need help with something? Choose how you'd like to reach us."
    >
      <ContactUs role="recipient" />
    </SupportScreen>
  );
}
