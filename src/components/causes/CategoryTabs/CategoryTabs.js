import Link from "next/link";
import { CATEGORIES } from "@/lib/categories";
import { causesHref } from "@/lib/causeFilters";
import styles from "./CategoryTabs.module.css";

/** Scrolling row of category pills: All, Healthcare, Feeding... The current one is green. */
export default function CategoryTabs({ filters }) {
  const tabs = [{ key: "all", label: "All" }, ...CATEGORIES];
  return (
    <nav aria-label="Categories" className={styles.wrapper}>
      <ul className={styles.tabs}>
        {tabs.map(({ key, label }) => {
          const active = filters.category === key;
          return (
            <li key={key}>
              <Link
                href={causesHref({ ...filters, category: key })}
                className={`${styles.tab} ${active ? styles.active : ""}`}
                aria-current={active ? "page" : undefined}
                scroll={false}
              >
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
