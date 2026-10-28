import Image from "next/image";
import { notFound } from "next/navigation";
import {
  RiCheckboxCircleLine,
  RiHeartLine,
  RiMapPinLine,
  RiNotification2Line,
  RiTrophyLine,
} from "react-icons/ri";
import {
  CareHandsIcon,
  HandCrossIcon,
  HeartPlusIcon,
} from "@/components/icons/ImpactIcons";
import BackHeader from "@/components/layout/BackHeader";
import MobileHeader from "@/components/layout/MobileHeader";
import MobileScreen from "@/components/layout/MobileScreen";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import IconEmptyState from "@/components/ui/IconEmptyState";
import ProgressBar from "@/components/ui/ProgressBar";
import { getGivingHistory, getImpactUpdates } from "@/lib/api/giver";
import { getCategory } from "@/lib/categories";
import { formatDate, formatNaira, percentRaised } from "@/lib/format";
import { GIVER_MENU } from "@/lib/navigation";
import styles from "./page.module.css";

export const metadata = { title: "Impact updates | Sadaqua" };

const STEP_ICONS = {
  heart: <HeartPlusIcon />,
  check: <RiCheckboxCircleLine className={styles.checkIcon} />,
  hand: <HandCrossIcon />,
};

// Figma: Impact updates / Impact updates - Empty state / Impact updates - fulfilled state
// /giver/impact?cause=amina-leukemia                (updates, still receiving donations)
// /giver/impact?cause=dialysis-support              (no updates yet)
// /giver/impact?cause=accident-victims-fulfilled    (fulfilled)
// Without ?cause it shows the cause the giver gave to most recently.
export default async function ImpactUpdatesPage({ searchParams }) {
  const params = await searchParams;
  let causeId = params.cause;
  if (!causeId) {
    const [latest] = await getGivingHistory({ demo: true });
    causeId = latest?.causeId;
  }
  const data = causeId ? await getImpactUpdates(causeId) : null;
  if (!data) notFound();

  const { cause, updates } = data;
  const category = getCategory(cause.category);
  const percent = percentRaised(cause.raised, cause.goal);
  const stillNeeded = Math.max(0, cause.goal - cause.raised);
  const state = cause.fulfilled
    ? "fulfilled"
    : stillNeeded === 0
      ? "funded"
      : "open";

  return (
    <MobileScreen top="flush">
      <MobileHeader
        homeHref="/giver"
        profileHref="/giver/profile"
        menuItems={GIVER_MENU}
      />
      <BackHeader
        title="Impact updates"
        backHref="/giver/giving-history"
        className={styles.backRow}
      />

      {/* The cause */}
      <section className={styles.cause} aria-label="Cause">
        <div className={styles.photo}>
          <Image src={cause.image} alt="" fill sizes="112px" />
        </div>
        <div>
          {cause.verified && <Badge variant="verified" size="tag" />}
          <h2 className={styles.causeTitle}>{cause.title}</h2>
          <ul className={styles.meta}>
            <li>
              <category.Icon className={styles.metaIcon} aria-hidden="true" />
              {category.label}
            </li>
            <li>
              <RiMapPinLine className={styles.metaIcon} aria-hidden="true" />
              {cause.location}
            </li>
          </ul>
        </div>
      </section>

      {/* Money raised */}
      <div className={styles.fundRow}>
        <p>
          <strong>{formatNaira(cause.raised)}</strong> raised of{" "}
          {formatNaira(cause.goal)}
        </p>
        <p className={styles.percent}>{percent}%</p>
      </div>
      <ProgressBar
        value={percent}
        label={`${percent}% raised`}
        className={styles.bar}
      />
      <div className={styles.statusRow}>
        {state === "open" ? (
          <>
            <p>{formatNaira(stillNeeded)} still needed</p>
            <p className={styles.receiving}>
              <span className={styles.dot} aria-hidden="true" />
              Still receiving donations
            </p>
          </>
        ) : (
          <>
            <p className={styles.goalReached}>Goal reached</p>
            <p
              className={
                state === "fulfilled" ? styles.fulfilledPill : styles.receiving
              }
            >
              <span className={styles.dot} aria-hidden="true" />
              {state === "fulfilled" ? "Fulfilled" : "Being delivered"}
            </p>
          </>
        )}
      </div>

      <h2 className={styles.sectionTitle}>Impact updates</h2>

      {updates.length === 0 ? (
        <IconEmptyState
          icon={<RiNotification2Line className={styles.bellIcon} />}
          title="No updates yet"
          className={styles.empty}
        >
          <p>We{"’"}ll share progress as the cause moves forward.</p>
        </IconEmptyState>
      ) : (
        <ol className={styles.timeline}>
          {updates.map((update) => (
            <li key={`${update.date}-${update.tag}`} className={styles.step}>
              <span className={styles.stepIcon} aria-hidden="true">
                {STEP_ICONS[update.icon] ?? STEP_ICONS.check}
              </span>
              <div>
                <div className={styles.stepHeader}>
                  <p className={styles.stepDate}>{formatDate(update.date)}</p>
                  <span className={styles.stepTag}>{update.tag}</span>
                </div>
                <p className={styles.stepText}>{update.text}</p>
              </div>
            </li>
          ))}
        </ol>
      )}

      {/* Closing note */}
      {state === "fulfilled" ? (
        <div className={`${styles.note} ${styles.noteTall}`}>
          <RiTrophyLine className={styles.noteIcon} aria-hidden="true" />
          <div>
            <p className={styles.noteTitle}>Cause fulfilled!</p>
            <p className={styles.noteText}>
              Your kindness has changed a life.
              <br />
              Thank you for being part of this impact.
            </p>
          </div>
        </div>
      ) : updates.length === 0 ? (
        <div
          className={`${styles.note} ${styles.noteTall} ${styles.noteWideIcon} ${styles.noteAfterEmpty}`}
        >
          <CareHandsIcon className={styles.careIcon} />
          <div>
            <p className={styles.noteTitle}>Your support is important.</p>
            <p className={styles.noteText}>
              We{"’"}ll notify you when there{"’"}s an update about this cause.
            </p>
          </div>
        </div>
      ) : (
        <div className={styles.note}>
          <RiHeartLine className={styles.noteIcon} aria-hidden="true" />
          <div>
            <p className={styles.noteTitle}>
              Your kindness is creating real impact
            </p>
            <p className={styles.noteText}>
              Thank you for being part of this change.
            </p>
          </div>
        </div>
      )}

      {state === "open" && (
        <Button
          href={`/giver/donate/${cause.id}`}
          fullWidth
          className={styles.give}
        >
          Give Now
        </Button>
      )}
    </MobileScreen>
  );
}
