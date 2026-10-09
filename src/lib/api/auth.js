// Service layer for accounts.
// Pages and forms only call these functions; they never talk to the backend directly.
// Right now the functions SIMULATE a backend so the screens can be built and tested.
// When the real backend is ready, only the inside of these functions changes.

const FAKE_DELAY_MS = 1200;

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Create a new giver or recipient account.
 * Later: return fetch("/api/auth/signup", { method: "POST", body: ... })
 */
export async function signUp({ role, fullName, email, phone }) {
  await wait(FAKE_DELAY_MS);

  // Lets us test the "email already used" message: sign up with taken@example.com
  if (email.trim().toLowerCase() === "taken@example.com") {
    throw new Error("An account with this email already exists. Try logging in.");
  }

  return {
    user: { id: `user-${Date.now()}`, role, fullName, email, phone },
  };
}
