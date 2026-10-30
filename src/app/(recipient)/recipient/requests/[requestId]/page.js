import RecipientComingSoon from "@/components/recipient/RecipientComingSoon";

export const metadata = { title: "My request | Sadaqua" };

// The request details screen comes in a later batch.
export default function Page() {
  return <RecipientComingSoon title="My request" />;
}
