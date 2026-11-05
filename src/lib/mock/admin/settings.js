// Sample data for admin Settings (Figma: Settings, Edit profile, Edit
// organisation details). The signed-in admin's name and photo come from
// ./profile.js; the contact lines below are the ones the Settings frame shows.

export const ORGANISATION = {
  name: "Sadaqua",
  email: "example@sadaqua.org",
  phone: "+234 091 876 5432",
  location: "Abuja, Nigeria",
  logo: "/images/logo-mark.webp",
};

export const ACCOUNT_CONTACT = {
  email: "john@sadaqua.org",
  phone: "+234 091 876 5432",
  location: "Abuja, Nigeria",
};

// Figma "Role" names
export const ADMIN_ROLES = [
  { value: "verification_officer", label: "Verification officer" },
  { value: "admin", label: "Admin" },
];

export const NOTIFICATION_SETTINGS = {
  email: true,
  topics: {
    newRequest: true,
    needsReview: true,
    decisions: true,
    disbursements: true,
  },
};
