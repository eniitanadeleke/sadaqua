// Service layer for the logged-in giver's own information.

import { GIVER } from "@/lib/mock/causes";

const FAKE_DELAY_MS = 300;
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * The giver's name and giving totals for the Home screen.
 * By default this is a giver who has not donated yet (N0, 0 causes),
 * like a real first login. demo: true returns the sample giver from the
 * Figma design (N45,000, 5 causes): open /giver?preview=demo to see it.
 * Later: the backend returns the real totals, worked out from payments.
 */
export async function getGiverSummary({ demo = false } = {}) {
  await wait(FAKE_DELAY_MS);
  if (demo) return GIVER;
  return { ...GIVER, totalDonated: 0, causesSupported: 0, supportedCauseIds: [] };
}
