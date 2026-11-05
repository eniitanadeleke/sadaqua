// Sample organisation users for the admin side (Figma: Users, Manage user).
// Shown only with ?preview=demo.

const PHOTO = "/images/admin-avatar.webp";

// The five rows in the Figma first, then more of the same shape (50 in all,
// "Showing 1 - 6 from 50")
const FIGMA_ROWS = [
  { role: "admin", status: "active" },
  { role: "verification_officer", status: "active" },
  { role: "admin", status: "active" },
  { role: "verification_officer", status: "suspended" },
  { role: "verification_officer", status: "active" },
  { role: "verification_officer", status: "active" },
];

export const ADMIN_USERS = Array.from({ length: 50 }, (_, i) => {
  const base = FIGMA_ROWS[i % FIGMA_ROWS.length];
  return {
    id: `user-${i + 1}`,
    fullName: "John Doe",
    email: "example@sadaqua.com",
    phone: "+23409876543",
    photo: PHOTO,
    role: base.role,
    status: base.status,
    lastActive: "1 hour ago",
    lastActiveDetail: "2 minutes ago",
    dateAdded: "2026-09-16",
    accountStatus: "completed",
  };
});

export const ADMIN_USER_STATS = {
  total: 18,
  officers: 8,
  admins: 3,
  active: 17,
};
