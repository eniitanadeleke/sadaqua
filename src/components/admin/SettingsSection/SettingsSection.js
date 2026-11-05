import Image from "next/image";
import Link from "next/link";
import { RiMailLine, RiMapPinLine, RiPhoneLine } from "react-icons/ri";
import styles from "./SettingsSection.module.css";

/**
 * One white card on admin Settings (Figma: Organisation, Account,
 * Notification, Security). The Figma draws the first three with a square
 * outline and a rounded one on top of each other; "doubleEdge" keeps that.
 *
 * height: the card's height in the Figma (they are all different)
 */
export default function SettingsSection({
  title,
  height,
  doubleEdge = false,
  children,
}) {
  return (
    <section
      className={`${styles.section} ${doubleEdge ? styles.double : ""}`}
      style={{ minHeight: height }}
      aria-label={title}
    >
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.body}>{children}</div>
    </section>
  );
}

/** Logo or photo with a name (and a line under it) - the left column */
export function SettingsIdentity({ image, ring = false, name, line }) {
  return (
    <div className={`${styles.identity} ${line ? styles.top : ""}`}>
      <span className={`${styles.picture} ${ring ? styles.ring : ""}`}>
        <Image
          src={image}
          alt=""
          width={40}
          height={40}
          className={styles.image}
          unoptimized
        />
      </span>
      <div className={styles.names}>
        <p className={styles.name}>{name}</p>
        {line && <p className={styles.line}>{line}</p>}
      </div>
    </div>
  );
}

/** Email / phone / place with green icons - the middle column */
export function SettingsContact({ email, phone, location, className = "" }) {
  return (
    <ul className={`${styles.contact} ${className}`}>
      <li>
        <RiMailLine className={styles.contactIcon} aria-hidden="true" />
        {email}
      </li>
      <li>
        <RiPhoneLine className={styles.contactIcon} aria-hidden="true" />
        {phone}
      </li>
      <li>
        <RiMapPinLine className={styles.contactIcon} aria-hidden="true" />
        {location}
      </li>
    </ul>
  );
}

/** Green outlined button on the right ("Edit organisation details", "Edit profile") */
export function SettingsEditButton({ href, children, className = "" }) {
  return (
    <Link href={href} scroll={false} className={`${styles.edit} ${className}`}>
      {children}
    </Link>
  );
}
