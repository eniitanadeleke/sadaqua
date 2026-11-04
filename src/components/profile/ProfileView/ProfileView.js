import Link from "next/link";
import { RiArrowRightSLine, RiUserFill } from "react-icons/ri";
import EditBadgeIcon from "@/components/icons/EditBadgeIcon";
import Button from "@/components/ui/Button";
import styles from "./ProfileView.module.css";

/**
 * The Profile screen body, shared by givers and recipients
 * (Figma: Giver Profile): photo, name and email, then white cards of rows.
 *
 * profile:  { fullName, email }
 * editHref: where the photo and "Edit details" go
 * sections: [{ title, rows: [{ icon, label, text, href, strong }],
 *              action?: { label, href }, spacious? }]
 *   strong:   the value is shown larger and darker (Figma: Name display)
 *   spacious: more room between rows (Figma: "Your account")
 *   closer:   16px above the card instead of 20px (Figma: recipient Support)
 * logoutClassName: extra class for "Log out" (e.g. a different gap above it)
 */
export default function ProfileView({
  profile,
  editHref,
  sections,
  logoutClassName = "",
}) {
  return (
    <>
      <section className={styles.person} aria-label="Your account">
        <Link
          href={editHref}
          className={styles.photo}
          aria-label="Edit your details"
        >
          <RiUserFill className={styles.silhouette} aria-hidden="true" />
          <EditBadgeIcon className={styles.badge} />
        </Link>
        <div className={styles.names}>
          <h1 className={styles.name}>{profile.fullName}</h1>
          <p className={styles.email}>{profile.email}</p>
        </div>
      </section>

      {sections.map((section) => (
        <section
          key={section.title}
          className={`${styles.card} ${section.spacious ? styles.spacious : ""} ${section.closer ? styles.closer : ""}`}
          aria-label={section.title}
        >
          <h2 className={styles.cardTitle}>{section.title}</h2>
          <ul className={styles.rows}>
            {section.rows.map(({ icon: Icon, label, text, href, strong }) => (
              <li key={label}>
                <Link href={href} className={styles.row}>
                  <Icon className={styles.rowIcon} aria-hidden="true" />
                  <span className={styles.rowText}>
                    <span className={styles.rowLabel}>{label}</span>
                    <span
                      className={`${styles.rowValue} ${strong ? styles.strong : ""}`}
                    >
                      {text}
                    </span>
                  </span>
                  <RiArrowRightSLine
                    className={styles.chevron}
                    aria-hidden="true"
                  />
                </Link>
              </li>
            ))}
          </ul>
          {section.action && (
            <Button
              href={section.action.href}
              variant="outlined"
              fullWidth
              className={styles.edit}
            >
              {section.action.label}
            </Button>
          )}
        </section>
      ))}

      <Button
        href="/login"
        variant="outlined"
        fullWidth
        className={`${styles.logout} ${logoutClassName}`}
      >
        Log out
      </Button>
    </>
  );
}
