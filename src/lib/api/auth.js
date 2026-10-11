// Service layer for accounts.
// Pages and forms only call these functions; they never talk to the backend directly.
// Right now the functions SIMULATE a backend so the screens can be built and tested.
// When the real backend is ready, only the inside of these functions changes.

const FAKE_DELAY_MS = 1200;

// Test accounts for the fake backend (password for both: Sadaqua1!)
const MOCK_USERS = [
  {
    id: "user-giver-1",
    role: "giver",
    fullName: "Aisha Bello",
    email: "giver@example.com",
    password: "Sadaqua1!",
  },
  {
    id: "user-recipient-1",
    role: "recipient",
    fullName: "Musa Ibrahim",
    email: "recipient@example.com",
    password: "Sadaqua1!",
  },
];

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// An error that says which form field it belongs to, so the form can show it there.
function fieldError(field, message) {
  const error = new Error(message);
  error.field = field;
  return error;
}

function findUser(email) {
  const wanted = email.trim().toLowerCase();
  return MOCK_USERS.find((user) => user.email === wanted);
}

// Never send the password back to the screen
function publicUser({ password, ...user }) {
  return user;
}

/**
 * Create a new giver or recipient account.
 * Later: return fetch("/api/auth/signup", { method: "POST", body: ... })
 */
export async function signUp({ role, fullName, email, phone }) {
  await wait(FAKE_DELAY_MS);

  // taken@example.com and the test accounts count as "already registered"
  if (email.trim().toLowerCase() === "taken@example.com" || findUser(email)) {
    throw new Error("An account with this email already exists. Try logging in.");
  }

  return {
    user: { id: `user-${Date.now()}`, role, fullName, email, phone },
  };
}

/**
 * Log in a giver or recipient. Returns the user, including their role,
 * so the screen knows which home page to open.
 * Later: return fetch("/api/auth/login", { method: "POST", body: ... })
 */
export async function logIn({ email, password }) {
  await wait(FAKE_DELAY_MS);

  const user = findUser(email);
  if (!user) {
    throw fieldError("email", "We could not find an account with this email");
  }
  if (user.password !== password) {
    throw fieldError("password", "The password you entered is incorrect");
  }

  return { user: publicUser(user) };
}
