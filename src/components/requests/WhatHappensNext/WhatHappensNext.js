import {
  RiCloseLine,
  RiEditLine,
  RiFileTextLine,
  RiGlobalLine,
  RiSearchLine,
  RiShieldCheckLine,
} from "react-icons/ri";
import styles from "./WhatHappensNext.module.css";

// Figma: Request Submitted, "What happens next?" card.
// tone picks the circle colours; line is the colour of the joining line below.
const NEXT = [
  {
    title: "Submitted",
    text: "We’ve received your request.",
    Icon: RiFileTextLine,
    tone: "done",
    line: "green",
  },
  {
    title: "Under review",
    text: "Our team is reviewing your request.",
    Icon: RiSearchLine,
    tone: "review",
    line: "beige",
  },
  {
    title: "Verified",
    text: "If approved, your request will be verified.",
    Icon: RiShieldCheckLine,
    tone: "later",
    line: "beige",
  },
  {
    title: "Published",
    text: "Your request will be visible to givers on Sadaqua.",
    Icon: RiGlobalLine,
    tone: "later",
  },
];

const OTHER = [
  {
    title: "Needs changes",
    text: "We may ask for more information or corrections.",
    Icon: RiEditLine,
    tone: "changes",
    line: "green",
  },
  {
    title: "Rejected",
    text: "If we can’t verify your request, it may be declined.",
    Icon: RiCloseLine,
    tone: "rejected",
  },
];

/** White card listing the stages after a request is sent */
export default function WhatHappensNext() {
  return (
    <section className={styles.card} aria-labelledby="what-next">
      <h2 id="what-next" className={styles.heading}>
        What happens next?
      </h2>
      <Timeline items={NEXT} />

      <h2 className={`${styles.heading} ${styles.other}`}>
        Other possible outcomes
      </h2>
      <Timeline items={OTHER} />
    </section>
  );
}

function Timeline({ items }) {
  return (
    <ol className={styles.list}>
      {items.map(({ title, text, Icon, tone, line }) => (
        <li key={title} className={styles.item}>
          <span className={styles.marker}>
            <span
              className={`${styles.circle} ${styles[tone]}`}
              aria-hidden="true"
            >
              <Icon />
            </span>
            {line && <span className={`${styles.line} ${styles[line]}`} />}
          </span>
          <span>
            <span className={styles.title}>{title}</span>
            <span className={styles.text}>{text}</span>
          </span>
        </li>
      ))}
    </ol>
  );
}
