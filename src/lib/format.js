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
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  const [year, month, day] = isoDate.split("-").map(Number);
  return `${day} ${months[month - 1]} ${year}`;
}

/** "2026-08-18T10:30" -> "18 Aug 2026, 10:30 AM" (Figma: "Last updated") */
export function formatDateTime(isoDateTime) {
  const [date, time = "00:00"] = isoDateTime.split("T");
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const [year, month, day] = date.split("-").map(Number);
  const [hours, minutes] = time.split(":").map(Number);
  const suffix = hours >= 12 ? "PM" : "AM";
  const hour12 = hours % 12 || 12;
  return `${day} ${months[month - 1]} ${year}, ${hour12}:${String(minutes).padStart(2, "0")} ${suffix}`;
}

/** "2026-08-27" -> "27 Aug 2026" (short month, as on the Cause details screen) */
export function formatShortDate(isoDate) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const [year, month, day] = isoDate.split("-").map(Number);
  return `${day} ${months[month - 1]} ${year}`;
}

/** "2026-10-27" -> "1 day ago", "today", "3 days ago", or the date for older ones */
export function formatDaysAgo(isoDate, now = new Date()) {
  const [year, month, day] = isoDate.split("-").map(Number);
  const then = Date.UTC(year, month - 1, day);
  const today = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
  const days = Math.round((today - then) / 86400000);
  if (days <= 0) return "today";
  if (days === 1) return "1 day ago";
  if (days < 30) return `${days} days ago`;
  return formatShortDate(isoDate);
}
