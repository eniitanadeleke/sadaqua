import Image from "next/image";
import Logo from "@/components/ui/Logo";
import styles from "./AdminAuthLayout.module.css";

/**
 * The frame around the admin log-in screens (Figma: Admin Log in, Admin
 * Forgot Password): white bar with the logo, the green art on the left with
 * "SADAQUA ADMIN PORTAL", and the white card (children) on the right.
 */
export default function AdminAuthLayout({ children }) {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Logo size="admin" />
      </header>

      <div className={styles.body}>
        <section className={styles.art} aria-label="Sadaqua admin portal">
          <Image
            src="/images/admin-portal-art.webp"
            alt=""
            fill
            sizes="720px"
            className={styles.artImage}
            priority
            unoptimized
          />
          <div className={styles.portal}>
            <p className={styles.portalTitle}>SADAQUA ADMIN PORTAL</p>
            <p className={styles.portalText}>For Platform Admins.</p>
          </div>
          <p className={styles.copyright}>© 2026 Sadaqua</p>
        </section>

        <main className={styles.main}>
          <div className={styles.card}>{children}</div>
        </main>
      </div>
    </div>
  );
}
