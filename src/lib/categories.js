// The cause categories, with the icon and colours each one uses in Figma.
// onHome: shown as a coloured pill on Giver Home (the filter sheet shows all of them).
// Icons come from the react-icons package (Tabler and Phosphor sets).

import { TbBriefcase, TbDots, TbHeartbeat, TbHome2, TbJacket, TbSchool, TbUrgent } from "react-icons/tb";
import { PiBowlFood } from "react-icons/pi";

export const CATEGORIES = [
  { key: "healthcare", onHome: true, label: "Healthcare", Icon: TbHeartbeat, color: "var(--color-primary)", background: "var(--color-primary-100)" },
  { key: "feeding", onHome: true, label: "Feeding", Icon: PiBowlFood, color: "var(--color-error)", background: "#f7e2d9" },
  { key: "education", onHome: true, label: "Education", Icon: TbSchool, color: "var(--color-accent)", background: "#fcefd8" },
  { key: "housing", onHome: true, label: "Housing", Icon: TbHome2, color: "var(--color-urgent)", background: "var(--color-brand-cream)" },
  { key: "emergency", onHome: true, label: "Emergency", Icon: TbUrgent, color: "var(--color-secondary)", background: "#e7e8db" },
  { key: "clothing", onHome: true, label: "Clothing", Icon: TbJacket, color: "var(--color-ink)", background: "var(--color-border)" },
  { key: "business", onHome: false, label: "Business", Icon: TbBriefcase, color: "var(--color-secondary)", background: "var(--color-secondary-100)" },
  { key: "others", onHome: false, label: "Others", Icon: TbDots, color: "var(--color-warm-grey)", background: "var(--color-border)" },
];

export function getCategory(key) {
  return CATEGORIES.find((category) => category.key === key);
}
