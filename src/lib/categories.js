// The six cause categories, with the icon and colours each one uses in Figma.
// Icons come from the react-icons package (Tabler and Phosphor sets).

import { TbHeartbeat, TbSchool, TbHome2, TbUrgent, TbJacket } from "react-icons/tb";
import { PiBowlFood } from "react-icons/pi";

export const CATEGORIES = [
  { key: "healthcare", label: "Healthcare", Icon: TbHeartbeat, color: "var(--color-primary)", background: "var(--color-primary-100)" },
  { key: "feeding", label: "Feeding", Icon: PiBowlFood, color: "var(--color-error)", background: "#f7e2d9" },
  { key: "education", label: "Education", Icon: TbSchool, color: "var(--color-accent)", background: "#fcefd8" },
  { key: "housing", label: "Housing", Icon: TbHome2, color: "var(--color-urgent)", background: "var(--color-brand-cream)" },
  { key: "emergency", label: "Emergency", Icon: TbUrgent, color: "var(--color-secondary)", background: "#e7e8db" },
  { key: "clothing", label: "Clothing", Icon: TbJacket, color: "var(--color-ink)", background: "var(--color-border)" },
];

export function getCategory(key) {
  return CATEGORIES.find((category) => category.key === key);
}
