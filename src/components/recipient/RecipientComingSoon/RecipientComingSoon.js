import { RiTimeLine } from "react-icons/ri";
import IconEmptyState from "@/components/ui/IconEmptyState";
import BackHeader from "@/components/layout/BackHeader";
import MobileHeader from "@/components/layout/MobileHeader";
import MobileScreen from "@/components/layout/MobileScreen";
import { RECIPIENT_MENU } from "@/lib/navigation";
import styles from "./RecipientComingSoon.module.css";

/**
 * Stand-in for recipient screens that are not built yet (they come in the
 * next batches). It keeps the header and the bottom bar, so the person is
 * never stuck on a bare page.
 */
export default function RecipientComingSoon({ title, showProfile = true }) {
  return (
    <MobileScreen top="flush">
      <MobileHeader
        homeHref="/recipient"
        profileHref="/recipient/profile"
        menuItems={RECIPIENT_MENU}
        showProfile={showProfile}
      />
      <BackHeader
        title={title}
        backHref="/recipient"
        className={styles.backRow}
      />
      <IconEmptyState
        icon={<RiTimeLine className={styles.icon} />}
        title="Coming soon"
        actionLabel="Back to home"
        actionHref="/recipient"
        className={styles.empty}
      >
        <p>This part of Sadaqua is being built.</p>
      </IconEmptyState>
    </MobileScreen>
  );
}
