// Navigation for the logged-in giver screens.

/**
 * The navigation screens use unless they choose their own. Figma has both:
 *   "menu"   - the hamburger menu at the top right (Figma: Menu details),
 *              used on the inner screens
 *   "bottom" - the bar along the bottom (Figma: Giver Home-1, Bottom Nav);
 *              Giver Home asks for it directly (designer confirmed)
 * Change this one word to put every screen on the bottom bar.
 */
export const NAV_STYLE = "menu";

// The same five links feed the menu and the bottom bar.
// icon: which picture the bottom bar shows (see components/layout/BottomNav).
export const GIVER_MENU = [
  { label: "Home", href: "/giver", icon: "home" },
  { label: "Causes", href: "/giver/causes", icon: "causes" },
  { label: "My Giving", href: "/giver/giving-history", icon: "giving" },
  { label: "Profile", href: "/giver/profile", icon: "profile" },
  { label: "Support", href: "/giver/support", icon: "support" },
];
