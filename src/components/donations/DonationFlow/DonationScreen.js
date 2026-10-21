import BackHeader from "@/components/layout/BackHeader";
import MobileHeader from "@/components/layout/MobileHeader";
import MobileScreen from "@/components/layout/MobileScreen";
import { GIVER_MENU } from "@/lib/navigation";
import styles from "./DonationFlow.module.css";

/**
 * The frame of every donation screen: app header, "<- Give now" row,
 * then the green heading and grey subtitle (Figma: Donation screens).
 * heading/subtitle can be left out (the loading screen draws them as grey bars).
 */
export default function DonationScreen({
  backTitle,
  backHref,
  heading,
  subtitle,
  children,
}) {
  return (
    <MobileScreen top="flush">
      <MobileHeader
        homeHref="/giver"
        profileHref="/giver/profile"
        menuItems={GIVER_MENU}
      />
      <BackHeader
        title={backTitle}
        backHref={backHref}
        className={styles.backRow}
      />
      {heading && <h2 className={styles.heading}>{heading}</h2>}
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      {children}
    </MobileScreen>
  );
}
