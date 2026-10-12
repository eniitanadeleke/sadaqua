import AuthHeader from "@/components/auth/AuthHeader";
import MobileScreen from "@/components/layout/MobileScreen";
import StatusMessage from "@/components/ui/StatusMessage";
import styles from "./page.module.css";

export const metadata = { title: "Password reset | Sadaqua" };

export default function ResetSuccessPage() {
  return (
    <MobileScreen top="compact" className={styles.screen}>
      <AuthHeader />
      <StatusMessage
        title="Password Reset Successful"
        actionLabel="Back to Log in"
        actionHref="/login"
      >
        <p>
          Your password has been updated. You can now sign in with your new
          credentials.
        </p>
      </StatusMessage>
    </MobileScreen>
  );
}
