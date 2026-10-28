import EditProfileForm from "@/components/giver/EditProfileForm";
import BackHeader from "@/components/layout/BackHeader";
import MobileHeader from "@/components/layout/MobileHeader";
import MobileScreen from "@/components/layout/MobileScreen";
import { getGiverProfile } from "@/lib/api/giver";
import { GIVER_MENU } from "@/lib/navigation";
import { saveProfile } from "./actions";
import styles from "./page.module.css";

export const metadata = { title: "Edit details | Sadaqua" };

// Figma: Giver Edit Profile
export default async function EditProfilePage() {
  const profile = await getGiverProfile();
  return (
    <MobileScreen top="flush">
      <MobileHeader
        homeHref="/giver"
        profileHref="/giver/profile"
        menuItems={GIVER_MENU}
        showProfile={false}
      />
      <BackHeader
        title="Edit details"
        backHref="/giver/profile"
        className={styles.backRow}
      />
      <h2 className={styles.heading}>Edit details</h2>
      <p className={styles.subtitle}>
        Update your contact information. This helps us keep you informed
      </p>
      <EditProfileForm profile={profile} saveProfile={saveProfile} />
    </MobileScreen>
  );
}
