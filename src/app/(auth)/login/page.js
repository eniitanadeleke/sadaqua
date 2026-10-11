import AuthHeader from "@/components/auth/AuthHeader";
import LoginForm from "@/components/auth/LoginForm";
import MobileScreen from "@/components/layout/MobileScreen";
import styles from "./page.module.css";

export const metadata = { title: "Log in | Sadaqua" };

const ROLES = ["giver", "recipient"];

// Server component. ?role= is optional here: one log-in page serves both roles,
// and the account itself says which role the person has.
// The role only decides where the back arrow and "Create account" go.
export default async function LoginPage({ searchParams }) {
  const { role } = await searchParams;
  const knownRole = ROLES.includes(role) ? role : undefined;
  const backHref = knownRole === "recipient" ? "/need-help" : "/";

  return (
    <MobileScreen top="compact" className={styles.screen}>
      <AuthHeader backHref={backHref} />

      <h1 className={styles.title}>Welcome back</h1>
      <p className={styles.subtitle}>Continue your journey with Sadaqua.</p>

      <LoginForm role={knownRole} />
    </MobileScreen>
  );
}
