import Link from "next/link";
import { RiCloseLine, RiSearchLine } from "react-icons/ri";
import styles from "./CauseSearch.module.css";

/**
 * Rounded search box. A plain form, so it works without JavaScript:
 * pressing Enter opens the causes list with ?q=what-was-typed.
 *
 * keep:     other filters to carry along, e.g. { category: "feeding" }
 * clearHref: when given (and there is a search), shows an X that clears it
 */
export default function CauseSearch({
  action = "/giver/causes",
  defaultValue = "",
  placeholder = "Search causes by name, category or location...",
  keep = {},
  clearHref,
  className = "",
}) {
  return (
    <form
      action={action}
      role="search"
      className={`${styles.search} ${className}`}
    >
      <RiSearchLine className={styles.icon} aria-hidden="true" />
      <input
        type="search"
        name="q"
        defaultValue={defaultValue}
        placeholder={placeholder}
        aria-label="Search causes"
        className={styles.input}
      />
      {Object.entries(keep).map(([name, value]) => (
        <input key={name} type="hidden" name={name} value={value} />
      ))}
      {defaultValue && clearHref && (
        <Link
          href={clearHref}
          className={styles.clear}
          aria-label="Clear search"
        >
          <RiCloseLine aria-hidden="true" />
        </Link>
      )}
    </form>
  );
}
