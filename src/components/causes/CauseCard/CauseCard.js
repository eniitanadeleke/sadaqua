import Image from "next/image";
import Link from "next/link";
import { RiBookmarkFill, RiMapPinLine } from "react-icons/ri";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import CauseProgress from "@/components/causes/CauseProgress";
import { getCategory } from "@/lib/categories";
import { formatDaysAgo } from "@/lib/format";
import SaveButton from "./SaveButton";
import styles from "./CauseCard.module.css";

/**
 * A cause as a card.
 * variant: "wide"    - photo on the left, summary, "Give now" (Figma: Urgent needs)
 *          "compact" - photo on top, "Give" outline button (Figma: Featured causes)
 *
 * savedAt: on Saved causes, the date it was saved - the heart starts filled and
 *          "Saved  Saved 1 day ago" shows next to the button (Figma: Saved Causes)
 *
 * The title link stretches over the whole card, so tapping anywhere opens the cause;
 * the heart and the Give button sit above it and keep their own actions.
 */
export default function CauseCard({ cause, variant = "wide", savedAt }) {
  const category = getCategory(cause.category);
  const detailsHref = `/giver/causes/${cause.id}`;
  const giveHref = `/giver/donate/${cause.id}`;
  const compact = variant === "compact";

  const meta = (
    <ul className={styles.meta}>
      {category && (
        <li>
          <category.Icon className={styles.metaIcon} aria-hidden="true" />
          {category.label}
        </li>
      )}
      <li>
        <RiMapPinLine className={styles.metaIcon} aria-hidden="true" />
        {cause.location}
      </li>
    </ul>
  );

  const header = (
    <div className={styles.header}>
      {cause.verified ? (
        <Badge variant="verified" size={compact ? "sm" : "md"} />
      ) : (
        <span />
      )}
      <div className={styles.headerEnd}>
        {cause.fulfilled && (
          <Badge variant="fulfilled" size={compact ? "sm" : "md"} />
        )}
        <SaveButton
          causeTitle={cause.title}
          size={compact ? 20 : 24}
          initialSaved={Boolean(savedAt)}
        />
      </div>
    </div>
  );

  const title = (
    <h3 className={styles.title}>
      <Link href={detailsHref} className={styles.stretched}>
        {cause.title}
      </Link>
    </h3>
  );

  if (compact) {
    return (
      <article className={`${styles.card} ${styles.compact}`}>
        <div className={styles.photo}>
          <Image src={cause.image} alt="" fill sizes="167px" />
        </div>
        <div className={styles.body}>
          {header}
          {title}
          {meta}
          {/* Pinned to the bottom so cards with short titles still line up */}
          <div className={styles.footer}>
            <CauseProgress raised={cause.raised} goal={cause.goal} size="sm" />
            {cause.fulfilled ? (
              <Button disabled fullWidth className={styles.give}>
                Fulfilled
              </Button>
            ) : (
              <Button
                href={giveHref}
                variant="outlined"
                fullWidth
                className={styles.give}
              >
                Give
              </Button>
            )}
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className={`${styles.card} ${styles.wide}`}>
      <div className={styles.top}>
        <div className={styles.photo}>
          <Image src={cause.image} alt="" fill sizes="112px" />
          {cause.urgent && <Badge variant="urgent" className={styles.urgent} />}
        </div>
        <div>
          {header}
          {title}
          {meta}
          <p className={styles.summary}>{cause.summary}</p>
        </div>
      </div>
      <CauseProgress
        raised={cause.raised}
        goal={cause.goal}
        className={styles.progress}
      />
      <div
        className={`${styles.actions} ${savedAt ? styles.actionsSaved : ""}`}
      >
        {savedAt && (
          <p className={styles.saved}>
            <RiBookmarkFill className={styles.savedIcon} aria-hidden="true" />
            <strong>Saved</strong>
            <span className={styles.savedAgo}>
              Saved {formatDaysAgo(savedAt)}
            </span>
          </p>
        )}
        {cause.fulfilled ? (
          // Goal reached: no more giving (Figma: Cause details - Fulfilled)
          <Button disabled className={styles.give}>
            Fulfilled
          </Button>
        ) : (
          <Button href={giveHref} className={styles.give}>
            Give now
          </Button>
        )}
      </div>
    </article>
  );
}
