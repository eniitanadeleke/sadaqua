import EditProfileForm from "@/components/profile/EditProfileForm";
import BackHeader from "@/components/layout/BackHeader";
import MobileHeader from "@/components/layout/MobileHeader";
import MobileScreen from "@/components/layout/MobileScreen";
import { getRecipientProfile } from "@/lib/api/recipient";
import { RECIPIENT_MENU } from "@/lib/navigation";
import { saveProfile } from "./actions";
import styles from "./page.module.css";

export const metadata = { title: "Edit details | Sadaqua" };

// Figma: Edit Profile (accessible by recipient users)
export default async function EditRecipientProfilePage() {
  const profile = await getRecipientProfile();
  return (
    <MobileScreen top="flush">
      <MobileHeader
        homeHref="/recipient"
        profileHref="/recipient/profile"
        menuItems={RECIPIENT_MENU}
        showProfile={false}
      />
      <BackHeader
        title="Edit details"
        backHref="/recipient/profile"
        className={styles.backRow}
      />
      <h2 className={styles.heading}>Edit details</h2>
      <p className={styles.subtitle}>
        Update your contact information. This helps us keep you informed
      </p>
      <EditProfileForm
        profile={profile}
        saveProfile={saveProfile}
        profileHref="/recipient/profile"
        showNameDisplay
        secureText="We use your information only to communicate with you about your requests and account."
      />
    </MobileScreen>
  );
}
