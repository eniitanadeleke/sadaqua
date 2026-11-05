import Link from "next/link";
import {
  RiArrowRightLine,
  RiCheckboxCircleLine,
  RiErrorWarningLine,
  RiFileTextLine,
  RiTimeLine,
} from "react-icons/ri";
import AdminFilterBar from "@/components/admin/AdminFilterBar";
import AdminPageHeading from "@/components/admin/AdminPageHeading";
import AdminPagination from "@/components/admin/AdminPagination";
import AdminStats from "@/components/admin/AdminStats";
import AdminStatus from "@/components/admin/AdminStatus";
import AdminTable from "@/components/admin/AdminTable";
import UserAddModal from "@/components/admin/UserAddModal";
import UserInvitedModal from "@/components/admin/UserInvitedModal";
import UserManageDrawer from "@/components/admin/UserManageDrawer";
import UserPhoto from "@/components/admin/UserPhoto";
import { isAdminDemo } from "@/lib/api/admin/demo";
import {
  getUser,
  getUsers,
  getUserStats,
  USER_ROLES,
  USER_STATUS,
} from "@/lib/api/admin/users";
import styles from "./page.module.css";

export const metadata = { title: "Users | Sadaqua admin" };

// Column widths measured from the Figma "Users" frame
const COLUMNS = [
  { key: "user", label: "User", width: 203 },
  { key: "email", label: "Email", width: 233 },
  { key: "phone", label: "Phone", width: 161 },
  { key: "role", label: "Role", width: 166 },
  { key: "status", label: "Status", width: 146 },
  { key: "lastActive", label: "Last active", width: 109 },
  { key: "action", label: "Action", width: 118 },
];

/**
 * Users: everyone with access to the organisation workspace.
 * ?add=1 opens "Add organisation user", ?invited=<name> shows "Invitation
 * sent", ?manage=<id> opens the Manage user panel.
 */
export default async function UsersPage({ searchParams }) {
  const params = await searchParams;
  const demo = await isAdminDemo(params);
  const filters = {
    q: params.q ?? "",
    status: params.status ?? "all",
    role: params.role ?? "all",
    page: params.page ?? 1,
  };
  const [stats, list, managed] = await Promise.all([
    getUserStats({ demo }),
    getUsers(filters, { demo }),
    params.manage ? getUser(params.manage, { demo }) : null,
  ]);

  // Keeps the current filters when a panel opens or closes
  const listQuery = new URLSearchParams(
    Object.entries({ ...filters, page: String(filters.page) }).filter(
      ([, value]) => value && value !== "all" && value !== "1",
    ),
  );
  const listHref = `/admin/users${listQuery.size ? `?${listQuery}` : ""}`;
  const withParam = (key, value) => {
    const query = new URLSearchParams(listQuery);
    query.set(key, value);
    return `/admin/users?${query}`;
  };

  const rows = list.items.map((user) => ({
    id: user.id,
    user: (
      <span className={styles.person}>
        <UserPhoto src={user.photo} name={user.fullName} />
        <span className={styles.name}>{user.fullName}</span>
      </span>
    ),
    email: user.email,
    phone: user.phone,
    role: USER_ROLES[user.role].label,
    status: (
      <AdminStatus
        tone={user.status === "active" ? "green" : "red"}
        className={styles.status}
      >
        {USER_STATUS[user.status].label}
      </AdminStatus>
    ),
    lastActive: user.lastActive,
    action: (
      <Link
        href={withParam("manage", user.id)}
        scroll={false}
        className={styles.manage}
      >
        Manage <RiArrowRightLine aria-hidden="true" />
      </Link>
    ),
  }));

  const hrefFor = (page) => withParam("page", String(page));

  return (
    <>
      <AdminPageHeading
        title="Users"
        subtitle="Manage people who have access to the organisation workspace."
        actions={
          <Link
            href={withParam("add", "1")}
            scroll={false}
            className={styles.add}
          >
            <span className={styles.plus} aria-hidden="true">
              +
            </span>{" "}
            Add user
          </Link>
        }
      />

      <AdminStats
        items={[
          {
            label: "Total users",
            value: stats.total,
            icon: RiFileTextLine,
            tone: "deep",
          },
          {
            label: "Verification officers",
            value: stats.officers,
            icon: RiErrorWarningLine,
            tone: "orange",
          },
          {
            label: "Admins",
            value: stats.admins,
            icon: RiCheckboxCircleLine,
            tone: "green",
          },
          {
            label: "Active users",
            value: stats.active,
            icon: RiTimeLine,
            tone: "gold",
          },
        ]}
      />

      <AdminFilterBar
        placeholder="Search request by name or email..."
        q={filters.q}
        filters={[
          {
            name: "status",
            label: "Status",
            value: filters.status,
            options: [
              { value: "all", label: "All statuses" },
              ...Object.entries(USER_STATUS).map(([value, s]) => ({
                value,
                label: s.label,
              })),
            ],
          },
          {
            name: "role",
            label: "Role",
            value: filters.role,
            options: [
              { value: "all", label: "All roles" },
              ...Object.entries(USER_ROLES).map(([value, r]) => ({
                value,
                label: r.label,
              })),
            ],
          },
        ]}
      />

      <AdminTable
        caption="Organisation users"
        columns={COLUMNS}
        rows={rows}
        className={styles.table}
        empty={
          <p className={styles.empty}>
            {filters.q || filters.status !== "all" || filters.role !== "all"
              ? "No users match your search."
              : "No users yet. Add someone to give them access to the workspace."}
          </p>
        }
      />

      <AdminPagination
        page={list.page}
        pageSize={list.pageSize}
        total={list.total}
        hrefFor={hrefFor}
      />

      {params.add && <UserAddModal closeHref={listHref} />}
      {params.invited && (
        <UserInvitedModal name={params.invited} closeHref={listHref} />
      )}
      {params.manage && (
        <UserManageDrawer user={managed} closeHref={listHref} demo={demo} />
      )}
    </>
  );
}
