import AdminPageHeading from "@/components/admin/AdminPageHeading";
import {
  SettingsOrganisationModal,
  SettingsPasswordModal,
  SettingsProfileModal,
} from "@/components/admin/SettingsModals";
import SettingsNotifications from "@/components/admin/SettingsNotifications";
import SettingsSection, {
  SettingsContact,
  SettingsEditButton,
  SettingsIdentity,
} from "@/components/admin/SettingsSection";
import SettingsSecurity from "@/components/admin/SettingsSecurity";
import {
  getAdminAccount,
  getNotificationSettings,
  getOrganisation,
  roleLabel,
} from "@/lib/api/admin/settings";

export const metadata = { title: "Settings | Sadaqua admin" };

const CLOSE = "/admin/settings";

/**
 * Settings: organisation, the signed-in admin, email notifications and
 * security. ?edit=organisation | profile | password opens the matching pop-up.
 */
export default async function SettingsPage({ searchParams }) {
  const { edit } = await searchParams;
  const [organisation, account, notifications] = await Promise.all([
    getOrganisation(),
    getAdminAccount(),
    getNotificationSettings(),
  ]);

  return (
    <>
      <AdminPageHeading
        title="Settings"
        subtitle="Manage your organisation workspace and account preferences."
      />

      <div style={{ marginTop: 30 }}>
        <SettingsSection title="Organisation" height={198} doubleEdge>
          <SettingsIdentity
            image={organisation.logo}
            name={organisation.name}
          />
          <SettingsContact
            email={organisation.email}
            phone={organisation.phone}
            location={organisation.location}
          />
          <SettingsEditButton href="/admin/settings?edit=organisation">
            Edit organisation details
          </SettingsEditButton>
        </SettingsSection>

        <SettingsSection title="Account" height={206} doubleEdge>
          <SettingsIdentity
            image={account.photo}
            ring
            name={account.fullName}
            line={roleLabel(account.role)}
          />
          <SettingsContact
            email={account.email}
            phone={account.phone}
            location={account.location}
          />
          <SettingsEditButton href="/admin/settings?edit=profile">
            Edit profile
          </SettingsEditButton>
        </SettingsSection>

        <SettingsSection title="Notification" height={226} doubleEdge>
          <SettingsNotifications initial={notifications} />
        </SettingsSection>

        <SettingsSection title="Security" height={226}>
          <SettingsSecurity passwordHref="/admin/settings?edit=password" />
        </SettingsSection>
      </div>

      {edit === "organisation" && (
        <SettingsOrganisationModal
          organisation={organisation}
          closeHref={CLOSE}
        />
      )}
      {edit === "profile" && (
        <SettingsProfileModal account={account} closeHref={CLOSE} />
      )}
      {edit === "password" && <SettingsPasswordModal closeHref={CLOSE} />}
    </>
  );
}
