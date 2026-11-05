"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { RiCloseLine } from "react-icons/ri";
import styles from "./AdminModal.module.css";

/**
 * White pop-up card over the dimmed page (Figma: Add organisation user,
 * Share report, Edit profile, Cause published successfully...).
 *
 * closeHref: where X, Esc and a click on the dimmed page go (omit for no X)
 * top:       distance from the top of the window, as placed in Figma
 * width:     card width (434 in most frames)
 */
export default function AdminModal({
  title,
  closeHref,
  top = 279,
  width = 434,
  className = "",
  children,
}) {
  const router = useRouter();

  useEffect(() => {
    if (!closeHref) return undefined;
    function onKey(event) {
      if (event.key === "Escape") router.push(closeHref, { scroll: false });
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [router, closeHref]);

  return (
    <>
      {closeHref ? (
        <Link
          href={closeHref}
          scroll={false}
          className={styles.backdrop}
          aria-label="Close"
          tabIndex={-1}
        />
      ) : (
        <div className={styles.backdrop} />
      )}
      <div className={styles.place} style={{ paddingTop: top }}>
        <div
          className={`${styles.card} ${className}`}
          style={{ width }}
          role="dialog"
          aria-modal="true"
          aria-label={typeof title === "string" ? title : undefined}
        >
          {closeHref && (
            <Link
              href={closeHref}
              scroll={false}
              className={styles.close}
              aria-label="Close"
            >
              <RiCloseLine aria-hidden="true" />
            </Link>
          )}
          {title && <h2 className={styles.title}>{title}</h2>}
          {children}
        </div>
      </div>
    </>
  );
}
