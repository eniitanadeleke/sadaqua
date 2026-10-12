import AuthHeader from "@/components/auth/AuthHeader";
import ResetPasswordForm from "@/components/auth/ResetPasswordForm";
import MobileScreen from "@/components/layout/MobileScreen";
import styles from "./page.module.css";

export const metadata = { title: "Reset password | Sadaqua" };

// The person arrives here from the link in the reset email:
// /reset-password?token=...   (to test locally: /reset-password?token=demo)
export default async function ResetPasswordPage({ searchParams }) {
  const { token } = await searchParams;

  return (
    <MobileScreen top="compact" className={styles.screen}>
      {/* No back arrow on this screen in Figma */}
      <AuthHeader />

      <h1 className={styles.title}>Reset Password</h1>
      <p className={styles.subtitle}>Create a new, strong password for your account.</p>

      <ResetPasswordForm token={token} />
    </MobileScreen>
  );
}
