// Sample disbursements for the admin side (Figma: Disbursements,
// Disbursements details). Shown only with ?preview=demo.

const ROWS = [
  {
    cause: "Help Amina beat leukemia",
    category: "healthcare",
    amount: 130000,
    purpose: "Treatment",
    status: "completed",
  },
  {
    cause: "Help a Family with Food",
    category: "feeding",
    amount: 300000,
    purpose: "Food",
    status: "pending",
  },
  {
    cause: "School supply for Yusuf",
    category: "education",
    amount: 55000,
    purpose: "School supply",
    status: "completed",
  },
  {
    cause: "Provide house for a mother",
    category: "housing",
    amount: 210000,
    purpose: "Rent",
    status: "completed",
  },
  {
    cause: "Support Ibrahim's Education",
    category: "education",
    amount: 300000,
    purpose: "School fees",
    status: "completed",
  },
  {
    cause: "Help Amin starts his kiosk",
    category: "business",
    amount: 274000,
    purpose: "Stock purchase",
    status: "completed",
  },
];

// 50 disbursements: the six from the Figma first, then more of the same
export const ADMIN_DISBURSEMENTS = Array.from({ length: 50 }, (_, i) => {
  const base = ROWS[i % ROWS.length];
  return {
    ...base,
    reference: `SAD-${String(i < 29 ? 29 - i : 100 + i).padStart(4, "0")}`,
    location: "Abuja, FCT",
    image: "/images/causes/leukemia.webp",
    date: "2026-09-16",
    causeStatus: "active",
    recordedBy: { name: "John Doe", role: "Verification officer" },
    recipientDisplayName: "Amina",
    evidence: { name: "treatment_receipt.pdf", size: "1.4 MB" },
    note: "Funds disbursed for treatment support. Receipt provided by recipient.",
    status: i < 6 ? base.status : i % 7 === 0 ? "pending" : "completed",
  };
});

export const ADMIN_DISBURSEMENT_STATS = {
  totalDisbursed: 2450000,
  thisMonth: 680000,
  completed: 36,
  pending: 8,
};
