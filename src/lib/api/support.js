// Service for the support team (Figma: Contact us - "Send a message").
// Today it pretends to send; later only the inside of the function changes.

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Sends a message to the Sadaqua support team.
 * message: { name, email, message, role } (role: "giver" | "recipient")
 * Throws an Error with a message the form can show.
 * Later: return fetch("/api/support/messages", { method: "POST", body: ... })
 */
export async function sendSupportMessage({ name, email, message }) {
  await wait(1000);
  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    throw new Error("Please fill in all the fields.");
  }
  return { id: `msg-${Date.now().toString(36)}` };
}
