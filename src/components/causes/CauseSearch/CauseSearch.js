import { MdOutlineSearch } from "react-icons/md";
import styles from "./CauseSearch.module.css";

/**
 * Rounded search box. It is a plain form, so it works without JavaScript:
 * pressing Enter opens the causes list with ?q=what-was-typed.
 */
export default function CauseSearch({ action = "/giver/causes", defaultValue = "", className = "" }) {
  return (
    <form action={action} role="search" className={`${styles.search} ${className}`}>
      <MdOutlineSearch className={styles.icon} aria-hidden="true" />
      <input
        type="search"
        name="q"
        defaultValue={defaultValue}
        placeholder="Search causes by name, category or location..."
        aria-label="Search causes"
        className={styles.input}
      />
    </form>
  );
}
