import { redirect } from "next/navigation";

// A disbursement opens as a panel over the list (Figma: Disbursements details)
export default async function DisbursementPage({ params }) {
  const { disbursementId } = await params;
  redirect(`/admin/disbursements?view=${encodeURIComponent(disbursementId)}`);
}
