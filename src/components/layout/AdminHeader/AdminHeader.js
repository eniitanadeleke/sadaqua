import Image from "next/image";
import Link from "next/link";
import {
  RiArrowDownSLine,
  RiNotification3Line,
  RiSearchLine,
} from "react-icons/ri";
import styles from "./AdminHeader.module.css";

/**
 * The bar along the top of every admin page (Figma: Nav bar - Admin):
 * search, notifications and the signed-in admin.
 *
 * admin: { fullName, photo }
 */
export default function AdminHeader({ admin }) {
  return (
    <header className={styles.header}>
      <form action="/admin/requests" role="search" className={styles.search}>
        <RiSearchLine className={styles.searchIcon} aria-hidden="true" />
        <input
          type="search"
          name="q"
          placeholder="Search..."
          aria-label="Search requests"
          className={styles.searchInput}
        />
      </form>

      <button type="button" className={styles.bell} aria-label="Notifications">
        <RiNotification3Line aria-hidden="true" />
      </button>

      <span className={styles.divider} aria-hidden="true" />

      <Link href="/admin/settings" className={styles.account}>
        <span className={styles.avatar}>
          <Image
            src={admin.photo}
            alt=""
            width={40}
            height={40}
            className={styles.photo}
            unoptimized
          />
        </span>
        <span className={styles.name}>{admin.fullName}</span>
        <RiArrowDownSLine className={styles.chevron} aria-hidden="true" />
      </Link>
    </header>
  );
}
