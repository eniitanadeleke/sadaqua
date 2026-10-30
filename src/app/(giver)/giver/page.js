import Image from "next/image";
import Button from "@/components/ui/Button";
import SectionHeader from "@/components/ui/SectionHeader";
import CauseCard from "@/components/causes/CauseCard";
import CauseSearch from "@/components/causes/CauseSearch";
import CategoryChips from "@/components/causes/CategoryChips";
import VerifiedNotice from "@/components/causes/VerifiedNotice";
import GeneralDonationCard from "@/components/giver/GeneralDonationCard";
import GivingSummary from "@/components/giver/GivingSummary";
import ImpactCard from "@/components/giver/ImpactCard";
import MobileHeader from "@/components/layout/MobileHeader";
import MobileScreen from "@/components/layout/MobileScreen";
import {
  getCausesByIds,
  getFeaturedCauses,
  getUrgentCauses,
} from "@/lib/api/causes";
import { getGiverSummary } from "@/lib/api/giver";
import { GIVER_MENU } from "@/lib/navigation";
import styles from "./page.module.css";

export const metadata = { title: "Home | Sadaqua" };

// Server component: fetches everything the screen needs before sending it.
// /giver shows a giver who has not donated yet (Figma: "Giver Home - new user").
// /giver?preview=demo shows the sample giver with donations (Figma: "Giver Home").
export default async function GiverHomePage({ searchParams }) {
  const { preview } = await searchParams;

  const giver = await getGiverSummary({ demo: preview === "demo" });
  // The three lists do not depend on each other, so fetch them at the same time.
  const [urgent, featured, supported] = await Promise.all([
    getUrgentCauses(),
    getFeaturedCauses(),
    getCausesByIds(giver.supportedCauseIds),
  ]);

  return (
    <MobileScreen top="flush">
      {/* Home uses the bottom bar instead of the hamburger (Figma: Giver Home-1) */}
      <MobileHeader
        homeHref="/giver"
        profileHref="/giver/profile"
        menuItems={GIVER_MENU}
        nav="bottom"
      />

      <section className={styles.hero}>
        <p className={styles.greeting}>Assalamu alaikum, {giver.firstName}</p>
        <h1 className={styles.heading}>
          Find a cause
          <br />
          to support
        </h1>
        <p className={styles.tagline}>Your kindness can change lives.</p>
        <Image
          src="/images/giving-hands.webp"
          alt=""
          width={171}
          height={64}
          className={styles.hands}
          loading="eager"
        />
      </section>

      <CauseSearch className={styles.search} />

      <div className={styles.summary}>
        <GivingSummary
          totalDonated={giver.totalDonated}
          causesSupported={giver.causesSupported}
        />
      </div>

      <section
        className={`${styles.section} ${styles.urgent}`}
        aria-labelledby="urgent-needs"
      >
        <SectionHeader
          id="urgent-needs"
          title="Urgent needs"
          actionHref="/giver/causes?urgent=1"
        />
        <ul className={`${styles.carousel} ${styles.wideCards}`}>
          {urgent.map((cause) => (
            <li key={cause.id}>
              <CauseCard cause={cause} variant="wide" />
            </li>
          ))}
        </ul>
      </section>

      {/* Figma shows this card to givers who have donated before,
          not on "Giver Home - new user". */}
      {giver.causesSupported > 0 && (
        <div className={styles.general}>
          <GeneralDonationCard />
        </div>
      )}

      <section
        className={`${styles.section} ${giver.causesSupported > 0 ? styles.afterCard : styles.categories}`}
        aria-labelledby="categories"
      >
        <SectionHeader id="categories" title="Browse by category" />
        <div className={styles.sectionBody}>
          <CategoryChips />
        </div>
      </section>

      <section className={styles.section} aria-labelledby="featured">
        <SectionHeader
          id="featured"
          title="Featured causes"
          actionHref="/giver/causes"
        />
        <ul className={`${styles.carousel} ${styles.compactCards}`}>
          {featured.map((cause) => (
            <li key={cause.id}>
              <CauseCard cause={cause} variant="compact" />
            </li>
          ))}
        </ul>
      </section>

      {supported.length > 0 && (
        <section
          className={`${styles.section} ${styles.impact}`}
          aria-labelledby="impact"
        >
          <SectionHeader
            id="impact"
            title="Your impact"
            subtitle="Causes you've supported"
            actionHref="/giver/impact"
          />
          <div className={styles.impactBody}>
            {supported.slice(0, 1).map((cause) => (
              <ImpactCard key={cause.id} cause={cause} />
            ))}
          </div>
        </section>
      )}

      <div
        className={supported.length > 0 ? styles.notice : styles.noticeNoImpact}
      >
        <VerifiedNotice />
      </div>

      <section className={styles.explore} aria-labelledby="explore">
        <h2 id="explore" className={styles.exploreTitle}>
          Explore more causes
        </h2>
        <p className={styles.exploreText}>
          Find more verified causes to Support
        </p>
        <Button href="/giver/causes" className={styles.exploreButton}>
          Browse all causes
        </Button>
      </section>
    </MobileScreen>
  );
}
