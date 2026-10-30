import Link from "next/link";
import {
  RiArrowRightSLine,
  RiHeadphoneLine,
  RiMindMap,
  RiQuestionLine,
} from "react-icons/ri";
import styles from "./HelpfulLinks.module.css";

// Figma: Recipient Home "Helpful information".
// All three open the recipient Support page, at the matching part.
const LINKS = [
  {
    title: "How does Sadaqua work",
    text: "Learn how we help people in need",
    href: "/recipient/support#how-it-works",
    Icon: RiMindMap,
  },
  {
    title: "Frequently asked questions",
    text: "Find answers to common questions.",
    href: "/recipient/support#faq",
    Icon: RiQuestionLine,
  },
  {
    title: "Need help?",
    text: "Contact our support team.",
    href: "/recipient/support#contact",
    Icon: RiHeadphoneLine,
  },
];

/** White card with three links, each with an icon, a title, a line of text and an arrow */
export default function HelpfulLinks() {
  return (
    <ul className={styles.list}>
      {LINKS.map(({ title, text, href, Icon }) => (
        <li key={href}>
          <Link href={href} className={styles.link}>
            <span className={styles.iconCircle} aria-hidden="true">
              <Icon className={styles.icon} />
            </span>
            <span className={styles.text}>
              <span className={styles.title}>{title}</span>
              <span className={styles.subtitle}>{text}</span>
            </span>
            <RiArrowRightSLine className={styles.arrow} aria-hidden="true" />
          </Link>
        </li>
      ))}
    </ul>
  );
}
