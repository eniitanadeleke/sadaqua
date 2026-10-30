import RecipientComingSoon from "@/components/recipient/RecipientComingSoon";

export const metadata = { title: "Profile | Sadaqua" };

// Built in a later batch (Figma: zip 24 and after).
export default function Page() {
  return <RecipientComingSoon title="Profile" showProfile={false} />;
}
