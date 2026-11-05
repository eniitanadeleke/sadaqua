// Service for admin Settings (Figma: Settings, Edit profile, Change Password,
// Edit organisation details). Pages only call these functions; when the
// backend is ready, only the inside of them changes.
//
// The organisation and the signed-in admin always exist (they come from the
// account), so these are not empty by default.

import { ADMIN_PROFILE } from "@/lib/mock/admin/profile";
import {
  ACCOUNT_CONTACT,
  ADMIN_ROLES,
  NOTIFICATION_SETTINGS,
  ORGANISATION,
} from "@/lib/mock/admin/settings";

export { ADMIN_ROLES };

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function fieldError(field, message) {
  const error = new Error(message);
  error.field = field;
  return error;
}

/** Later: GET /api/admin/organisation */
export async function getOrganisation() {
  return ORGANISATION;
}

/** The signed-in admin with contact details. Later: GET /api/admin/me */
export async function getAdminAccount() {
  return { ...ADMIN_PROFILE, ...ACCOUNT_CONTACT };
}

export function roleLabel(value) {
  return ADMIN_ROLES.find((role) => role.value === value)?.label ?? value;
}

/** Later: GET /api/admin/me/notifications */
export async function getNotificationSettings() {
  return NOTIFICATION_SETTINGS;
}

/** Later: PATCH /api/admin/me/notifications */
export async function updateNotificationSettings(settings) {
  await wait(400);
  return settings;
}

/**
 * values: { fullName, role, photo? (File) }
 * Later: PATCH /api/admin/me (multipart when a photo is sent)
 */
export async function updateAdminProfile(values) {
  await wait(900);
  if (!values.fullName?.trim().includes(" ")) {
    throw fieldError("fullName", "Please enter your first and last name");
  }
  return { ...values };
}

/**
 * values: { currentPassword, newPassword }
 * Test: current password "wrong" shows the error.
 * Later: POST /api/admin/me/password
 */
export async function changeAdminPassword({ currentPassword, newPassword }) {
  await wait(900);
  if (currentPassword === "wrong") {
    throw fieldError(
      "currentPassword",
      "The password you entered is incorrect",
    );
  }
  return { changed: Boolean(newPassword) };
}

/**
 * values: { name, email, phone, logo? (File) }
 * Later: PATCH /api/admin/organisation
 */
export async function updateOrganisation(values) {
  await wait(900);
  return { ...values };
}

/** Later: POST /api/admin/me/sign-out-everywhere */
export async function signOutAllDevices() {
  await wait(700);
  return { done: true };
}
