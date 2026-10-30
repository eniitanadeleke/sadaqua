// Service layer for the logged-in recipient (the person asking for help).
// Screens call these; today they use mock values, later they call the backend.
// Only the inside of each function changes.

import { RECIPIENT, REQUESTS } from "@/lib/mock/requests";

const FAKE_DELAY_MS = 300;
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/** Largest supporting document, in bytes (Figma: "Max 10 MB") */
export const MAX_DOCUMENT_BYTES = 10 * 1024 * 1024;
/** File types the upload accepts (Figma: "PDF, JPG, PNG or MP4") */
export const DOCUMENT_TYPES = {
  "application/pdf": "PDF",
  "image/jpeg": "JPG",
  "image/png": "PNG",
  "video/mp4": "MP4",
};

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
 * status: "all" or a key from lib/requestStatus.js (e.g. "under_review")
 * A new recipient has none (Figma: Recipient Home - Empty State, No request).
 * demo: true returns the sample requests (add ?preview=demo to the address).
 * Later: return fetch(`/api/me/requests?status=${status}`)
 */
export async function getMyRequests({ status = "all", demo = false } = {}) {
  await wait(FAKE_DELAY_MS);
  if (!demo) return [];
  const list =
    status === "all"
      ? REQUESTS
      : REQUESTS.filter((request) => request.status === status);
  return [...list].sort(
    (a, b) =>
      b.submittedAt.localeCompare(a.submittedAt) ||
      REQUESTS.indexOf(a) - REQUESTS.indexOf(b),
  );
}

/**
 * Sends a finished help request (Figma: "Submit request").
 * draft: { category, amount, description, urgency, state, area, document }
 * The backend saves it with status "submitted" and returns its id.
 * Later: upload the document, then
 *   return fetch("/api/me/requests", { method: "POST", body: ... })
 */
export async function submitHelpRequest(draft) {
  await wait(1200);
  const missing = [
    "category",
    "amount",
    "description",
    "urgency",
    "state",
    "area",
  ].filter((field) => !draft?.[field]);
  if (missing.length) {
    throw new Error("Some details are missing. Please check your request.");
  }
  return { id: `req-${Date.now().toString(36)}` };
}
