// Service layer for the logged-in recipient (the person asking for help).
// Screens call these; today they use mock values, later they call the backend.
// Only the inside of each function changes.

import { RECIPIENT, REQUESTS } from "@/lib/mock/requests";
import { REQUEST_STATUSES } from "@/lib/requestStatus";

const getRequestStatusKeys = () => Object.keys(REQUEST_STATUSES);

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
 * One of the recipient's requests, with its history (Figma: My request details).
 * Returns null when there is no such request.
 * demo: true looks in the sample requests. In demo mode, status lets you
 * preview the same request at any stage, e.g. ?preview=demo&status=fulfilled
 * Later: return fetch(`/api/me/requests/${id}`)
 */
export async function getMyRequest(id, { demo = false, status } = {}) {
  await wait(FAKE_DELAY_MS);
  if (!demo) return null;
  const request = REQUESTS.find((r) => r.id === id);
  if (!request) return null;
  if (!status || !getRequestStatusKeys().includes(status)) return request;
  return {
    ...request,
    status,
    received: status === "fulfilled" ? request.amount : request.received,
  };
}

/**
 * Uploads a document for a reply to "More information needed".
 * onProgress(percent) is called as the upload goes (Figma: "Uploading.... 60%").
 * Returns an id the reply can point to.
 * Later: an XMLHttpRequest / fetch upload that reports progress events.
 */
export function uploadRequestDocument(file, onProgress) {
  return new Promise((resolve) => {
    let percent = 0;
    const timer = setInterval(() => {
      percent = Math.min(100, percent + 20);
      onProgress?.(percent);
      if (percent === 100) {
        clearInterval(timer);
        resolve({ documentId: `doc-${Date.now().toString(36)}` });
      }
    }, 300);
  });
}

/**
 * Sends the recipient's answer to "More information needed"
 * (Figma: Submit information). The request then goes back to review.
 * response: { message, documentId }
 * Later: return fetch(`/api/me/requests/${id}/responses`, { method: "POST", ... })
 */
export async function sendMoreInformation(id, response) {
  await wait(1200);
  if (!response?.message?.trim()) {
    throw new Error("Please tell us the information we asked for.");
  }
  return { id, status: "under_review" };
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
