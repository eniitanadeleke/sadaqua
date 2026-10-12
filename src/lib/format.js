// Small helpers for showing numbers the way the Figma designs do.

const NAIRA = "\u20A6"; // the naira sign

/** 45000 -> "N45,000" (with the naira sign) */
export function formatNaira(amount) {
  return NAIRA + Math.round(amount).toLocaleString("en-NG");
}

/** Short form for tight spaces: 14500000 -> "N14.5m", 16000000 -> "N16m", 80000 -> "N80,000" */
export function formatNairaShort(amount) {
  if (amount >= 1000000) {
    const millions = Math.round((amount / 1000000) * 10) / 10;
    return `${NAIRA}${millions}m`;
  }
  return formatNaira(amount);
}

/** How much of the goal is raised, 0 to 100, rounded down so we never overstate it */
export function percentRaised(raised, goal) {
  if (!goal) return 0;
  return Math.min(100, Math.floor((raised / goal) * 100));
}

/** "2026-09-01" -> "1 Sept 2026" (the month style used in the designs) */
export function formatDate(isoDate) {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
  const [year, month, day] = isoDate.split("-").map(Number);
  return `${day} ${months[month - 1]} ${year}`;
}
