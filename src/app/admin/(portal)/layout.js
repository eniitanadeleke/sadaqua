import AdminHeader from "@/components/layout/AdminHeader";
import AdminSidebar from "@/components/layout/AdminSidebar";
import { getSignedInAdmin } from "@/lib/api/admin/session";
import styles from "./layout.module.css";

export const metadata = { title: "Admin | Sadaqua" };

/** Every admin page: side menu on the left, top bar, then the page. */
export default async function AdminPortalLayout({ children }) {
  const admin = await getSignedInAdmin();
  return (
    <div className={styles.portal}>
      <AdminSidebar />
      <div className={styles.column}>
        <AdminHeader admin={admin} />
        <main className={styles.main}>{children}</main>
      </div>
    </div>
  );
}
