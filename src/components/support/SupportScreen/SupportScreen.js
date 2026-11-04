import BackHeader from "@/components/layout/BackHeader";
import MobileHeader from "@/components/layout/MobileHeader";
import MobileScreen from "@/components/layout/MobileScreen";
import { GIVER_MENU, RECIPIENT_MENU } from "@/lib/navigation";
import styles from "./SupportScreen.module.css";

const ROLES = {
  giver: { home: "/giver", profile: "/giver/profile", menu: GIVER_MENU },
  recipient: {
    home: "/recipient",
    profile: "/recipient/profile",
    menu: RECIPIENT_MENU,
  },
};

/**
 * The frame of the support screens (Figma: Help & Support, Contact us):
 * header, back row, a centred green title and a line under it.
 * role decides the menu and where Home and Profile go.
 * subtitleWidth: the width of Figma's text box, which decides the line breaks
 */
export default function SupportScreen({
  role,
  backTitle,
  backHref,
  title,
  subtitle,
  subtitleWidth = 300,
  children,
}) {
  const r = ROLES[role] ?? ROLES.giver;
  return (
    <MobileScreen top="flush" className={styles.screen}>
      <MobileHeader
        homeHref={r.home}
        profileHref={r.profile}
        menuItems={r.menu}
      />
      <BackHeader
        title={backTitle}
        backHref={backHref}
        className={styles.backRow}
      />
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.subtitle} style={{ maxWidth: subtitleWidth }}>
        {subtitle}
      </p>
      {children}
    </MobileScreen>
  );
}
