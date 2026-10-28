import Link from "next/link";
import {
  RiArrowRightSLine,
  RiBookmarkLine,
  RiHeadphoneLine,
  RiHistoryLine,
  RiMailLine,
  RiPhoneLine,
  RiUserFill,
  RiUserLine,
} from "react-icons/ri";
import EditBadgeIcon from "@/components/icons/EditBadgeIcon";
import MobileHeader from "@/components/layout/MobileHeader";
import MobileScreen from "@/components/layout/MobileScreen";
import Button from "@/components/ui/Button";
import { getGiverProfile } from "@/lib/api/giver";
import { formatPhone } from "@/lib/format";
import { GIVER_MENU } from "@/lib/navigation";
import styles from "./page.module.css";

export const metadata = { title: "Profile | Sadaqua" };

// Figma: Giver Profile
export default async function GiverProfilePage() {
  const profile = await getGiverProfile();
  const phone = formatPhone(profile.countryCode, profile.phone);

  const sections = [
    {
      title: "Personal information",
      rows: [
        {
          icon: RiUserLine,
          label: "Name",
          text: profile.fullName,
          href: "/giver/profile/edit",
        },
        {
          icon: RiMailLine,
          label: "Email",
          text: profile.email,
          href: "/giver/profile/edit",
        },
        {
          icon: RiPhoneLine,
          label: "Phone",
          text: phone,
          href: "/giver/profile/edit",
        },
      ],
      action: { label: "Edit details", href: "/giver/profile/edit" },
    },
    {
      title: "My giving",
      rows: [
        {
          icon: RiHistoryLine,
          label: "Giving history",
          text: "View all your donations",
          href: "/giver/giving-history",
        },
      ],
    },
    {
      title: "Saved causes",
      rows: [
        {
          icon: RiBookmarkLine,
          label: "Causes you’ve saved",
          text: "View all your saved causes",
          href: "/giver/saved-causes",
        },
      ],
    },
    {
      title: "Support",
      rows: [
        {
          icon: RiHeadphoneLine,
          label: "Help & support",
          text: "Get help or contact us",
          href: "/giver/support",
        },
      ],
    },
  ];

  return (
    <MobileScreen top="flush" className={styles.screen}>
      <MobileHeader
        homeHref="/giver"
        profileHref="/giver/profile"
        menuItems={GIVER_MENU}
        showProfile={false}
      />

      {/* Photo, name and email */}
      <section className={styles.person} aria-label="Your account">
        <Link
          href="/giver/profile/edit"
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
          className={styles.card}
          aria-label={section.title}
        >
          <h2 className={styles.cardTitle}>{section.title}</h2>
          <ul className={styles.rows}>
            {section.rows.map(({ icon: Icon, label, text, href }) => (
              <li key={label}>
                <Link href={href} className={styles.row}>
                  <Icon className={styles.rowIcon} aria-hidden="true" />
                  <span className={styles.rowText}>
                    <span className={styles.rowLabel}>{label}</span>
                    <span className={styles.rowValue}>{text}</span>
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
        className={styles.logout}
      >
        Log out
      </Button>
    </MobileScreen>
  );
}
