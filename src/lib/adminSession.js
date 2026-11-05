// Cookie names for the admin side (kept apart from the menu so the
// page guard (src/proxy.js) stays small). The real backend will replace these with its session.

// Set by the admin log-in; the admin pages check it (see src/proxy.js).
export const ADMIN_SESSION_COOKIE = "sadaqua_admin";

// Set by "?preview=demo" on an admin page: sample data stays on while you
// click around the admin side. "?preview=off" removes it.
export const ADMIN_DEMO_COOKIE = "sadaqua_admin_demo";
