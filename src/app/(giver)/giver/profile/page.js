import {
  RiBookmarkLine,
  RiHeadphoneLine,
  RiHistoryLine,
  RiMailLine,
  RiPhoneLine,
  RiUserLine,
} from "react-icons/ri";
import MobileHeader from "@/components/layout/MobileHeader";
import MobileScreen from "@/components/layout/MobileScreen";
import ProfileView from "@/components/profile/ProfileView";
import { getGiverProfile } from "@/lib/api/giver";
import { formatPhone } from "@/lib/format";
import { GIVER_MENU } from "@/lib/navigation";
import styles from "./page.module.css";

export const metadata = { title: "Profile | Sadaqua" };

// Figma: Giver Profile
export default async function GiverProfilePage() {
  const profile = await getGiverProfile();
  const phone = formatPhone(profile.countryCode, profile.phone);

  const sections = [
    {
      title: "Personal information",
      rows: [
        {
          icon: RiUserLine,
          label: "Name",
          text: profile.fullName,
          href: "/giver/profile/edit",
        },
        {
          icon: RiMailLine,
          label: "Email",
          text: profile.email,
          href: "/giver/profile/edit",
        },
        {
          icon: RiPhoneLine,
          label: "Phone",
          text: phone,
          href: "/giver/profile/edit",
        },
      ],
      action: { label: "Edit details", href: "/giver/profile/edit" },
    },
    {
      title: "My giving",
      rows: [
        {
          icon: RiHistoryLine,
          label: "Giving history",
          text: "View all your donations",
          href: "/giver/giving-history",
        },
      ],
    },
    {
      title: "Saved causes",
      rows: [
        {
          icon: RiBookmarkLine,
          label: "Causes you’ve saved",
          text: "View all your saved causes",
          href: "/giver/saved-causes",
        },
      ],
    },
    {
      title: "Support",
      rows: [
        {
          icon: RiHeadphoneLine,
          label: "Help & support",
          text: "Get help or contact us",
          href: "/giver/support",
        },
      ],
    },
  ];

  return (
    <MobileScreen top="flush" className={styles.screen}>
      <MobileHeader
        homeHref="/giver"
        profileHref="/giver/profile"
        menuItems={GIVER_MENU}
        showProfile={false}
      />
      <ProfileView
        profile={profile}
        editHref="/giver/profile/edit"
        sections={sections}
      />
    </MobileScreen>
  );
}
