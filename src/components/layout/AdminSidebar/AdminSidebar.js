"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/components/ui/Logo";
import { ADMIN_MENU, activeAdminItem } from "@/lib/adminNavigation";
import styles from "./AdminSidebar.module.css";

/**
 * The admin side menu (Figma: Side Panel): logo, then the six sections.
 * The section the current page belongs to is shown in green.
 */
export default function AdminSidebar() {
  const pathname = usePathname();
  const active = activeAdminItem(pathname);

  return (
    <aside className={styles.sidebar}>
      <Link
        href="/admin/requests"
        className={styles.logo}
        aria-label="Sadaqua admin home"
      >
        <Logo size="admin" />
      </Link>

      <nav aria-label="Admin menu">
        <ul className={styles.menu}>
          {ADMIN_MENU.map((item) => {
            const isActive = item === active;
            const Icon = item.icon;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`${styles.item} ${isActive ? styles.active : ""}`}
                  aria-current={isActive ? "page" : undefined}
                >
                  <Icon className={styles.icon} aria-hidden="true" />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
