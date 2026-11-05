"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AdminDrawer from "@/components/admin/AdminDrawer";
import AdminStatus from "@/components/admin/AdminStatus";
import UserPhoto from "@/components/admin/UserPhoto";
import { setUserStatus, USER_ROLES, USER_STATUS } from "@/lib/api/admin/users";
import { formatDate } from "@/lib/format";
import styles from "./UserManageDrawer.module.css";

/**
 * "Manage user" side panel (Figma: Manage user): photo, name, role, status,
 * account details, access, and Deactivate user (Activate user for a
 * suspended user, which the Figma doesn't show).
 */
export default function UserManageDrawer({ user, closeHref }) {
  const router = useRouter();
  const [status, setStatus] = useState(user?.status);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);

  if (!user) {
    return (
      <AdminDrawer
        title={<span className={styles.title}>Manage user</span>}
        closeHref={closeHref}
      >
        <div className={styles.body}>
          <p className={styles.missing}>We couldn&apos;t find this user.</p>
        </div>
      </AdminDrawer>
    );
  }

  const role = USER_ROLES[user.role];
  const suspended = status === "suspended";

  async function toggle() {
    setBusy(true);
    setError(null);
    try {
      const next = suspended ? "active" : "suspended";
      await setUserStatus(user.id, next);
      setStatus(next);
      router.refresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <AdminDrawer
      title={<span className={styles.title}>Manage user</span>}
      closeHref={closeHref}
    >
      <div className={styles.body}>
        <div className={styles.person}>
          <UserPhoto src={user.photo} name={user.fullName} size={96} />
          <div>
            <p className={styles.name}>{user.fullName}</p>
            <p className={styles.role}>{role.label}</p>
            <AdminStatus
              tone={suspended ? "red" : "green"}
              className={styles.badge}
            >
              {USER_STATUS[status].label}
            </AdminStatus>
          </div>
        </div>

        <section className={styles.section} aria-labelledby="account-details">
          <h3 id="account-details" className={styles.heading}>
            Account details
          </h3>
          <dl className={styles.rows}>
            <Row label="Name">{user.fullName}</Row>
            <Row label="Email">{user.email}</Row>
            <Row label="Phone">{user.phone}</Row>
            <Row label="Role">{role.detail}</Row>
            <Row label="Date added">{formatDate(user.dateAdded)}</Row>
            <Row label="Last active">{user.lastActiveDetail}</Row>
            <Row label="Account status">
              <AdminStatus tone="green" className={styles.completed}>
                Completed
              </AdminStatus>
            </Row>
          </dl>
        </section>

        <section
          className={`${styles.section} ${styles.access}`}
          aria-labelledby="access"
        >
          <h3 id="access" className={styles.heading}>
            Access
          </h3>
          <dl className={styles.rows}>
            <Row label="Role">{role.detail}</Row>
          </dl>
        </section>

        {error && (
          <p className={styles.error} role="alert">
            {error}
          </p>
        )}

        <button
          type="button"
          onClick={toggle}
          disabled={busy}
          className={`${styles.action} ${suspended ? styles.activate : ""}`}
        >
          {busy
            ? suspended
              ? "Activating..."
              : "Deactivating..."
            : suspended
              ? "Activate user"
              : "Deactivate user"}
        </button>
      </div>
    </AdminDrawer>
  );
}

function Row({ label, children }) {
  return (
    <div className={styles.row}>
      <dt>{label}</dt>
      <dd>{children}</dd>
    </div>
  );
}
