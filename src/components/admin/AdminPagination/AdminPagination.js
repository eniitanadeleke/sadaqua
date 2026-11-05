import Link from "next/link";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import styles from "./AdminPagination.module.css";

/**
 * "Showing 1 - 6 from 50" and the page buttons (Figma: Pagination).
 * hrefFor(page): the address of a page (keeps the current filters)
 */
export default function AdminPagination({ page, pageSize, total, hrefFor }) {
  if (total === 0) return null;
  const pages = Math.max(1, Math.ceil(total / pageSize));
  const from = (page - 1) * pageSize + 1;
  const to = Math.min(total, page * pageSize);

  // Up to 4 numbered buttons around the current page, as in the Figma
  const first = Math.max(1, Math.min(page - 1, pages - 3));
  const numbers = [];
  for (let n = first; n <= Math.min(pages, first + 3); n += 1) numbers.push(n);

  return (
    <nav className={styles.pagination} aria-label="Pages">
      <p className={styles.showing}>
        Showing {from} - {to} from {total}
      </p>
      <ul className={styles.pages}>
        <li>
          <PageLink
            href={page > 1 ? hrefFor(page - 1) : null}
            label="Previous page"
          >
            <RiArrowLeftSLine aria-hidden="true" />
          </PageLink>
        </li>
        {numbers.map((n) => (
          <li key={n}>
            <PageLink
              href={hrefFor(n)}
              current={n === page}
              label={`Page ${n}`}
            >
              {n}
            </PageLink>
          </li>
        ))}
        <li>
          <PageLink
            href={page < pages ? hrefFor(page + 1) : null}
            label="Next page"
          >
            <RiArrowRightSLine aria-hidden="true" />
          </PageLink>
        </li>
      </ul>
    </nav>
  );
}

function PageLink({ href, current, label, children }) {
  const className = `${styles.page} ${current ? styles.current : ""} ${href ? "" : styles.disabled}`;
  if (!href) {
    return (
      <span className={className} aria-label={label} aria-disabled="true">
        {children}
      </span>
    );
  }
  return (
    <Link
      href={href}
      className={className}
      aria-label={label}
      aria-current={current ? "page" : undefined}
    >
      {children}
    </Link>
  );
}
