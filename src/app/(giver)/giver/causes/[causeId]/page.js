import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { RiArrowRightLine, RiErrorWarningLine, RiMapPinLine } from "react-icons/ri";
import {
  AboutCause,
  CauseFacts,
  DonorsChip,
  FundingCard,
  SaveCauseButton,
  ShareCause,
  UpdateCard,
} from "@/components/causes/CauseDetails";
import BackHeader from "@/components/layout/BackHeader";
import MobileHeader from "@/components/layout/MobileHeader";
import MobileScreen from "@/components/layout/MobileScreen";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import ProgressBar from "@/components/ui/ProgressBar";
import { getCause } from "@/lib/api/causes";
import { getCategory } from "@/lib/categories";
import { formatNaira, percentRaised } from "@/lib/format";
import { GIVER_MENU } from "@/lib/navigation";
import styles from "./page.module.css";

export async function generateMetadata({ params }) {
  const { causeId } = await params;
  const cause = await getCause(causeId);
  return { title: `${cause ? cause.title : "Cause"} | Sadaqua` };
}

// Server component: fetches the cause, then shows one of three states from Figma:
//   open         - "Give Now" (Cause details, Urgent Cause)
//   fully funded - goal reached, money still being paid out (Cause details - Fully Funded)
//   fulfilled    - the admin has marked it done (Cause details - Fulfilled)
// Try: /giver/causes/amina-leukemia, /accident-victims, /accident-victims-funded,
//      /accident-victims-fulfilled
export default async function CauseDetailsPage({ params }) {
  const { causeId } = await params;
  const cause = await getCause(causeId);
  if (!cause) notFound();

  const percent = percentRaised(cause.raised, cause.goal);
  const stillNeeded = Math.max(0, cause.goal - cause.raised);
  const state = cause.fulfilled ? "fulfilled" : stillNeeded === 0 ? "funded" : "open";
  const category = getCategory(cause.category);
  const CategoryIcon = category.Icon;
  const updatesHref = `/giver/impact?cause=${cause.id}`;
  const latestUpdate = cause.updates[0];

  return (
    <MobileScreen top="flush" className={styles.screen}>
      <MobileHeader homeHref="/giver" profileHref="/giver/profile" menuItems={GIVER_MENU} />
      <BackHeader title="Cause details" backHref="/giver/causes" className={styles.backRow} />

      <div className={styles.photo}>
        <Image src={cause.image} alt="" fill sizes="350px" priority />
        {cause.urgent && state === "open" && <Badge variant="urgent" bell className={styles.urgent} />}
        <DonorsChip count={cause.donors} />
      </div>

      <div className={styles.badges}>
        {cause.verified && <Badge variant="verified" size="lg" />}
        {state === "open" && <SaveCauseButton />}
      </div>

      <h1 className={styles.title}>{cause.title}</h1>
      <ul className={styles.meta}>
        <li>
          <CategoryIcon className={styles.metaIcon} aria-hidden="true" />
          {category.label}
        </li>
        <li>
          <RiMapPinLine className={styles.metaIcon} aria-hidden="true" />
          {cause.location}
        </li>
      </ul>

      <div className={styles.raised}>
        <p>
          <strong>{formatNaira(cause.raised)}</strong> raised
          <span className={styles.goal}>of {formatNaira(cause.goal)} needed</span>
        </p>
        <p className={styles.percent}>
          <strong>{percent}%</strong>
          <span className={styles.goal}>funded</span>
        </p>
      </div>
      <ProgressBar value={percent} label={`${percent}% funded`} className={styles.bar} />

      {state === "open" && (
        <>
          <p className={styles.stillNeeded}>
            <RiErrorWarningLine className={styles.stillIcon} aria-hidden="true" />
            {formatNaira(stillNeeded)} still needed
          </p>
          <Button href={`/giver/donate/${cause.id}`} fullWidth className={styles.give}>
            Give Now
          </Button>
        </>
      )}

      {state !== "open" && (
        <div className={styles.closed}>
          <p className={styles.closedButton} role="status">
            {state === "fulfilled" ? "Fulfilled" : "Fully Funded"}
          </p>
          {state === "funded" ? (
            <p className={styles.closedNote}>Thank you! This cause is fully funded</p>
          ) : (
            <>
              <p className={styles.closedNote}>This cause has been fulfilled.</p>
              <p className={styles.closedNoteSecond}>View the impact update</p>
              <Link href={updatesHref} className={styles.viewUpdates}>
                View updates <RiArrowRightLine aria-hidden="true" />
              </Link>
            </>
          )}
        </div>
      )}

      <div className={styles[`about_${state}`]}>
        <AboutCause summary={cause.summary} story={cause.story} provides={cause.provides} />
      </div>

      {state === "open" && (
        <>
          <div className={styles.facts}>
            <CauseFacts cause={cause} />
          </div>
          <div className={styles.share}>
            <ShareCause title={cause.title} />
          </div>
        </>
      )}

      <div className={state === "open" ? styles.fundingAfterShare : styles.fundingAfterAbout}>
        <FundingCard raised={cause.raised} disbursed={cause.disbursed} lastUpdated={cause.lastUpdated} />
      </div>

      {state !== "fulfilled" && latestUpdate && (
        <div className={styles.updates}>
          <UpdateCard update={latestUpdate} href={updatesHref} />
        </div>
      )}
    </MobileScreen>
  );
}
