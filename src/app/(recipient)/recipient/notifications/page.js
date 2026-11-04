import RecipientComingSoon from "@/components/recipient/RecipientComingSoon";

export const metadata = { title: "Notifications | Sadaqua" };

// Figma has no notifications screen yet (asked the designer).
export default function Page() {
  return <RecipientComingSoon title="Notifications" />;
}
