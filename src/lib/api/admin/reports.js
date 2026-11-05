// Service for the admin Reports page and "Share report" (Figma: Reports,
// Share Reports). Pages only call these functions; when the backend is
// ready, only the inside of them changes.
//
// Everything is empty by default; demo: true returns the sample numbers.

import { REPORT_SAMPLE, REPORT_SAMPLE_RANGE } from "@/lib/mock/admin/reports";

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// The period dropdown (Figma: "This week")
export const REPORT_PERIODS = [
  { value: "today", label: "Today" },
  { value: "week", label: "This week" },
  { value: "month", label: "This month" },
  { value: "year", label: "This year" },
  { value: "custom", label: "Custom range" },
];

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const iso = (date) => date.toISOString().slice(0, 10);

/** The dates a period covers, counted from "today" (Monday-start weeks). */
export function rangeForPeriod(period, today = new Date()) {
  const d = new Date(
    Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()),
  );
  if (period === "today") return { from: iso(d), to: iso(d) };
  if (period === "month") {
    const from = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), 1));
    const to = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth() + 1, 0));
    return { from: iso(from), to: iso(to) };
  }
  if (period === "year") {
    return {
      from: `${d.getUTCFullYear()}-01-01`,
      to: `${d.getUTCFullYear()}-12-31`,
    };
  }
  // week
  const monday = new Date(d);
  monday.setUTCDate(d.getUTCDate() - ((d.getUTCDay() + 6) % 7));
  const sunday = new Date(monday);
  sunday.setUTCDate(monday.getUTCDate() + 6);
  return { from: iso(monday), to: iso(sunday) };
}

/** The range shown when the page opens. Demo: the dates in the Figma. */
export function defaultReportRange({ demo = false } = {}) {
  if (demo) return { period: "week", ...REPORT_SAMPLE_RANGE };
  return { period: "week", ...rangeForPeriod("week") };
}

/** "2026-09-01" -> "01 Sept 2026" (Figma: the From / To boxes) */
export function formatReportDate(isoDate) {
  const short = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  const [y, m, d] = isoDate.split("-").map(Number);
  return `${String(d).padStart(2, "0")} ${short[m - 1]} ${y}`;
}

/** "1 Aug - 7 Aug" (Figma: "from 1 Aug - 7 Aug" under the numbers) */
export function formatShortRange({ from, to }) {
  const short = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  const part = (value) => {
    const [, m, d] = value.split("-").map(Number);
    return `${d} ${short[m - 1]}`;
  };
  return `${part(from)} - ${part(to)}`;
}

/**
 * The period in the two styles the Share report frames use:
 *   padded: "September 01- 14, 2026" (Report period box)
 *   plain:  "September 1-14, 2026"   (Report ready message)
 */
export function formatReportPeriod({ from, to }, style = "padded") {
  const [y1, m1, d1] = from.split("-").map(Number);
  const [y2, m2, d2] = to.split("-").map(Number);
  const pad = (n) =>
    style === "padded" ? String(n).padStart(2, "0") : String(n);
  if (y1 === y2 && m1 === m2) {
    return style === "padded"
      ? `${MONTHS[m1 - 1]} ${pad(d1)}- ${pad(d2)}, ${y1}`
      : `${MONTHS[m1 - 1]} ${d1}-${d2}, ${y1}`;
  }
  return `${MONTHS[m1 - 1]} ${pad(d1)}, ${y1} - ${MONTHS[m2 - 1]} ${pad(d2)}, ${y2}`;
}

/** Seven labels ("1/09/26") spread over the range, for the empty charts */
function emptyLabels({ from, to }) {
  const start = new Date(`${from}T00:00:00Z`);
  const end = new Date(`${to}T00:00:00Z`);
  const step = Math.max(0, (end - start) / 6);
  return Array.from({ length: 7 }, (_, i) => {
    const day = new Date(start.getTime() + step * i);
    const yy = String(day.getUTCFullYear()).slice(2);
    return `${day.getUTCDate()}/${String(day.getUTCMonth() + 1).padStart(2, "0")}/${yy}`;
  });
}

/**
 * Everything on the Reports page for one date range.
 * Later: GET /api/admin/reports?from=&to=
 */
export async function getReport({ from, to }, { demo = false } = {}) {
  if (demo) return REPORT_SAMPLE;

  const labels = emptyLabels({ from, to });
  const zero = { value: 0, change: 0 };
  return {
    stats: { users: zero, donations: zero, causes: zero, disbursements: zero },
    compareRange: null,
    users: { newCount: 0, total: 0, labels, values: [] },
    donations: { newCount: 0, amount: 0, labels, values: [] },
    causes: { newCount: 0, active: 0, fulfilled: 0, labels, values: [] },
    disbursements: { newCount: 0, amount: 0, labels, values: [] },
  };
}

/**
 * Prepare the report file (Figma: Share Reports-1 "Processing").
 * format: "pdf" | "excel"
 * Today it builds the file in the browser: Excel gets a CSV file (Excel opens
 * it), PDF gets a plain-text summary until the backend makes real PDFs.
 * Later: POST /api/admin/reports/export -> { url }
 */
export async function exportReport(report, range, format) {
  await wait(1500);
  const rows = [
    ["Sadaqua report", formatReportPeriod(range, "plain")],
    [],
    ["Measure", "Number", "Amount (NGN)"],
    ["Registered users", report.stats.users.value, ""],
    ["Donations", report.stats.donations.value, report.donations.amount],
    ["Causes", report.stats.causes.value, ""],
    ["Active causes", report.causes.active, ""],
    ["Fulfilled causes", report.causes.fulfilled, ""],
    [
      "Disbursements",
      report.stats.disbursements.value,
      report.disbursements.amount,
    ],
  ];
  const name = `sadaqua-report-${range.from}-to-${range.to}`;
  if (format === "excel") {
    const csv = rows
      .map((row) => row.map((cell) => `"${String(cell ?? "")}"`).join(","))
      .join("\n");
    return { fileName: `${name}.csv`, type: "text/csv", content: csv };
  }
  const text = rows
    .map((row) => row.filter((cell) => cell !== "").join(": "))
    .join("\n");
  return { fileName: `${name}.txt`, type: "text/plain", content: text };
}

/** The short text "Copy report summary" puts on the clipboard */
export function reportSummaryText(report, range) {
  const naira = (n) => `₦${Math.round(n).toLocaleString("en-NG")}`;
  return [
    `Sadaqua report for ${formatReportPeriod(range, "plain")}`,
    `Registered users: ${report.stats.users.value}`,
    `Donations: ${report.stats.donations.value} (${naira(report.donations.amount)} received)`,
    `Causes: ${report.stats.causes.value} (${report.causes.active} active, ${report.causes.fulfilled} fulfilled)`,
    `Disbursements: ${report.stats.disbursements.value} (${naira(report.disbursements.amount)} sent)`,
  ].join("\n");
}
