import Link from "next/link";
import styles from "./RequestTabs.module.css";

/**
 * Row of status pills on My requests (Figma: All, Draft, Submitted, ...).
 * Each pill is a link (?status=...), so the page works without JavaScript
 * and the chosen tab survives a refresh. The row scrolls sideways.
 *
 * tabs:   [{ key, label }]
 * active: the selected key
 * href:   (key) => address for that tab
 */
export default function RequestTabs({ tabs, active, href }) {
  return (
    <nav className={styles.tabs} aria-label="Filter requests by status">
      {tabs.map((tab) => {
        const isActive = tab.key === active;
        return (
          <Link
            key={tab.key}
            href={href(tab.key)}
            className={`${styles.tab} ${isActive ? styles.active : ""}`}
            aria-current={isActive ? "page" : undefined}
            scroll={false}
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
