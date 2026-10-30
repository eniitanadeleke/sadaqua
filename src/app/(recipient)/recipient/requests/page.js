import { RiFileTextLine } from "react-icons/ri";
import IconEmptyState from "@/components/ui/IconEmptyState";
import BackHeader from "@/components/layout/BackHeader";
import MobileHeader from "@/components/layout/MobileHeader";
import MobileScreen from "@/components/layout/MobileScreen";
import RequestCard from "@/components/requests/RequestCard";
import RequestTabs from "@/components/requests/RequestTabs";
import { getMyRequests } from "@/lib/api/recipient";
import { RECIPIENT_MENU } from "@/lib/navigation";
import { REQUEST_TABS } from "@/lib/requestStatus";
import styles from "./page.module.css";

export const metadata = { title: "My requests | Sadaqua" };

// Server component (Figma: My request, No request).
// ?status= picks a tab; ?preview=demo shows the sample requests.
export default async function MyRequestsPage({ searchParams }) {
  const { status: statusParam, preview } = await searchParams;
  const demo = preview === "demo";
  const status = REQUEST_TABS.some((tab) => tab.key === statusParam)
    ? statusParam
    : "all";

  const [all, requests] = await Promise.all([
    getMyRequests({ demo }),
    getMyRequests({ status, demo }),
  ]);

  // A recipient with no requests at all has no drafts either, so Figma's
  // empty screen leaves the Draft tab out.
  const tabs = all.length
    ? REQUEST_TABS
    : REQUEST_TABS.filter((tab) => tab.key !== "draft");

  const tabHref = (key) => {
    const params = new URLSearchParams();
    if (key !== "all") params.set("status", key);
    if (demo) params.set("preview", "demo");
    const query = params.toString();
    return `/recipient/requests${query ? `?${query}` : ""}`;
  };

  return (
    <MobileScreen top="flush">
      <MobileHeader
        homeHref="/recipient"
        profileHref="/recipient/profile"
        menuItems={RECIPIENT_MENU}
      />

      <BackHeader
        title="My request"
        backHref="/recipient"
        className={styles.backRow}
      />

      <h2 className={styles.heading}>My Request</h2>
      <p className={styles.intro}>Track the progress of your help requests.</p>

      <div className={styles.tabs}>
        <RequestTabs tabs={tabs} active={status} href={tabHref} />
      </div>

      {requests.length > 0 ? (
        <ul className={styles.list}>
          {requests.map((request) => (
            <li key={request.id}>
              <RequestCard request={request} variant="list" />
            </li>
          ))}
        </ul>
      ) : all.length > 0 ? (
        <p className={styles.none}>No requests with this status yet.</p>
      ) : (
        <IconEmptyState
          icon={<RiFileTextLine className={styles.emptyIcon} />}
          tone="mint"
          title="No request yet"
          actionLabel="Request help"
          actionHref="/recipient/request-help"
          secondaryLabel="Learn how it works"
          secondaryHref="/recipient/support#how-it-works"
          className={styles.empty}
        >
          <p>
            When you submit a request for help,
            <br />
            you’ll be able to track its progress here.
          </p>
        </IconEmptyState>
      )}
    </MobileScreen>
  );
}
