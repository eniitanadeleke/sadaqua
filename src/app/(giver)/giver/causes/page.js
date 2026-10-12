import { MdVerifiedUser } from "react-icons/md";
import CauseCard from "@/components/causes/CauseCard";
import CauseFilters from "@/components/causes/CauseFilters";
import CauseSearch from "@/components/causes/CauseSearch";
import CategoryTabs from "@/components/causes/CategoryTabs";
import SortSelect from "@/components/causes/SortSelect";
import BackHeader from "@/components/layout/BackHeader";
import MobileHeader from "@/components/layout/MobileHeader";
import MobileScreen from "@/components/layout/MobileScreen";
import EmptyState from "@/components/ui/EmptyState";
import { getCauseAreas, searchCauses } from "@/lib/api/causes";
import { getGiverSummary } from "@/lib/api/giver";
import { DEFAULT_FILTERS, causesHref, hasActiveFilters, readFilters } from "@/lib/causeFilters";
import { GIVER_MENU } from "@/lib/navigation";
import styles from "./page.module.css";

export const metadata = { title: "Browse causes | Sadaqua" };

// Server component. Everything the list shows comes from the address (?q=, ?category=, ...),
// so the server can filter before sending the page.
// /giver/causes?simulate=error shows the "Couldn't load causes" design.
export default async function BrowseCausesPage({ searchParams }) {
  const params = await searchParams;
  const filters = readFilters(params);
  const [giver, areas] = await Promise.all([getGiverSummary(), getCauseAreas()]);

  let causes = null;
  try {
    causes = await searchCauses(filters, {
      homeState: giver.state,
      simulateError: params.simulate === "error",
    });
  } catch {
    causes = null; // shown below as "Couldn't load causes"
  }

  const searching = filters.q !== "";
  // The filters that are switched on (except the search words), so a new search keeps them
  const { q, ...otherFilters } = filters;
  const keep = Object.fromEntries(
    Object.entries(otherFilters).filter(([key, value]) => value !== DEFAULT_FILTERS[key])
  );

  return (
    <MobileScreen top="flush">
      <MobileHeader homeHref="/giver" profileHref="/giver/profile" menuItems={GIVER_MENU} />
      <BackHeader title="Browse causes" backHref="/giver" className={styles.title} />

      <div className={styles.searchRow}>
        <CauseSearch
          placeholder="Search by name, category or location..."
          defaultValue={q}
          keep={keep}
          clearHref={causesHref({ ...filters, q: "" })}
          className={styles.search}
        />
        <CauseFilters filters={filters} areas={areas} localCity={giver.city} />
      </div>

      {causes === null ? (
        <div className={styles.empty}>
          <EmptyState
            role="alert"
            image={{ src: "/images/illustrations/connection-error.webp", width: 95, height: 100 }}
            title={"Couldn\u2019t load causes"}
            actionLabel="Try again"
            actionHref={causesHref(filters)}
          >
            <p>Please check your connection and try again.</p>
          </EmptyState>
        </div>
      ) : causes.length === 0 ? (
        <div className={styles.empty}>
          <EmptyState
            image={{ src: "/images/illustrations/no-results.webp", width: 105, height: 97 }}
            title="No causes found"
            actionLabel="Clear filters"
            actionHref="/giver/causes"
          >
            <p>
              {hasActiveFilters(filters)
                ? "Try a different search or remove some filters."
                : "There are no causes yet. Please check back soon."}
            </p>
          </EmptyState>
        </div>
      ) : (
        <>
          {searching ? (
            <h2 className={styles.results}>Search results for {"\u2018"}{q}{"\u2019"}</h2>
          ) : (
            <div className={styles.tabs}>
              <CategoryTabs filters={filters} />
            </div>
          )}

          <div className={`${styles.summary} ${searching ? styles.summaryAfterResults : ""}`}>
            <p className={styles.count}>
              <MdVerifiedUser className={styles.shield} aria-hidden="true" />
              {causes.length} verified {causes.length === 1 ? "cause" : "causes"}
            </p>
            <SortSelect filters={filters} />
          </div>

          <ul className={styles.list}>
            {causes.map((cause) => (
              <li key={cause.id}>
                <CauseCard cause={cause} variant="wide" />
              </li>
            ))}
          </ul>
        </>
      )}
    </MobileScreen>
  );
}
