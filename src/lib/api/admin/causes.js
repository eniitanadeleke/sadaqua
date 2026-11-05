// Service for the admin cause screens.

import { ADMIN_REQUESTS, samplePublishDraft } from "@/lib/mock/admin/requests";

// ---------- Publish Approved Cause (Figma: Publish Approved Cause) ----------

/**
 * What the publish form starts with for an approved request:
 * { request, title, category, amount, story, location, nameDisplay, image }
 * Empty (null) unless demo. Later: GET /api/admin/requests/:id/publish-draft
 */
export async function getPublishDraft(requestId, { demo = false } = {}) {
  if (!demo) return null;
  const request = ADMIN_REQUESTS.find((r) => r.reference === requestId);
  if (!request) return null;
  const publish = samplePublishDraft(request);
  return {
    requestId: request.reference,
    applicant: request.applicant,
    title: publish.title,
    category: request.category,
    amount: request.amountNeeded,
    story: publish.story,
    location: request.location,
    nameDisplay: publish.nameDisplay,
    image: publish.image,
  };
}

/**
 * Save the cause as a draft or publish it.
 * cause: { title, category, amount, story, location, nameDisplay, image }
 * action: "draft" | "publish"
 * Throws an Error with .field for a missing required field.
 * Later: POST /api/admin/causes (publish) or PUT .../draft
 */
export async function publishCause(requestId, cause, action = "publish") {
  await new Promise((resolve) => setTimeout(resolve, 900));
  for (const field of ["title", "category", "story"]) {
    if (!String(cause[field] ?? "").trim()) {
      const error = new Error("Please fill in this field.");
      error.field = field;
      throw error;
    }
  }
  if (!(Number(cause.amount) > 0)) {
    const error = new Error("Please enter the amount needed.");
    error.field = "amount";
    throw error;
  }
  return { requestId, action, causeId: `cause-${requestId.toLowerCase()}` };
}

// ---------- Approved Causes and Cause Management ----------
// (Figma: Approved Causes, Cause Management). Empty by default; demo: true
// returns sample data. Later only the inside of these functions changes.

export const CAUSE_PAGE_SIZE = 6;

// Status names and colours on the admin side
export const ADMIN_CAUSE_STATUS = {
  active: { label: "Active", tone: "green" },
  fully_funded: { label: "Fully funded", tone: "pending" },
  fulfilled: { label: "Fulfilled", tone: "neutral" },
  closed: { label: "Closed", tone: "red" },
};

// What each choice in "Cause status" means (Figma: Cause status note)
export const CAUSE_STATUS_NOTES = {
  active: "This cause is still open and can continue receiving donation",
  fully_funded:
    "This cause has reached its goal and is no longer receiving donation",
  fulfilled: "This cause is complete and the need has been met",
  closed: "This cause is closed and no longer receiving donation",
};

/** The four numbers above the list. Later: GET /api/admin/causes/stats */
export async function getCauseStats({ demo = false } = {}) {
  if (!demo) return { active: 0, fullyFunded: 0, inProgress: 0, fulfilled: 0 };
  const { ADMIN_CAUSE_STATS } = await import("@/lib/mock/admin/causes");
  return ADMIN_CAUSE_STATS;
}

/**
 * One page of published causes, filtered.
 * filters: { q, status, category, date ("7d" | "30d" | "all"), page }
 * Later: GET /api/admin/causes?q=&status=&category=&date=&page=
 */
export async function getApprovedCauses(
  { q = "", status = "all", category = "all", date = "all", page = 1 } = {},
  { demo = false } = {},
) {
  if (!demo) return { items: [], total: 0, page: 1, pageSize: CAUSE_PAGE_SIZE };
  const { ADMIN_CAUSES } = await import("@/lib/mock/admin/causes");
  const text = q.trim().toLowerCase();
  const newest = new Date("2026-09-17");
  const days = { "7d": 7, "30d": 30 }[date];
  const matches = ADMIN_CAUSES.filter((c) => {
    if (status !== "all" && c.status !== status) return false;
    if (category !== "all" && c.category !== category) return false;
    if (days && (newest - new Date(c.publishedAt)) / 86400000 > days)
      return false;
    if (text && !`${c.title} ${c.reference}`.toLowerCase().includes(text))
      return false;
    return true;
  });
  const current = Math.max(1, Number(page) || 1);
  const start = (current - 1) * CAUSE_PAGE_SIZE;
  return {
    items: matches.slice(start, start + CAUSE_PAGE_SIZE),
    total: matches.length,
    page: current,
    pageSize: CAUSE_PAGE_SIZE,
  };
}

/**
 * One cause with everything Cause Management shows (numbers, information,
 * impact updates, disbursements). Later: GET /api/admin/causes/:id
 */
export async function getCauseForManagement(id, { demo = false } = {}) {
  if (!demo) return null;
  const { ADMIN_CAUSES, ADMIN_CAUSE_DETAIL } =
    await import("@/lib/mock/admin/causes");
  // Found by its own id, or by the request it came from (the publish
  // screen links here with the request reference, e.g. SAD-0029)
  const cause =
    ADMIN_CAUSES.find((c) => c.id === id) ??
    ADMIN_CAUSES.find((c) => c.reference === id);
  if (!cause) return null;
  return {
    ...cause,
    ...ADMIN_CAUSE_DETAIL,
    title: cause.id === "cause-1" ? ADMIN_CAUSE_DETAIL.title : cause.title,
    remaining: Math.max(0, cause.goal - cause.disbursed),
  };
}

/**
 * Change a cause: "fulfil" | "close" | { status } | post an update | record
 * a disbursement. Later: PATCH/POST /api/admin/causes/:id/...
 */
export async function updateCause(id, change) {
  await new Promise((resolve) => setTimeout(resolve, 700));
  if (change.type === "update" && !String(change.title ?? "").trim()) {
    const error = new Error("Please add a title for the update.");
    error.field = "title";
    throw error;
  }
  if (change.type === "disbursement" && !(Number(change.amount) > 0)) {
    const error = new Error("Please enter the amount disbursed.");
    error.field = "amount";
    throw error;
  }
  return { id, ...change, savedAt: new Date().toISOString() };
}
