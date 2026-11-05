// Service for the admin Users screens (Figma: Users, Add Users, Manage user).
// Pages only call these functions; when the backend is ready, only the inside
// of them changes. Everything is empty by default; demo: true returns samples.

import { ADMIN_USER_STATS, ADMIN_USERS } from "@/lib/mock/admin/users";

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const USER_PAGE_SIZE = 6;

// Roles an organisation user can have. The Figma's dropdown shows
// "Item1-5" placeholders; these are the two roles used everywhere else.
export const USER_ROLES = {
  admin: { label: "Admin", detail: "Admin" },
  verification_officer: {
    label: "Verification Officer",
    detail: "Verification officer",
  },
};

export const USER_STATUS = {
  active: { label: "Active" },
  suspended: { label: "Suspended" },
};

/** The four numbers above the list. Later: GET /api/admin/users/stats */
export async function getUserStats({ demo = false } = {}) {
  if (!demo) return { total: 0, officers: 0, admins: 0, active: 0 };
  return ADMIN_USER_STATS;
}

/**
 * One page of users. filters: { q, status, role, page }
 * Later: GET /api/admin/users?q=&status=&role=&page=
 */
export async function getUsers(
  { q = "", status = "all", role = "all", page = 1 } = {},
  { demo = false } = {},
) {
  if (!demo) return { items: [], total: 0, page: 1, pageSize: USER_PAGE_SIZE };
  const text = q.trim().toLowerCase();
  const matches = ADMIN_USERS.filter((user) => {
    if (status !== "all" && user.status !== status) return false;
    if (role !== "all" && user.role !== role) return false;
    if (text && !`${user.fullName} ${user.email}`.toLowerCase().includes(text))
      return false;
    return true;
  });
  const current = Math.max(1, Number(page) || 1);
  const start = (current - 1) * USER_PAGE_SIZE;
  return {
    items: matches.slice(start, start + USER_PAGE_SIZE),
    total: matches.length,
    page: current,
    pageSize: USER_PAGE_SIZE,
  };
}

/** One user for the Manage user panel. Later: GET /api/admin/users/:id */
export async function getUser(id, { demo = false } = {}) {
  if (!demo) return null;
  return ADMIN_USERS.find((user) => user.id === id) ?? null;
}

/**
 * Invite someone to the organisation workspace.
 * Throws an Error with .field ("fullName" | "email" | "role").
 * Later: POST /api/admin/users/invitations
 */
export async function inviteUser({ fullName, email, role }) {
  await wait(900);
  if (email.trim().toLowerCase() === "taken@sadaqua.org") {
    const error = new Error("This email already has access to the workspace");
    error.field = "email";
    throw error;
  }
  return { fullName, email, role, invitedAt: new Date().toISOString() };
}

/**
 * Deactivate (suspend) or reactivate a user.
 * Later: PATCH /api/admin/users/:id { status }
 */
export async function setUserStatus(id, status) {
  await wait(700);
  return { id, status };
}
