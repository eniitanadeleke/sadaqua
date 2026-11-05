"use client";

import { useState } from "react";
import { RiArrowDownSLine, RiSearchLine } from "react-icons/ri";
import styles from "./AdminFilterBar.module.css";

/**
 * Search box, dropdown filters and the green "Search" button
 * (Figma: Verification Request Queue, Approved Causes, Disbursements, Users).
 * It is a normal form: "Search" reloads the page with the choices in the
 * address (?q=...&status=...), so a filtered list can be shared or bookmarked.
 *
 * placeholder: text in the search box
 * filters: [{ name, label, options: [{ value, label }], value }]
 * values:  the current search text, { q }
 */
export default function AdminFilterBar({ placeholder, filters = [], q = "" }) {
  return (
    <form className={styles.bar} role="search">
      <label className={styles.search}>
        <RiSearchLine className={styles.searchIcon} aria-hidden="true" />
        <span className="visually-hidden">Search</span>
        <input
          type="search"
          name="q"
          defaultValue={q}
          placeholder={placeholder}
          className={styles.searchInput}
        />
      </label>

      {filters.map((filter) => (
        <FilterSelect key={filter.name} {...filter} />
      ))}

      <button type="submit" className={styles.submit}>
        Search
      </button>
    </form>
  );
}

/** One pill: the name on top with a chevron, the chosen option under it */
function FilterSelect({ name, label, options, value }) {
  const [current, setCurrent] = useState(value ?? options[0].value);
  const chosen =
    options.find((option) => option.value === current) ?? options[0];

  return (
    <label className={styles.filter}>
      <span className={styles.filterLabel}>
        {label}
        <RiArrowDownSLine className={styles.chevron} aria-hidden="true" />
      </span>
      <span className={styles.filterValue}>{chosen.label}</span>
      <select
        name={name}
        value={current}
        onChange={(event) => setCurrent(event.target.value)}
        className={styles.select}
        aria-label={label}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
