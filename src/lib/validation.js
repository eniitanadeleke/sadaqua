// Form rules for Sadaqua, kept in one place so every form checks the same way.
// Each function returns an error message, or null when the value is fine.

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
// At least two words (first and last name), letters plus ' . - allowed.
const FULL_NAME_PATTERN = /^\p{L}[\p{L}'.-]*(\s+\p{L}[\p{L}'.-]*)+$/u;
// Numbers only, optional + at the start, 10 to 14 digits (e.g. 08012345678 or +2348012345678).
const PHONE_PATTERN = /^\+?\d{10,14}$/;

// Password rules, from the Figma sign-up error state.
// Change them here and every password field follows.
export const PASSWORD_RULES = [
  { test: (v) => v.length >= 8, message: "Use at least 8 characters" },
  { test: (v) => /[A-Za-z]/.test(v), message: "Add a letter" },
  { test: (v) => /\d/.test(v), message: "Add a number" },
  { test: (v) => /[^A-Za-z0-9]/.test(v), message: "Add a special character" },
];

export function validateFullName(value) {
  return FULL_NAME_PATTERN.test(value.trim())
    ? null
    : "Please enter your first and last name";
}

export function validateEmail(value) {
  return EMAIL_PATTERN.test(value.trim())
    ? null
    : "Invalid email! Please enter a valid email";
}

export function validatePhone(value) {
  const digits = value.replace(/\s+/g, "");
  return PHONE_PATTERN.test(digits)
    ? null
    : "Invalid phone number. Please use numbers only";
}

/** Returns null if strong enough, otherwise { strength, missing: [messages] }. */
export function checkPassword(value) {
  const missing = PASSWORD_RULES.filter((rule) => !rule.test(value)).map(
    (rule) => rule.message
  );
  if (missing.length === 0) return null;
  const passed = PASSWORD_RULES.length - missing.length;
  const strength = passed <= 2 ? "Low" : "Medium";
  return { strength, missing };
}

export function validateConfirmPassword(password, confirmPassword) {
  if (!confirmPassword) return "Please confirm your password";
  return password === confirmPassword ? null : "The passwords do not match";
}

/** Checks the whole sign-up form. Returns { fieldName: error } for each problem. */
export function validateSignUp(values) {
  const errors = {
    fullName: validateFullName(values.fullName),
    email: validateEmail(values.email),
    phone: validatePhone(values.phone),
    password: checkPassword(values.password),
    confirmPassword: validateConfirmPassword(
      values.password,
      values.confirmPassword
    ),
    acceptTerms: values.acceptTerms
      ? null
      : "Please agree to the Terms of Service and Privacy Policy",
  };
  // Keep only the fields that actually have a problem.
  return Object.fromEntries(Object.entries(errors).filter(([, e]) => e));
}
