// Service layer for causes. Screens call these; today they read the mock data,
// later they will call the backend. Only the inside of each function changes.

import { CAUSES } from "@/lib/mock/causes";

const FAKE_DELAY_MS = 300;
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getUrgentCauses() {
  await wait(FAKE_DELAY_MS);
  return CAUSES.filter((cause) => cause.urgent);
}

export async function getFeaturedCauses() {
  await wait(FAKE_DELAY_MS);
  return CAUSES.filter((cause) => cause.featured);
}

export async function getCausesByIds(ids) {
  await wait(FAKE_DELAY_MS);
  return CAUSES.filter((cause) => ids.includes(cause.id));
}
