// Service for the admin request screens (Figma: Verification Request Queue,
// Request Review & Verification). Pages only call these functions; when the
// backend is ready, only the inside of them changes.
//
// Everything is empty by default; demo: true returns the sample data.

import { ADMIN_REQUEST_STATS, ADMIN_REQUESTS } from "@/lib/mock/admin/requests";

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const REQUEST_PAGE_SIZE = 6;

// Status names and colours on the admin side (Figma: Status)
export const ADMIN_REQUEST_STATUS = {
  submitted: { label: "Submitted", tone: "neutral" },
  under_review: { label: "Under review", tone: "gold" },
  approved: { label: "Approved", tone: "green" },
  needs_changes: { label: "More info needed", tone: "orange" },
  rejected: { label: "Rejected", tone: "red" },
};

/** The four numbers above the queue. Later: GET /api/admin/requests/stats */
export async function getRequestStats({ demo = false } = {}) {
  if (!demo) return { new: 0, underReview: 0, needsInfo: 0, approved: 0 };
  return ADMIN_REQUEST_STATS;
}

/**
 * One page of the queue, filtered.
 * filters: { q, status, category, date ("7d" | "30d" | "all"), page }
 * Later: GET /api/admin/requests?q=&status=&category=&date=&page=
 */
export async function getRequestQueue(
  { q = "", status = "all", category = "all", date = "all", page = 1 } = {},
  { demo = false } = {},
) {
  if (!demo)
    return { items: [], total: 0, page: 1, pageSize: REQUEST_PAGE_SIZE };

  const text = q.trim().toLowerCase();
  const newest = new Date("2026-09-17");
  const days = { "7d": 7, "30d": 30 }[date];
  const matches = ADMIN_REQUESTS.filter((r) => {
    if (status !== "all" && r.status !== status) return false;
    if (category !== "all" && r.category !== category) return false;
    if (days && (newest - new Date(r.submittedAt)) / 86400000 > days)
      return false;
    if (text && !`${r.applicant} ${r.reference}`.toLowerCase().includes(text))
      return false;
    return true;
  });

  const current = Math.max(1, Number(page) || 1);
  const start = (current - 1) * REQUEST_PAGE_SIZE;
  return {
    items: matches.slice(start, start + REQUEST_PAGE_SIZE),
    total: matches.length,
    page: current,
    pageSize: REQUEST_PAGE_SIZE,
  };
}

/** One request with everything the review page needs. Later: GET /api/admin/requests/:id */
export async function getRequestForReview(id, { demo = false } = {}) {
  if (!demo) return null;
  const request = ADMIN_REQUESTS.find((r) => r.reference === id);
  if (!request) return null;
  // Opening a new request starts its review (Figma: SAD-0029 is "Submitted"
  // in the queue and "Under review" on this screen)
  return request.status === "submitted"
    ? { ...request, status: "under_review" }
    : request;
}

/**
 * Save the verification work and the decision.
 * decision: "approve" | "request_info" | "reject" | "save"
 * review:   { outcome, checks, notes, message? }
 * Later: POST /api/admin/requests/:id/review
 */
export async function submitRequestReview(id, decision, review) {
  await wait(900);
  if (decision === "approve" && review.outcome !== "verified") {
    throw new Error("Mark the request as Verified before approving it.");
  }
  return { id, decision, savedAt: new Date().toISOString() };
}
