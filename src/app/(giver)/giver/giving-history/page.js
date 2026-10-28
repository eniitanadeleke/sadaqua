import Link from "next/link";
import { RiFileTextFill } from "react-icons/ri";
import DonationHistoryCard from "@/components/giver/DonationHistoryCard";
import BackHeader from "@/components/layout/BackHeader";
import MobileHeader from "@/components/layout/MobileHeader";
import MobileScreen from "@/components/layout/MobileScreen";
import IconEmptyState from "@/components/ui/IconEmptyState";
import { getGivingHistory } from "@/lib/api/giver";
import { GIVER_MENU } from "@/lib/navigation";
import styles from "./page.module.css";

export const metadata = { title: "Giving history | Sadaqua" };

const TABS = [
  { value: "all", label: "All" },
  { value: "completed", label: "Completed" },
  { value: "pending", label: "Pending" },
];

// Figma: Giving History / Giving History- Empty
// A new giver has no donations, so the empty screen shows by default.
// Sample list: /giver/giving-history?preview=demo (tabs: &status=completed or pending)
export default async function GivingHistoryPage({ searchParams }) {
  const params = await searchParams;
  const demo = params.preview === "demo";
  const status = TABS.some((tab) => tab.value === params.status)
    ? params.status
    : "all";
  const [all, donations] = await Promise.all([
    getGivingHistory({ demo }),
    getGivingHistory({ status, demo }),
  ]);

  const tabHref = (value) => {
    const query = new URLSearchParams({
      ...(demo && { preview: "demo" }),
      ...(value !== "all" && { status: value }),
    });
    const text = query.toString();
    return text ? `/giver/giving-history?${text}` : "/giver/giving-history";
  };

  return (
    <MobileScreen top="flush">
      <MobileHeader
        homeHref="/giver"
        profileHref="/giver/profile"
        menuItems={GIVER_MENU}
      />
      <BackHeader
        title="Giving history"
        backHref="/giver"
        className={styles.backRow}
      />

      {all.length === 0 ? (
        <IconEmptyState
          tone="mint"
          icon={<RiFileTextFill className={styles.emptyIcon} />}
          title="No donation yet"
          actionLabel="Browse causes"
          actionHref="/giver/causes"
          className={styles.empty}
        >
          <p>Causes you support will appear here.</p>
        </IconEmptyState>
      ) : (
        <>
          <h2 className={styles.heading}>Giving History</h2>
          <p className={styles.subtitle}>
            Keep track of your contributions and their impact.
          </p>

          <nav className={styles.tabs} aria-label="Filter donations">
            {TABS.map((tab) => (
              <Link
                key={tab.value}
                href={tabHref(tab.value)}
                className={`${styles.tab} ${tab.value === status ? styles.tabActive : ""}`}
                aria-current={tab.value === status ? "page" : undefined}
                scroll={false}
              >
                {tab.label}
              </Link>
            ))}
          </nav>

          {donations.length === 0 ? (
            <p className={styles.none}>No {status} donations.</p>
          ) : (
            <ul className={styles.list}>
              {donations.map((donation) => (
                <li key={donation.reference}>
                  <DonationHistoryCard donation={donation} />
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </MobileScreen>
  );
}
