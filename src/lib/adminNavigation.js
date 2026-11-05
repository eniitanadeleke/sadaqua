import {
  RiBarChartLine,
  RiFileTextLine,
  RiGroupLine,
  RiHeartLine,
  RiSettings3Line,
  RiWallet3Line,
} from "react-icons/ri";

// The admin side menu (Figma: Side Panel). "match" is the start of every
// address that belongs to that item, so it stays green on its inner pages.
export const ADMIN_MENU = [
  {
    label: "Requests",
    href: "/admin/requests",
    match: ["/admin/requests", "/admin/causes/publish"],
    icon: RiFileTextLine,
  },
  {
    label: "Approved Causes",
    href: "/admin/causes",
    match: ["/admin/causes"],
    icon: RiHeartLine,
  },
  {
    label: "Disbursements",
    href: "/admin/disbursements",
    match: ["/admin/disbursements"],
    icon: RiWallet3Line,
  },
  {
    label: "Users",
    href: "/admin/users",
    match: ["/admin/users"],
    icon: RiGroupLine,
  },
  {
    label: "Reports",
    href: "/admin/reports",
    match: ["/admin/reports"],
    icon: RiBarChartLine,
  },
  {
    label: "Settings",
    href: "/admin/settings",
    match: ["/admin/settings"],
    icon: RiSettings3Line,
  },
];

/** The menu item a page belongs to (the most specific match wins). */
export function activeAdminItem(pathname) {
  let best = null;
  let bestLength = -1;
  for (const item of ADMIN_MENU) {
    for (const start of item.match) {
      if (pathname.startsWith(start) && start.length > bestLength) {
        best = item;
        bestLength = start.length;
      }
    }
  }
  return best;
}
