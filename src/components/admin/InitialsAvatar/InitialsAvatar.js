import styles from "./InitialsAvatar.module.css";

const TONES = ["neutral", "gold", "sage", "orange", "red"];

/** "Amina Musa" -> "AM" */
export function initialsOf(name = "") {
  const parts = name.trim().split(/\s+/);
  return ((parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? "")).toUpperCase();
}

/**
 * Round 40px badge with someone's initials (Figma: request queue).
 * tone: "neutral" | "gold" | "sage" | "orange" | "red"; if left out, one is
 * picked from the name so the same person always gets the same colour.
 */
export default function InitialsAvatar({
  name,
  tone,
  size = 40,
  className = "",
}) {
  const picked =
    tone ??
    TONES[
      [...name].reduce((sum, c) => sum + c.charCodeAt(0), 0) % TONES.length
    ];
  return (
    <span
      className={`${styles.avatar} ${styles[picked]} ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      {initialsOf(name)}
    </span>
  );
}
