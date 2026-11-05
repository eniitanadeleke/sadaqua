// Service for the admin disbursement screens (Figma: Disbursements,
// Disbursements details). Empty by default; demo: true returns sample data.
// When the backend is ready, only the inside of these functions changes.

import {
  ADMIN_DISBURSEMENT_STATS,
  ADMIN_DISBURSEMENTS,
} from "@/lib/mock/admin/disbursements";

export const DISBURSEMENT_PAGE_SIZE = 6;

// Status names and colours (Figma: Completed in deep green, Pending in gold)
export const DISBURSEMENT_STATUS = {
  completed: { label: "Completed", tone: "green" },
  pending: { label: "Pending", tone: "pending" },
};

/** The four numbers above the list. Later: GET /api/admin/disbursements/stats */
export async function getDisbursementStats({ demo = false } = {}) {
  if (!demo)
    return { totalDisbursed: 0, thisMonth: 0, completed: 0, pending: 0 };
  return ADMIN_DISBURSEMENT_STATS;
}

/**
 * One page of disbursements, filtered.
 * filters: { q, status, category, date ("7d" | "30d" | "all"), page }
 * Later: GET /api/admin/disbursements?q=&status=&category=&date=&page=
 */
export async function getDisbursements(
  { q = "", status = "all", category = "all", date = "all", page = 1 } = {},
  { demo = false } = {},
) {
  if (!demo)
    return { items: [], total: 0, page: 1, pageSize: DISBURSEMENT_PAGE_SIZE };
  const text = q.trim().toLowerCase();
  const newest = new Date("2026-09-17");
  const days = { "7d": 7, "30d": 30 }[date];
  const matches = ADMIN_DISBURSEMENTS.filter((d) => {
    if (status !== "all" && d.status !== status) return false;
    if (category !== "all" && d.category !== category) return false;
    if (days && (newest - new Date(d.date)) / 86400000 > days) return false;
    if (text && !`${d.cause} ${d.reference}`.toLowerCase().includes(text))
      return false;
    return true;
  });
  const current = Math.max(1, Number(page) || 1);
  const start = (current - 1) * DISBURSEMENT_PAGE_SIZE;
  return {
    items: matches.slice(start, start + DISBURSEMENT_PAGE_SIZE),
    total: matches.length,
    page: current,
    pageSize: DISBURSEMENT_PAGE_SIZE,
  };
}

/** One disbursement for the details panel. Later: GET /api/admin/disbursements/:ref */
export async function getDisbursement(reference, { demo = false } = {}) {
  if (!demo || !reference) return null;
  return ADMIN_DISBURSEMENTS.find((d) => d.reference === reference) ?? null;
}
