import { RiBookmarkFill } from "react-icons/ri";
import CauseCard from "@/components/causes/CauseCard";
import CauseFilters from "@/components/causes/CauseFilters";
import CauseSearch from "@/components/causes/CauseSearch";
import SortSelect from "@/components/causes/SortSelect";
import BackHeader from "@/components/layout/BackHeader";
import MobileHeader from "@/components/layout/MobileHeader";
import MobileScreen from "@/components/layout/MobileScreen";
import IconEmptyState from "@/components/ui/IconEmptyState";
import { getCauseAreas } from "@/lib/api/causes";
import { getGiverSummary, getSavedCauses } from "@/lib/api/giver";
import { DEFAULT_FILTERS, causesHref, readFilters } from "@/lib/causeFilters";
import { GIVER_MENU } from "@/lib/navigation";
import styles from "./page.module.css";

export const metadata = { title: "Saved causes | Sadaqua" };

const BASE = "/giver/saved-causes";

// Figma: Saved Causes / No Saved Causes
// Same search, filters and sort as Browse causes, over the causes the giver saved.
// A new giver has none, so the empty screen shows by default.
// Sample list: /giver/saved-causes?preview=demo
export default async function SavedCausesPage({ searchParams }) {
  const params = await searchParams;
  const demo = params.preview === "demo";
  const filters = readFilters(params);
  const [giver, areas] = await Promise.all([
    getGiverSummary(),
    getCauseAreas(),
  ]);
  const { total, causes } = await getSavedCauses(filters, {
    homeState: giver.state,
    demo,
  });

  // Links keep the other filters, and ?preview=demo while looking at the sample list
  const linkFilters = demo ? { ...filters, preview: "demo" } : filters;
  const { q, ...otherFilters } = linkFilters;
  const keep = Object.fromEntries(
    Object.entries(otherFilters).filter(
      ([key, value]) => value !== DEFAULT_FILTERS[key],
    ),
  );

  return (
    <MobileScreen top="flush">
      <MobileHeader
        homeHref="/giver"
        profileHref="/giver/profile"
        menuItems={GIVER_MENU}
      />
      <BackHeader
        title="Saved causes"
        backHref="/giver"
        className={styles.backRow}
      />

      <h2 className={styles.heading}>Saved Causes</h2>
      <p className={styles.subtitle}>
        Causes you{"’"}ve saved to come back to.
      </p>

      <div className={styles.searchRow}>
        <CauseSearch
          action={BASE}
          placeholder="Search your saved causes..."
          defaultValue={q}
          keep={keep}
          clearHref={causesHref({ ...linkFilters, q: "" }, BASE)}
          className={styles.search}
        />
        <CauseFilters
          filters={linkFilters}
          areas={areas}
          localCity={giver.city}
          basePath={BASE}
        />
      </div>

      {total === 0 ? (
        <IconEmptyState
          icon={<RiBookmarkFill className={styles.emptyIcon} />}
          title="No Saved cause yet"
          actionLabel="Browse causes"
          actionHref="/giver/causes"
          className={styles.empty}
        >
          <p>
            Save causes you are interested in
            <br />
            and come back to them later.
          </p>
        </IconEmptyState>
      ) : (
        <>
          <div className={styles.summary}>
            <p className={styles.count}>
              {causes.length} saved {causes.length === 1 ? "cause" : "causes"}
            </p>
            <SortSelect filters={linkFilters} basePath={BASE} />
          </div>

          {causes.length === 0 ? (
            <p className={styles.none}>No saved causes match your search.</p>
          ) : (
            <ul className={styles.list}>
              {causes.map((cause) => (
                <li key={cause.id}>
                  <CauseCard
                    cause={cause}
                    variant="wide"
                    savedAt={cause.savedAt}
                  />
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </MobileScreen>
  );
}
