// How a recipient's name can appear on a published request
// (Figma: Edit details - Name display; Profile - Privacy & dignity).
export const NAME_DISPLAY_OPTIONS = [
  { key: "full", label: "Full name" },
  { key: "first", label: "First name" },
  { key: "initials", label: "Initials" },
  { key: "anonymous", label: "Anonymous" },
];

export function getNameDisplayLabel(key) {
  return (
    NAME_DISPLAY_OPTIONS.find((option) => option.key === key)?.label ??
    "First name"
  );
}
