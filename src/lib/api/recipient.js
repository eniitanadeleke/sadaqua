// Service layer for the logged-in recipient (the person asking for help).
// Screens call these; today they use mock values, later they call the backend.
// Only the inside of each function changes.

import { RECIPIENT, REQUESTS } from "@/lib/mock/requests";

const FAKE_DELAY_MS = 300;
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * The recipient's name for the greeting.
 * Later: return fetch("/api/me")
 */
export async function getRecipientSummary() {
  await wait(FAKE_DELAY_MS);
  return RECIPIENT;
}

/**
 * The recipient's help requests, newest first.
 * A new recipient has none (Figma: Recipient Home - Empty State).
 * demo: true returns the sample requests (open /recipient?preview=demo).
 * Later: return fetch("/api/me/requests")
 */
export async function getMyRequests({ demo = false } = {}) {
  await wait(FAKE_DELAY_MS);
  if (!demo) return [];
  return [...REQUESTS].sort(
    (a, b) =>
      b.submittedAt.localeCompare(a.submittedAt) ||
      REQUESTS.indexOf(a) - REQUESTS.indexOf(b),
  );
}
