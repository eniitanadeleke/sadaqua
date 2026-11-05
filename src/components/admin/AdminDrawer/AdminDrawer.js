"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { RiCloseLine } from "react-icons/ri";
import styles from "./AdminDrawer.module.css";

/**
 * Panel that slides over the page from the right (Figma: Disbursements
 * details, Manage user). The page behind is dimmed; the side menu and top
 * bar stay as they are.
 *
 * title:     panel heading
 * closeHref: where the X (and Esc, and a click on the dimmed page) goes
 */
export default function AdminDrawer({ title, closeHref, children }) {
  const router = useRouter();

  useEffect(() => {
    function onKey(event) {
      if (event.key === "Escape") router.push(closeHref, { scroll: false });
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [router, closeHref]);

  return (
    <>
      <Link
        href={closeHref}
        scroll={false}
        className={styles.backdrop}
        aria-label="Close panel"
        tabIndex={-1}
      />
      <aside
        className={styles.drawer}
        role="dialog"
        aria-modal="true"
        aria-labelledby="drawer-title"
      >
        <div className={styles.head}>
          <h2 id="drawer-title" className={styles.title}>
            {title}
          </h2>
          <Link
            href={closeHref}
            scroll={false}
            className={styles.close}
            aria-label="Close"
          >
            <RiCloseLine aria-hidden="true" />
          </Link>
        </div>
        {children}
      </aside>
    </>
  );
}
