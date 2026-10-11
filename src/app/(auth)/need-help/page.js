import Link from "next/link";
import Button from "@/components/ui/Button";
import InfoCard from "@/components/ui/InfoCard";
import Logo from "@/components/ui/Logo";
import MobileScreen from "@/components/layout/MobileScreen";
import styles from "./page.module.css";

// "I need help" screen: reassures people asking for help before they sign up.
export default function NeedHelpPage() {
  return (
    <MobileScreen>
      <Logo size="lg" />

      <p className={styles.greeting}>Assalamu alaikum!</p>

      <h1 className={styles.headline}>
        Get the help you need,
        <br />
        with dignity.
      </h1>

      <p className={styles.intro}>
        Tell us about your need and we&apos;ll
        <br />
        guide you through the process.
      </p>

      <div className={styles.cards}>
        <InfoCard icon={<LockIcon />} title="Your information is protected">
          We only collect the information needed to review your request.
        </InfoCard>
        <InfoCard icon={<ShieldCheckIcon />} title="Every request is reviewed">
          Our verification team checks requests before they can become public
          causes.
        </InfoCard>
      </div>

      <Button href="/register?role=recipient" fullWidth className={styles.cta}>
        Request help
      </Button>

      <p className={styles.switch}>
        Already have an account? <Link href="/login?role=recipient">Log in</Link>
      </p>
    </MobileScreen>
  );
}

function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4.5" y="10.5" width="15" height="10.5" rx="1.5" />
      <path d="M8 10.5V7a4 4 0 0 1 8 0v3.5" />
      <path d="M12 14.5v2.5" />
    </svg>
  );
}

function ShieldCheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3 5 5.8v5.4c0 4.4 3 8.1 7 9.8 4-1.7 7-5.4 7-9.8V5.8L12 3Z" />
      <path d="m8.8 12 2.3 2.3 4.2-4.6" />
    </svg>
  );
}
