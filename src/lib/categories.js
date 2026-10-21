// The cause categories, with the icon and colours each one uses in Figma.
// onHome: shown as a coloured pill on Giver Home (the filter sheet shows all of them).
// Icons are Remix icons (the design system's icon set) from react-icons;
// Feeding uses the bowl drawn in Figma, which has no Remix match.

import {
  RiAlarmWarningLine,
  RiBriefcaseLine,
  RiGraduationCapLine,
  RiHeartPulseLine,
  RiHome8Line,
  RiMoreLine,
  RiShirtLine,
} from "react-icons/ri";
import FeedingIcon from "@/components/icons/FeedingIcon";

export const CATEGORIES = [
  { key: "healthcare", onHome: true, label: "Healthcare", Icon: RiHeartPulseLine, color: "var(--color-primary)", background: "var(--color-primary-100)" },
  { key: "feeding", onHome: true, label: "Feeding", Icon: FeedingIcon, color: "var(--color-error)", background: "#f7e2d9" },
  { key: "education", onHome: true, label: "Education", Icon: RiGraduationCapLine, color: "var(--color-accent)", background: "#fcefd8" },
  { key: "housing", onHome: true, label: "Housing", Icon: RiHome8Line, color: "var(--color-urgent)", background: "var(--color-brand-cream)" },
  { key: "emergency", onHome: true, label: "Emergency", Icon: RiAlarmWarningLine, color: "var(--color-secondary)", background: "#e7e8db" },
  { key: "clothing", onHome: true, label: "Clothing", Icon: RiShirtLine, color: "var(--color-ink)", background: "var(--color-border)" },
  { key: "business", onHome: false, label: "Business", Icon: RiBriefcaseLine, color: "var(--color-secondary)", background: "var(--color-secondary-100)" },
  { key: "others", onHome: false, label: "Others", Icon: RiMoreLine, color: "var(--color-warm-grey)", background: "var(--color-border)" },
];

export function getCategory(key) {
  return CATEGORIES.find((category) => category.key === key);
}
