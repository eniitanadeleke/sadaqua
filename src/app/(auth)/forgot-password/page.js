import AuthHeader from "@/components/auth/AuthHeader";
import ForgotPassword from "@/components/auth/ForgotPassword";
import MobileScreen from "@/components/layout/MobileScreen";
import styles from "./page.module.css";

export const metadata = { title: "Forgot password | Sadaqua" };

export default function ForgotPasswordPage() {
  return (
    <MobileScreen top="compact" className={styles.screen}>
      <AuthHeader backHref="/login" />
      <ForgotPassword />
    </MobileScreen>
  );
}
