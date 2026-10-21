// Service layer for causes. Screens call these; today they read the mock data,
// later they will call the backend. Only the inside of each function changes.

import { CATEGORIES } from "@/lib/categories";
import { CAUSE_DETAILS, CAUSES } from "@/lib/mock/causes";

const FAKE_DELAY_MS = 300;
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getUrgentCauses() {
  await wait(FAKE_DELAY_MS);
  return CAUSES.filter((cause) => cause.urgent && !cause.fulfilled);
}

export async function getFeaturedCauses() {
  await wait(FAKE_DELAY_MS);
  return CAUSES.filter((cause) => cause.featured);
}

/**
 * One cause with everything the Cause details screen shows, or null if not found.
 * Later: return fetch(`/api/causes/${id}`)
 */
export async function getCause(id) {
  await wait(FAKE_DELAY_MS);
  const cause = CAUSES.find((item) => item.id === id);
  if (!cause) return null;
  const extra = CAUSE_DETAILS[id] || {};
  return {
    donors: 0,
    beneficiaries: "",
    startedOn: cause.createdAt,
    campaignId: `#SADA-${cause.createdAt.slice(0, 4)}-${cause.id.length}`,
    story: [cause.summary],
    provides: [],
    disbursed: 0,
    lastUpdated: null,
    updates: [],
    ...cause,
    ...extra,
  };
}

export async function getCausesByIds(ids) {
  await wait(FAKE_DELAY_MS);
  return CAUSES.filter((cause) => ids.includes(cause.id));
}

/** The areas people can filter by, from the causes themselves: ["FCT", "Kaduna", ...] */
export async function getCauseAreas() {
  return [...new Set(CAUSES.map((cause) => cause.state))].sort();
}

/**
 * The Browse causes list.
 * filters: { q, category, urgency, area, scope, sort } (see lib/causeFilters.js)
 * homeState: the giver's own area, for "Local causes"
 * simulateError: true pretends the server could not be reached (to show the error state)
 * Later: return fetch(`/api/causes?${query}`)
 */
export async function searchCauses(filters, { homeState, simulateError = false } = {}) {
  await wait(FAKE_DELAY_MS);
  if (simulateError) throw new Error("Could not reach the server");

  const words = filters.q.toLowerCase();
  const labelOf = (key) => CATEGORIES.find((c) => c.key === key)?.label.toLowerCase() ?? "";

  const matches = CAUSES.filter((cause) => {
    if (words) {
      const text = `${cause.title} ${labelOf(cause.category)} ${cause.location}`.toLowerCase();
      if (!text.includes(words)) return false;
    }
    if (filters.category !== "all" && cause.category !== filters.category) return false;
    if (filters.urgency === "urgent" && !cause.urgent) return false;
    if (filters.urgency === "not-urgent" && cause.urgent) return false;
    if (filters.area !== "all" && cause.state !== filters.area) return false;
    if (filters.scope === "local" && cause.state !== homeState) return false;
    if (filters.scope === "other" && cause.state === homeState) return false;
    return true;
  });

  const progress = (cause) => cause.raised / cause.goal;
  const bySort = {
    recent: (a, b) => b.createdAt.localeCompare(a.createdAt),
    urgent: (a, b) => Number(b.urgent) - Number(a.urgent) || b.createdAt.localeCompare(a.createdAt),
    // Closest to the goal first; causes already fulfilled go last
    "almost-funded": (a, b) => Number(a.fulfilled) - Number(b.fulfilled) || progress(b) - progress(a),
  };
  return matches.sort(bySort[filters.sort]);
}
