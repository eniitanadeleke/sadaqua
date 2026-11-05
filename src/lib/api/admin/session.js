// Service for admin sign-in (Figma: Admin Log in, Admin Forgot Password).
// Today it pretends to talk to a backend; later only the inside of these
// functions changes.

import { ADMIN_PROFILE } from "@/lib/mock/admin/profile";

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Test admin account for the fake backend
const MOCK_ADMIN = { email: "admin@sadaqua.org", password: "Sadaqua1!" };

function fieldError(field, message) {
  const error = new Error(message);
  error.field = field;
  return error;
}

/**
 * Log an admin in. Throws an Error with .field ("email" | "password").
 * Later: return fetch("/api/admin/login", { method: "POST", body: ... })
 */
export async function adminLogIn({ email, password }) {
  await wait(1200);
  if (email.trim().toLowerCase() !== MOCK_ADMIN.email) {
    throw fieldError(
      "email",
      "We could not find an admin account with this email",
    );
  }
  if (password !== MOCK_ADMIN.password) {
    throw fieldError("password", "The password you entered is incorrect");
  }
  return { admin: ADMIN_PROFILE };
}

/**
 * Send a reset link. Always "succeeds", so nobody can use the form to find
 * out which emails are admin accounts.
 * Later: return fetch("/api/admin/forgot-password", { method: "POST", body: ... })
 */
export async function adminRequestPasswordReset({ email }) {
  await wait(1200);
  return { sent: true, email };
}

/** The signed-in admin, for the top bar. Later: read from the session. */
export async function getSignedInAdmin() {
  return ADMIN_PROFILE;
}
