"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./MobileMenu.module.css";

/**
 * The menu button (three lines) and the dropdown it opens (Figma: Menu details).
 * A client component because it opens and closes.
 */
export default function MobileMenu({ items = [], logoutHref = "/" }) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);
  const pathname = usePathname();

  // Close on Escape or a tap outside the menu
  useEffect(() => {
    if (!open) return undefined;
    function onKey(event) {
      if (event.key === "Escape") setOpen(false);
    }
    function onClick(event) {
      if (!wrapperRef.current?.contains(event.target)) setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      <button
        type="button"
        className={styles.toggle}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="app-menu"
        onClick={() => setOpen((value) => !value)}
      >
        <svg width="18" height="16" viewBox="0 0 18 16" aria-hidden="true">
          <path d="M0 1h18M0 8h18M0 15h18" stroke="currentColor" strokeWidth="2" />
        </svg>
      </button>

      {open && (
        <nav id="app-menu" className={styles.panel} aria-label="Main menu">
          <ul className={styles.list}>
            {items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={styles.link}
                  aria-current={pathname === item.href ? "page" : undefined}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link href={logoutHref} className={styles.logout}>
            Log out
          </Link>
        </nav>
      )}
    </div>
  );
}
