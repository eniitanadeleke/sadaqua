"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  RiFileTextFill,
  RiFileTextLine,
  RiHandHeartFill,
  RiHandHeartLine,
  RiHeadphoneFill,
  RiHeadphoneLine,
  RiHomeHeartFill,
  RiHomeHeartLine,
  RiUserFill,
  RiUserLine,
} from "react-icons/ri";
import styles from "./BottomNav.module.css";

/**
 * Bar along the bottom of the logged-in screens (Figma: Bottom Nav, Giver Home-1).
 * The current page's item is green; the others have warm grey icons
 * and dark brown labels.
 * A client component only because it reads the current address to know
 * which item is active.
 *
 * items: [{ label, href, icon }] - the same list as the menu (lib/navigation.js)
 */

// Remix icons, as in the design system; outline normally, filled when active.
// Causes uses the open-hands drawing from the Welcome card (no Remix match).
const ICONS = {
  home: { line: RiHomeHeartLine, fill: RiHomeHeartFill },
  causes: { mask: "/icons/need-help.svg" },
  giving: { line: RiHandHeartLine, fill: RiHandHeartFill },
  // Recipient "My Requests": the document drawn on Recipient Home's empty state
  requests: { line: RiFileTextLine, fill: RiFileTextFill },
  profile: { line: RiUserLine, fill: RiUserFill },
  support: { line: RiHeadphoneLine, fill: RiHeadphoneFill },
};

export default function BottomNav({ items }) {
  const pathname = usePathname();

  // The longest matching address wins, so /giver/causes does not also light up Home.
  const active = items
    .filter(
      (item) => pathname === item.href || pathname.startsWith(`${item.href}/`),
    )
    .sort((a, b) => b.href.length - a.href.length)[0];

  return (
    <nav className={styles.nav} aria-label="Main" data-bottom-nav>
      <ul className={styles.list} style={{ "--count": items.length }}>
        {items.map((item) => {
          const isActive = item === active;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`${styles.item} ${isActive ? styles.active : ""}`}
                aria-current={isActive ? "page" : undefined}
              >
                <NavIcon name={item.icon} active={isActive} />
                <span className={styles.label}>{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function NavIcon({ name, active }) {
  const icon = ICONS[name];
  if (!icon) return null;
  if (icon.mask) {
    return (
      <span
        className={styles.maskIcon}
        style={{ "--icon": `url(${icon.mask})` }}
        aria-hidden="true"
      />
    );
  }
  const Icon = active ? icon.fill : icon.line;
  return <Icon className={styles.icon} aria-hidden="true" />;
}
