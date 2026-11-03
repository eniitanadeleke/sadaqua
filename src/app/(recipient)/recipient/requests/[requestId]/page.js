import { RiFileTextLine } from "react-icons/ri";
import IconEmptyState from "@/components/ui/IconEmptyState";
import BackHeader from "@/components/layout/BackHeader";
import MobileHeader from "@/components/layout/MobileHeader";
import MobileScreen from "@/components/layout/MobileScreen";
import RequestCard from "@/components/requests/RequestCard";
import RequestTabs from "@/components/requests/RequestTabs";
import {
  FundingProgress,
  InfoNote,
  NeedHelp,
  NextStep,
  ProvideInformationButton,
  RejectionReason,
  RequestProgress,
  RequestStatusPanel,
  YourRequestCard,
} from "@/components/requests/RequestDetails";
import { getMyRequest } from "@/lib/api/recipient";
import { RECIPIENT_MENU } from "@/lib/navigation";
import { REQUEST_TABS } from "@/lib/requestStatus";
import { buildTimeline } from "@/lib/requestTimeline";
import styles from "./page.module.css";

export const metadata = { title: "My request details | Sadaqua" };

// Server component (Figma: My request details, one frame per status).
// ?preview=demo shows the sample requests; in demo mode ?status= previews
// the same request at another stage, e.g. ?preview=demo&status=fulfilled
export default async function RequestDetailsPage({ params, searchParams }) {
  const { requestId } = await params;
  const { preview, status } = await searchParams;
  const demo = preview === "demo";
  const request = await getMyRequest(requestId, { demo, status });

  const query = (extra = {}) => {
    const p = new URLSearchParams(extra);
    if (demo) p.set("preview", "demo");
    const s = p.toString();
    return s ? `?${s}` : "";
  };

  // Figma: the tabs here leave out Draft; each one opens My requests
  const tabs = REQUEST_TABS.filter((tab) => tab.key !== "draft");
  const tabHref = (key) =>
    `/recipient/requests${query(key === "all" ? {} : { status: key })}`;

  return (
    <MobileScreen top="flush">
      <MobileHeader
        homeHref="/recipient"
        profileHref="/recipient/profile"
        menuItems={RECIPIENT_MENU}
      />

      <BackHeader
        title="My request details"
        backHref={`/recipient/requests${query()}`}
        className={styles.backRow}
      />

      <h2 className={styles.heading}>My Request</h2>
      <p className={styles.intro}>Track the progress of your help requests.</p>

      <div className={styles.tabs}>
        <RequestTabs tabs={tabs} active="all" href={tabHref} />
      </div>

      {request ? (
        <RequestBody
          request={request}
          provideHref={`/recipient/requests/${request.id}/provide-information${query()}`}
          editHref={`/recipient/requests/${request.id}/edit`}
        />
      ) : (
        <IconEmptyState
          icon={<RiFileTextLine className={styles.emptyIcon} />}
          tone="mint"
          title="Request not found"
          actionLabel="Back to my requests"
          actionHref="/recipient/requests"
          className={styles.empty}
        >
          <p>We couldn’t find this request. It may have been removed.</p>
        </IconEmptyState>
      )}
    </MobileScreen>
  );
}

function RequestBody({ request, provideHref, editHref }) {
  const { status } = request;
  const steps = buildTimeline(request);
  const reviewing = status === "submitted" || status === "under_review";

  return (
    <>
      <div className={styles.card}>
        <RequestCard request={request} variant="detail">
          <RequestStatusPanel
            status={status}
            action={
              status === "needs_changes" && (
                <ProvideInformationButton href={provideHref} />
              )
            }
          />
        </RequestCard>
      </div>

      <RequestProgress steps={steps} roomy={reviewing || status === "verified"}>
        {status === "rejected" && (
          <RejectionReason reason={request.rejectionReason} />
        )}
      </RequestProgress>

      {/* Figma: the request itself shows while it is checked and once verified */}
      {reviewing && <YourRequestCard request={request} editHref={editHref} />}
      {status === "verified" && (
        <YourRequestCard request={request}>
          <NextStep
            lines={[
              "We will publish your request soon.",
              "You’ll be notified once it goes live.",
            ]}
          />
        </YourRequestCard>
      )}

      {status === "needs_changes" && (
        <InfoNote>
          After you provide the information, your request will go back to
          review.
          <br />
          You’ll be notified.
        </InfoNote>
      )}

      {(status === "in_progress" ||
        status === "published" ||
        status === "fulfilled") && (
        <FundingProgress
          received={request.received ?? 0}
          amount={request.amount}
          done={status === "fulfilled"}
        />
      )}

      {status === "rejected" && <NeedHelp />}
    </>
  );
}
