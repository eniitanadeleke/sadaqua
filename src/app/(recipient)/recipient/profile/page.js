import {
  RiBookmarkLine,
  RiFileTextLine,
  RiHeadphoneLine,
  RiMailLine,
  RiNotification3Line,
  RiPhoneLine,
  RiUserLine,
} from "react-icons/ri";
import MobileHeader from "@/components/layout/MobileHeader";
import MobileScreen from "@/components/layout/MobileScreen";
import ProfileView from "@/components/profile/ProfileView";
import { getRecipientProfile } from "@/lib/api/recipient";
import { formatPhone } from "@/lib/format";
import { getNameDisplayLabel } from "@/lib/nameDisplay";
import { RECIPIENT_MENU } from "@/lib/navigation";
import styles from "./page.module.css";

export const metadata = { title: "Profile | Sadaqua" };

// Figma: Profile (accessible by recipient users)
export default async function RecipientProfilePage() {
  const profile = await getRecipientProfile();
  const phone = formatPhone(profile.countryCode, profile.phone);
  const nameDisplay = getNameDisplayLabel(profile.nameDisplay);
  const edit = "/recipient/profile/edit";

  const sections = [
    {
      title: "Personal information",
      rows: [
        { icon: RiUserLine, label: "Name", text: profile.fullName, href: edit },
        { icon: RiMailLine, label: "Email", text: profile.email, href: edit },
        { icon: RiPhoneLine, label: "Phone", text: phone, href: edit },
      ],
      action: { label: "Edit details", href: edit },
    },
    {
      title: "Your account",
      spacious: true,
      rows: [
        {
          icon: RiFileTextLine,
          label: "My request",
          text: "Track your help requests",
          href: "/recipient/requests",
        },
        {
          icon: RiNotification3Line,
          label: "Notification",
          text: "Manage your notifications",
          href: "/recipient/notifications",
        },
      ],
    },
    {
      title: "Privacy & dignity",
      rows: [
        {
          icon: RiBookmarkLine,
          label: "Name display",
          text: nameDisplay,
          href: `${edit}#name-display`,
          strong: true,
        },
      ],
    },
    {
      title: "Support",
      closer: true,
      rows: [
        {
          icon: RiHeadphoneLine,
          label: "Help & support",
          text: "Get help or contact us",
          href: "/recipient/support",
        },
      ],
    },
  ];

  return (
    <MobileScreen top="flush" className={styles.screen}>
      <MobileHeader
        homeHref="/recipient"
        profileHref="/recipient/profile"
        menuItems={RECIPIENT_MENU}
        showProfile={false}
      />
      <ProfileView
        profile={profile}
        editHref={edit}
        sections={sections}
        logoutClassName={styles.logout}
      />
    </MobileScreen>
  );
}
