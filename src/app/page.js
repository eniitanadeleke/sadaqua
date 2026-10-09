import Logo from "@/components/ui/Logo";
import MobileScreen from "@/components/layout/MobileScreen";
import PathCard from "@/components/onboarding/PathCard";
import styles from "./page.module.css";

// Welcome screen: the first thing everyone sees.
// The person chooses a path here, before signing up.
export default function WelcomePage() {
  return (
    <MobileScreen>
      <Logo size="lg" />

      <h1 className={styles.headline}>
        Give with purpose.
        <br />
        Receive help with dignity.
      </h1>

      <p className={styles.intro}>
        A trusted place to give and
        <br />
        ask for help in times of need.
      </p>

      <div className={styles.paths}>
        <PathCard
          href="/register?role=giver"
          title="I want to give"
          description="Find verified causes and make a contribution."
          icon="/icons/give.svg"
        />
        <PathCard
          href="/need-help"
          title="I need help"
          description="Request support and track your request."
          icon="/icons/need-help.svg"
        />
      </div>
    </MobileScreen>
  );
}
