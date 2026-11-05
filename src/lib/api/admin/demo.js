import { cookies } from "next/headers";
import { ADMIN_DEMO_COOKIE } from "@/lib/adminSession";

/**
 * True when the admin pages should show sample data: the address has
 * ?preview=demo, or it was turned on earlier in this browser (see src/proxy.js).
 * Pass the page's searchParams.
 */
export async function isAdminDemo(searchParams = {}) {
  const params = await searchParams;
  if (params?.preview === "demo") return true;
  if (params?.preview === "off") return false;
  const store = await cookies();
  return store.has(ADMIN_DEMO_COOKIE);
}
