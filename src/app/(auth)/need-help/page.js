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
        Already have an account?{" "}
        <Link href="/login?role=recipient">Log in</Link>
      </p>
    </MobileScreen>
  );
}

// Both icons are traced from the Figma file (32 x 32, filled in the current colour)
function LockIcon() {
  return (
    <svg viewBox="0 0 32 32" fill="currentColor">
      <path d="M8 10.67L8 9.33C8 7.21 8.84 5.18 10.34 3.68C11.84 2.18 13.88 1.33 16 1.33C18.12 1.33 20.16 2.18 21.66 3.68C23.16 5.18 24 7.21 24 9.33L24 10.67L26.67 10.67C27.02 10.67 27.36 10.81 27.61 11.06C27.86 11.31 28 11.65 28 12L28 28C28 28.35 27.86 28.69 27.61 28.94C27.36 29.19 27.02 29.33 26.67 29.33L5.33 29.33C4.98 29.33 4.64 29.19 4.39 28.94C4.14 28.69 4 28.35 4 28L4 12C4 11.65 4.14 11.31 4.39 11.06C4.64 10.81 4.98 10.67 5.33 10.67L8 10.67M25.33 13.33L6.67 13.33L6.67 26.67L25.33 26.67L25.33 13.33M14.67 20.98C14.16 20.68 13.76 20.23 13.54 19.69C13.31 19.14 13.27 18.54 13.42 17.98C13.58 17.41 13.91 16.91 14.38 16.55C14.84 16.19 15.41 16 16 16C16.59 16 17.16 16.19 17.62 16.55C18.09 16.91 18.42 17.41 18.58 17.98C18.73 18.54 18.69 19.14 18.46 19.69C18.24 20.23 17.84 20.68 17.33 20.98L17.33 24L14.67 24L14.67 20.98M10.67 10.67L21.33 10.67L21.33 9.33C21.33 7.92 20.77 6.56 19.77 5.56C18.77 4.56 17.41 4 16 4C14.59 4 13.23 4.56 12.23 5.56C11.23 6.56 10.67 7.92 10.67 9.33L10.67 10.67" />
    </svg>
  );
}

function ShieldCheckIcon() {
  return (
    <svg viewBox="0 0 32 32" fill="currentColor">
      <path d="M16 1.33L26.96 3.77C27.57 3.9 28 4.44 28 5.07L28 18.39C28 21.06 26.66 23.56 24.44 25.04L16 30.67L7.56 25.04C5.34 23.56 4 21.06 4 18.39L4 5.07C4 4.44 4.43 3.9 5.04 3.77L16 1.33M16 4.07L6.67 6.14L6.67 18.39C6.67 20.17 7.56 21.83 9.04 22.82L16 27.46L22.96 22.82C24.44 21.83 25.33 20.17 25.33 18.39L25.33 6.14L16 4.07L16 4.07M21.94 10.96L23.82 12.85L15.34 21.33L9.68 15.68L11.56 13.79L15.34 17.56L21.94 10.96L21.94 10.96" />
    </svg>
  );
}
