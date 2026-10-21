import Link from "next/link";
import { RiUserFill } from "react-icons/ri";
import Logo from "@/components/ui/Logo";
import BottomNav from "@/components/layout/BottomNav";
import MobileMenu from "@/components/layout/MobileMenu";
import { NAV_STYLE } from "@/lib/navigation";
import styles from "./MobileHeader.module.css";

/**
 * Top bar of the logged-in mobile screens: small logo on the left,
 * profile button and menu on the right (Figma: Giver Home).
 *
 * homeHref:    where the logo goes
 * profileHref: where the person button goes
 * menuItems:   [{ label, href, icon }] for the menu or the bottom bar
 *
 * nav:         "menu" (hamburger) | "bottom" (bar along the bottom).
 *              Defaults to NAV_STYLE in lib/navigation.js; a screen can choose
 *              its own (Giver Home uses the bottom bar, as in Figma Giver Home-1).
 *              With the bottom bar, the profile button moves to the right edge.
 */
export default function MobileHeader({ homeHref, profileHref, menuItems, nav = NAV_STYLE }) {
  return (
    <header className={styles.header}>
      <Link href={homeHref} aria-label="Sadaqua home">
        <Logo size="sm" />
      </Link>

      <div className={styles.actions}>
        <Link href={profileHref} className={styles.avatar} aria-label="Your profile">
          <RiUserFill aria-hidden="true" />
        </Link>
        {nav === "menu" && <MobileMenu items={menuItems} />}
      </div>

      {nav === "bottom" && <BottomNav items={menuItems} />}
    </header>
  );
}
