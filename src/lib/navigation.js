// Navigation for the logged-in giver screens.

/**
 * The navigation every logged-in screen uses. Figma has both:
 *   "bottom" - the bar along the bottom (Figma: Giver Home-1, Bottom Nav).
 *              Used on every screen (client's decision, Oct 2026).
 *   "menu"   - the hamburger menu at the top right (Figma: Menu details).
 * To go back to the hamburger on the inner screens, change this one word to "menu"
 * (Giver Home asks for the bottom bar directly, so it keeps it either way).
 */
export const NAV_STYLE = "bottom";

// The same five links feed the menu and the bottom bar.
// icon: which picture the bottom bar shows (see components/layout/BottomNav).
export const GIVER_MENU = [
  { label: "Home", href: "/giver", icon: "home" },
  { label: "Causes", href: "/giver/causes", icon: "causes" },
  { label: "My Giving", href: "/giver/giving-history", icon: "giving" },
  { label: "Profile", href: "/giver/profile", icon: "profile" },
  { label: "Support", href: "/giver/support", icon: "support" },
];
