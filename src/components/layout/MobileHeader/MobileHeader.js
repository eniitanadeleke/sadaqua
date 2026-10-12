import Link from "next/link";
import { IoPerson } from "react-icons/io5";
import Logo from "@/components/ui/Logo";
import MobileMenu from "@/components/layout/MobileMenu";
import styles from "./MobileHeader.module.css";

/**
 * Top bar of the logged-in mobile screens: small logo on the left,
 * profile button and menu on the right (Figma: Giver Home).
 *
 * homeHref:    where the logo goes
 * profileHref: where the person button goes
 * menuItems:   [{ label, href }] for the menu
 */
export default function MobileHeader({ homeHref, profileHref, menuItems }) {
  return (
    <header className={styles.header}>
      <Link href={homeHref} aria-label="Sadaqua home">
        <Logo size="sm" />
      </Link>

      <div className={styles.actions}>
        <Link href={profileHref} className={styles.avatar} aria-label="Your profile">
          <IoPerson aria-hidden="true" />
        </Link>
        <MobileMenu items={menuItems} />
      </div>
    </header>
  );
}
