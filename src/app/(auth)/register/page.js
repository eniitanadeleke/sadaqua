import { redirect } from "next/navigation";
import AuthHeader from "@/components/auth/AuthHeader";
import RegisterForm from "@/components/auth/RegisterForm";
import MobileScreen from "@/components/layout/MobileScreen";
import styles from "./page.module.css";

export const metadata = { title: "Create your account | Sadaqua" };

// What changes on this page depending on who is signing up
const BY_ROLE = {
  giver: {
    subtitle: "Join Sadaqua and make a difference in someone's time of need.",
    backHref: "/",
  },
  recipient: {
    subtitle: "Join Sadaqua and receive help in times of need, with dignity.",
    backHref: "/need-help",
  },
};

// Server component: reads ?role= from the URL before the page is sent.
export default async function RegisterPage({ searchParams }) {
  const { role } = await searchParams;

  // No valid role means the person skipped the Welcome screen: send them there.
  if (!BY_ROLE[role]) redirect("/");

  return (
    <MobileScreen top="compact">
      <AuthHeader backHref={BY_ROLE[role].backHref} />

      <h1 className={styles.title}>Create your account</h1>
      <p className={styles.subtitle}>{BY_ROLE[role].subtitle}</p>

      <RegisterForm role={role} />
    </MobileScreen>
  );
}
