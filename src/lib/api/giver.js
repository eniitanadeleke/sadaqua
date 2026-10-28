// Service layer for the logged-in giver's own information.

import { filterCauses, getCause } from "@/lib/api/causes";
import { CAUSES, GIVER } from "@/lib/mock/causes";
import { DONATIONS, IMPACT_UPDATES, SAVED_CAUSES } from "@/lib/mock/donations";

const FAKE_DELAY_MS = 300;
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * The giver's name and giving totals for the Home screen.
 * By default this is a giver who has not donated yet (N0, 0 causes),
 * like a real first login. demo: true returns the sample giver from the
 * Figma design (N45,000, 5 causes): open /giver?preview=demo to see it.
 * Later: the backend returns the real totals, worked out from payments.
 */
export async function getGiverSummary({ demo = false } = {}) {
  await wait(FAKE_DELAY_MS);
  if (demo) return GIVER;
  return {
    ...GIVER,
    totalDonated: 0,
    causesSupported: 0,
    supportedCauseIds: [],
  };
}

/**
 * Giving history, newest first, each donation with its cause.
 * status: "all" | "completed" | "pending"
 * Like the Home totals, a new giver has no donations yet; demo: true returns
 * the sample list from Figma (open /giver/giving-history?preview=demo).
 * Later: return fetch(`/api/me/donations?status=${status}`)
 */
export async function getGivingHistory({ status = "all", demo = false } = {}) {
  await wait(FAKE_DELAY_MS);
  if (!demo) return [];
  const list =
    status === "all"
      ? DONATIONS
      : DONATIONS.filter((item) => item.status === status);
  return list.map((donation) => ({
    ...donation,
    cause: CAUSES.find((cause) => cause.id === donation.causeId) ?? null,
  }));
}

/**
 * The giver's saved causes, with the same search, filters and sort as Browse causes.
 * Returns { total, causes: [{ ...cause, savedAt }] }; total counts all saved causes.
 * demo: true returns the sample list (open /giver/saved-causes?preview=demo).
 * Later: return fetch(`/api/me/saved-causes?${query}`)
 */
export async function getSavedCauses(
  filters,
  { homeState, demo = false } = {},
) {
  await wait(FAKE_DELAY_MS);
  if (!demo) return { total: 0, causes: [] };
  const saved = SAVED_CAUSES.map(({ causeId, savedAt }) => ({
    ...CAUSES.find((cause) => cause.id === causeId),
    savedAt,
  }));
  return {
    total: saved.length,
    causes: filterCauses(saved, filters, homeState, (cause) => cause.savedAt),
  };
}

/**
 * One cause with its impact updates (newest first), or null if not found.
 * Later: return fetch(`/api/causes/${causeId}/updates`)
 */
export async function getImpactUpdates(causeId) {
  const cause = await getCause(causeId);
  if (!cause) return null;
  return { cause, updates: IMPACT_UPDATES[causeId] ?? [] };
}
