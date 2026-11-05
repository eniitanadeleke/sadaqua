import {
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
import AdminTable from "@/components/admin/AdminTable";
import {
  ActionLink,
  CauseCell,
  ProgressCell,
  statusExtra,
} from "@/components/admin/CauseCell";
import {
  ADMIN_CAUSE_STATUS,
  getApprovedCauses,
  getCauseStats,
} from "@/lib/api/admin/causes";
import { isAdminDemo } from "@/lib/api/admin/demo";
import { CATEGORIES, getCategory } from "@/lib/categories";
import { formatDate, formatNaira, percentRaised } from "@/lib/format";
import styles from "./page.module.css";

export const metadata = { title: "Approved Causes | Sadaqua admin" };

const COLUMNS = [
  { key: "cause", label: "Cause", width: 290 },
  { key: "category", label: "Category", width: 119 },
  { key: "goal", label: "Goal", width: 111 },
  { key: "raised", label: "Raised", width: 111 },
  { key: "progress", label: "Progress", width: 141 },
  { key: "status", label: "Status", width: 127 },
  { key: "published", label: "Published", width: 119 },
  { key: "action", label: "Action", width: 118 },
];

/** Status label; "Fully funded" uses gold at 10%, which the shared label lacks */
function CauseStatus({ status }) {
  const s = ADMIN_CAUSE_STATUS[status];
  if (s.tone === "pending") {
    return (
      <AdminStatus tone="gold" className={statusExtra.pending}>
        {s.label}
      </AdminStatus>
    );
  }
  return <AdminStatus tone={s.tone}>{s.label}</AdminStatus>;
}

/** Approved Causes: published causes and how their funding is going */
export default async function ApprovedCausesPage({ searchParams }) {
  const params = await searchParams;
  const demo = await isAdminDemo(params);
  const filters = {
    q: params.q ?? "",
    status: params.status ?? "all",
    category: params.category ?? "all",
    date: params.date ?? "all",
    page: params.page ?? 1,
  };
  const [stats, list] = await Promise.all([
    getCauseStats({ demo }),
    getApprovedCauses(filters, { demo }),
  ]);

  const rows = list.items.map((cause) => ({
    id: cause.id,
    cause: <CauseCell cause={cause} />,
    category: getCategory(cause.category)?.label,
    goal: formatNaira(cause.goal),
    raised: formatNaira(cause.raised),
    progress: (
      <ProgressCell percent={percentRaised(cause.raised, cause.goal)} />
    ),
    status: <CauseStatus status={cause.status} />,
    published: (
      <span className={statusExtra.nowrap}>
        {formatDate(cause.publishedAt)}
      </span>
    ),
    action: <ActionLink href={`/admin/causes/${cause.id}`}>Manage</ActionLink>,
  }));

  const hrefFor = (page) =>
    `/admin/causes?${new URLSearchParams({ ...filters, page: String(page) })}`;
  const filtered =
    filters.q ||
    filters.status !== "all" ||
    filters.category !== "all" ||
    filters.date !== "all";

  return (
    <>
      <AdminPageHeading
        title="Approved Causes"
        subtitle="Manage published causes and monitor their funding progress."
      />

      <AdminStats
        items={[
          {
            label: "Active causes",
            value: stats.active,
            icon: RiFileTextLine,
            tone: "deep",
          },
          {
            label: "Fully funded",
            value: stats.fullyFunded,
            icon: RiTimeLine,
            tone: "gold",
          },
          {
            label: "In progress",
            value: stats.inProgress,
            icon: RiErrorWarningLine,
            tone: "orange",
          },
          {
            label: "Fulfilled",
            value: stats.fulfilled,
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
              ...Object.entries(ADMIN_CAUSE_STATUS).map(([value, s]) => ({
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
            label: "Date published",
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
        caption="Approved causes"
        columns={COLUMNS}
        rows={rows}
        className={styles.table}
        empty={
          <p className={styles.empty}>
            {filtered
              ? "No causes match your search."
              : "No published causes yet. Causes appear here once a request is published."}
          </p>
        }
      />

      <AdminPagination
        page={list.page}
        pageSize={list.pageSize}
        total={list.total}
        hrefFor={hrefFor}
      />
    </>
  );
}
