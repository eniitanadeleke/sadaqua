import { redirect } from "next/navigation";
import BackHeader from "@/components/layout/BackHeader";
import MobileHeader from "@/components/layout/MobileHeader";
import MobileScreen from "@/components/layout/MobileScreen";
import MoreInfoForm from "@/components/requests/MoreInfoForm";
import { getMyRequest } from "@/lib/api/recipient";
import { RECIPIENT_MENU } from "@/lib/navigation";
import styles from "./page.module.css";

export const metadata = { title: "More information needed | Sadaqua" };

// Figma: More information need form (and its upload "load state").
// Only a request that needs more information can be answered; any other
// request goes back to its details page.
export default async function ProvideInformationPage({ params, searchParams }) {
  const { requestId } = await params;
  const { preview } = await searchParams;
  const demo = preview === "demo";
  const query = demo ? "?preview=demo" : "";
  const detailsHref = `/recipient/requests/${requestId}${query}`;

  // In demo mode every sample request can be answered, so the form can be tried
  const request = await getMyRequest(requestId, {
    demo,
    status: demo ? "needs_changes" : undefined,
  });
  if (!request || request.status !== "needs_changes") redirect(detailsHref);

  // After sending, the request is back under review
  const doneHref = `/recipient/requests/${requestId}${demo ? "?preview=demo&status=under_review" : ""}`;

  return (
    <MobileScreen top="flush">
      <MobileHeader
        homeHref="/recipient"
        profileHref="/recipient/profile"
        menuItems={RECIPIENT_MENU}
      />
      <BackHeader
        title="My request details"
        backHref={detailsHref}
        className={styles.backRow}
      />

      <h2 className={styles.title}>More information needed</h2>
      <p className={styles.subtitle}>
        We need a little more information to continue reviewing your request.
      </p>

      <MoreInfoForm request={request} doneHref={doneHref} />
    </MobileScreen>
  );
}
