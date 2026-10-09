import Link from "next/link";
import Logo from "@/components/ui/Logo";
import styles from "./AuthHeader.module.css";

/**
 * Top of the sign up, log in and password screens:
 * a back arrow on the left and the small Sadaqua logo in the middle.
 */
export default function AuthHeader({ backHref }) {
  return (
    <header className={styles.header}>
      {backHref && (
        <Link href={backHref} className={styles.back} aria-label="Go back">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 20l1.4-1.4L7.8 13H20v-2H7.8l5.6-5.6L12 4l-8 8 8 8Z" />
          </svg>
        </Link>
      )}
      <Logo size="md" />
    </header>
  );
}
