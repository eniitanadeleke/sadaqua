import Image from "next/image";
import {
  RiCheckboxCircleLine,
  RiErrorWarningLine,
  RiFileTextLine,
  RiHeartPulseLine,
  RiMapPinLine,
  RiTimeLine,
} from "react-icons/ri";
import AdminFilterBar from "@/components/admin/AdminFilterBar";
import AdminPageHeading from "@/components/admin/AdminPageHeading";
import AdminPagination from "@/components/admin/AdminPagination";
import AdminStats from "@/components/admin/AdminStats";
import AdminTable from "@/components/admin/AdminTable";
import { ActionLink, statusExtra } from "@/components/admin/CauseCell";
import DisbursementDetails, {
  DisbursementStatus,
} from "@/components/admin/DisbursementDetails";
import { isAdminDemo } from "@/lib/api/admin/demo";
import {
  DISBURSEMENT_STATUS,
  getDisbursement,
  getDisbursementStats,
  getDisbursements,
} from "@/lib/api/admin/disbursements";
import { CATEGORIES, getCategory } from "@/lib/categories";
import { formatDate, formatNaira } from "@/lib/format";
import styles from "./page.module.css";

export const metadata = { title: "Disbursements | Sadaqua admin" };

const COLUMNS = [
  { key: "cause", label: "Cause", width: 315 },
  { key: "reference", label: "Reference", width: 135 },
  { key: "amount", label: "Amount", width: 127 },
  { key: "purpose", label: "Purpose", width: 127 },
  { key: "date", label: "Date", width: 155 },
  { key: "status", label: "Status", width: 159 },
  { key: "action", label: "Action", width: 118 },
];

/** Disbursements: money paid out to approved causes. ?view=<ref> opens the details panel. */
export default async function DisbursementsPage({ searchParams }) {
  const params = await searchParams;
  const demo = await isAdminDemo(params);
  const filters = {
    q: params.q ?? "",
    status: params.status ?? "all",
    category: params.category ?? "all",
    date: params.date ?? "all",
    page: params.page ?? 1,
  };
  const [stats, list, selected] = await Promise.all([
    getDisbursementStats({ demo }),
    getDisbursements(filters, { demo }),
    getDisbursement(params.view, { demo }),
  ]);

  const query = (extra) =>
    new URLSearchParams({ ...filters, ...extra }).toString();
  const rows = list.items.map((d) => {
    const category = getCategory(d.category);
    return {
      id: d.reference,
      cause: (
        <span className={styles.cause}>
          <Image
            src={d.image}
            alt=""
            width={48}
            height={48}
            className={styles.thumb}
            unoptimized
          />
          <span className={styles.causeText}>
            <span className={styles.causeTitle}>{d.cause}</span>
            <span className={styles.causeMeta}>
              <span>
                <RiHeartPulseLine aria-hidden="true" />
                {category?.label}
              </span>
              <span>
                <RiMapPinLine aria-hidden="true" />
                {d.location}
              </span>
            </span>
          </span>
        </span>
      ),
      reference: d.reference,
      amount: formatNaira(d.amount),
      purpose: <span className={statusExtra.nowrap}>{d.purpose}</span>,
      date: <span className={statusExtra.nowrap}>{formatDate(d.date)}</span>,
      status: <DisbursementStatus status={d.status} />,
      action: (
        <ActionLink
          href={`/admin/disbursements?${query({ view: d.reference })}`}
          scroll={false}
        >
          View
        </ActionLink>
      ),
    };
  });

  const filtered =
    filters.q ||
    filters.status !== "all" ||
    filters.category !== "all" ||
    filters.date !== "all";

  return (
    <>
      <AdminPageHeading
        title="Disbursements"
        subtitle="Track funds disbursed across approved causes."
      />

      <AdminStats
        items={[
          {
            label: "Total disbursed",
            value: formatNaira(stats.totalDisbursed),
            icon: RiFileTextLine,
            tone: "deep",
          },
          {
            label: "This month",
            value: formatNaira(stats.thisMonth),
            icon: RiErrorWarningLine,
            tone: "orange",
          },
          {
            label: "Completed",
            value: stats.completed,
            icon: RiCheckboxCircleLine,
            tone: "green",
          },
          {
            label: "Pending",
            value: stats.pending,
            icon: RiTimeLine,
            tone: "gold",
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
              ...Object.entries(DISBURSEMENT_STATUS).map(([value, s]) => ({
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
        caption="Disbursements"
        columns={COLUMNS}
        rows={rows}
        empty={
          <p className={styles.empty}>
            {filtered
              ? "No disbursements match your search."
              : "No disbursements yet. Funds paid out to causes will appear here."}
          </p>
        }
      />

      <AdminPagination
        page={list.page}
        pageSize={list.pageSize}
        total={list.total}
        hrefFor={(page) =>
          `/admin/disbursements?${query({ page: String(page) })}`
        }
      />

      {selected && (
        <DisbursementDetails
          disbursement={selected}
          closeHref={`/admin/disbursements?${query({})}`}
        />
      )}
    </>
  );
}
