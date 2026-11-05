import Link from "next/link";
import {
  RiArrowRightLine,
  RiCheckboxCircleLine,
  RiErrorWarningLine,
  RiFileTextLine,
  RiTimeLine,
} from "react-icons/ri";
import AdminFilterBar from "@/components/admin/AdminFilterBar";
import AdminPageHeading from "@/components/admin/AdminPageHeading";
import AdminPagination from "@/components/admin/AdminPagination";
import AdminStats from "@/components/admin/AdminStats";
import AdminStatus from "@/components/admin/AdminStatus";
import AdminTable, { TwoLines } from "@/components/admin/AdminTable";
import InitialsAvatar from "@/components/admin/InitialsAvatar";
import { isAdminDemo } from "@/lib/api/admin/demo";
import {
  ADMIN_REQUEST_STATUS,
  getRequestQueue,
  getRequestStats,
} from "@/lib/api/admin/requests";
import { CATEGORIES, getCategory } from "@/lib/categories";
import { formatDate, formatNaira } from "@/lib/format";
import styles from "./page.module.css";

export const metadata = { title: "Verification | Sadaqua admin" };

const AVATAR_TONES = ["neutral", "gold", "sage", "orange", "sage", "red"];

const COLUMNS = [
  { key: "request", label: "Request", width: 216 },
  { key: "category", label: "Category", width: 158 },
  { key: "location", label: "Location", width: 154 },
  { key: "amount", label: "Amount needed", width: 188 },
  { key: "submitted", label: "Submitted", width: 166 },
  { key: "status", label: "Status", width: 155 },
  { key: "action", label: "Action", width: 99 },
];

/** Verification Request Queue: every help request waiting for the team */
export default async function RequestQueuePage({ searchParams }) {
  const params = await searchParams;
  const demo = await isAdminDemo(params);
  const filters = {
    q: params.q ?? "",
    status: params.status ?? "all",
    category: params.category ?? "all",
    date: params.date ?? "all",
    page: params.page ?? 1,
  };
  const [stats, queue] = await Promise.all([
    getRequestStats({ demo }),
    getRequestQueue(filters, { demo }),
  ]);

  const rows = queue.items.map((request, i) => {
    const status = ADMIN_REQUEST_STATUS[request.status];
    return {
      id: request.reference,
      request: (
        <span className={styles.person}>
          <InitialsAvatar
            name={request.applicant}
            tone={AVATAR_TONES[i % AVATAR_TONES.length]}
          />
          <TwoLines main={request.applicant} sub={request.reference} />
        </span>
      ),
      category: getCategory(request.category)?.label,
      location: request.location,
      amount: formatNaira(request.amountNeeded),
      submitted: formatDate(request.submittedAt.slice(0, 10)),
      status: <AdminStatus tone={status.tone}>{status.label}</AdminStatus>,
      action: (
        <Link
          href={`/admin/requests/${request.reference}`}
          className={styles.view}
        >
          View <RiArrowRightLine aria-hidden="true" />
        </Link>
      ),
    };
  });

  const hrefFor = (page) => {
    const query = new URLSearchParams({ ...filters, page: String(page) });
    return `/admin/requests?${query}`;
  };

  return (
    <>
      <AdminPageHeading
        title="Verification"
        subtitle="Review and manage help request before they are published."
      />

      <AdminStats
        items={[
          {
            label: "New request",
            value: stats.new,
            icon: RiFileTextLine,
            tone: "deep",
          },
          {
            label: "Under review",
            value: stats.underReview,
            icon: RiTimeLine,
            tone: "gold",
          },
          {
            label: "More information needed",
            value: stats.needsInfo,
            icon: RiErrorWarningLine,
            tone: "orange",
          },
          {
            label: "Approved",
            value: stats.approved,
            icon: RiCheckboxCircleLine,
            tone: "green",
          },
        ]}
      />

      <AdminFilterBar
        placeholder="Search request by name or reference number..."
        q={filters.q}
        filters={[
          {
            name: "status",
            label: "Status",
            value: filters.status,
            options: [
              { value: "all", label: "All statuses" },
              ...Object.entries(ADMIN_REQUEST_STATUS).map(([value, s]) => ({
                value,
                label: s.label,
              })),
            ],
          },
          {
            name: "category",
            label: "Category",
            value: filters.category,
            options: [
              { value: "all", label: "All categories" },
              ...CATEGORIES.map((c) => ({ value: c.key, label: c.label })),
            ],
          },
          {
            name: "date",
            label: "Date",
            value: filters.date,
            options: [
              { value: "all", label: "All dates" },
              { value: "7d", label: "Last 7 days" },
              { value: "30d", label: "Last 30 days" },
            ],
          },
        ]}
      />

      <AdminTable
        caption="Help requests"
        columns={COLUMNS}
        rows={rows}
        empty={
          <p className={styles.empty}>
            {filters.q || filters.status !== "all" || filters.category !== "all"
              ? "No requests match your search."
              : "No help requests yet. New requests will appear here."}
          </p>
        }
      />

      <AdminPagination
        page={queue.page}
        pageSize={queue.pageSize}
        total={queue.total}
        hrefFor={hrefFor}
      />
    </>
  );
}
