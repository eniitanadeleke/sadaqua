"use client";

import { useRouter } from "next/navigation";
import { RiArrowDownSLine } from "react-icons/ri";
import { SORT_OPTIONS, causesHref } from "@/lib/causeFilters";
import styles from "./SortSelect.module.css";

/** "Most recent" dropdown. Changing it updates ?sort= in the address. */
export default function SortSelect({ filters }) {
  const router = useRouter();
  return (
    <label className={styles.sort}>
      <span className={styles.hidden}>Sort causes by</span>
      <select
        value={filters.sort}
        onChange={(event) => router.push(causesHref({ ...filters, sort: event.target.value }), { scroll: false })}
        className={styles.select}
      >
        {SORT_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <RiArrowDownSLine className={styles.icon} aria-hidden="true" />
    </label>
  );
}
