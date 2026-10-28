// Sample donations until the backend is ready (Figma: Donation details).

export const GIVER_EMAIL = "johndoe@example.com";

// Newest first, as Giving history lists them.
export const DONATIONS = [
  {
    id: "SADQ-2782026-7P3Q1C",
    reference: "SADQ-2782026-7P3Q1C",
    type: "sadaqah",
    causeId: "amina-leukemia",
    amount: 100000,
    fee: 2900,
    total: 102900,
    paidAt: "2026-08-27T16:05",
    status: "pending",
    paymentStatus: "pending",
    receiptEmail: GIVER_EMAIL,
    hasNewUpdates: false,
  },
  {
    id: "SADQ-2782026-4B9T2D",
    reference: "SADQ-2782026-4B9T2D",
    type: "sadaqah",
    causeId: "ao-school-fees",
    amount: 1000000,
    fee: 29000,
    total: 1029000,
    paidAt: "2026-08-27T12:40",
    status: "completed",
    paymentStatus: "successful",
    receiptEmail: GIVER_EMAIL,
    hasNewUpdates: false,
  },
  {
    id: "SADQ-2782026-9F6R3H",
    reference: "SADQ-2782026-9F6R3H",
    type: "sadaqah",
    causeId: "feed-500-families-ramadan",
    amount: 4000000,
    fee: 116000,
    total: 4116000,
    paidAt: "2026-08-27T11:15",
    status: "completed",
    paymentStatus: "successful",
    receiptEmail: GIVER_EMAIL,
    hasNewUpdates: true,
  },
  {
    id: "SADQ-2782026-2K4A8M",
    reference: "SADQ-2782026-2K4A8M",
    type: "sadaqah",
    causeId: "amina-leukemia",
    amount: 100000,
    fee: 2900,
    total: 102900,
    paidAt: "2026-08-27T10:24",
    status: "completed",
    paymentStatus: "successful",
    receiptEmail: GIVER_EMAIL,
    hasNewUpdates: true,
  },
];

// Causes the giver saved (Figma: Saved Causes), newest first.
export const SAVED_CAUSES = [
  { causeId: "amina-leukemia", savedAt: "2026-10-27" },
  { causeId: "ao-school-fees", savedAt: "2026-10-27" },
  { causeId: "feed-500-families-lokoja", savedAt: "2026-10-20" },
];

// Impact updates per cause, newest first (Figma: Impact updates).
// icon: "heart" | "check" | "hand"
export const IMPACT_UPDATES = {
  "amina-leukemia": [
    {
      date: "2026-09-01",
      tag: "Treatment started",
      icon: "heart",
      text: "Thanks to the support received, Amina\u2019s treatment has begun. Further support is still needed to complete the remaining care.",
    },
    {
      date: "2026-08-28",
      tag: "First stage completed",
      icon: "check",
      text: "The first stage of treatment has been completed. Your support is making real progress.",
    },
    {
      date: "2026-08-21",
      tag: "Support arrangements",
      icon: "hand",
      text: "The funds received are being used to arrange the necessary treatment and medical care.",
    },
  ],
  "accident-victims-fulfilled": [
    {
      date: "2026-09-01",
      tag: "Treatment completed",
      icon: "heart",
      text: "The victims\u2019 treatment has been completed successfully. Thank you for making this possible!",
    },
    {
      date: "2026-08-28",
      tag: "Final stage completed",
      icon: "check",
      text: "The final stage of treatment was completed. The victims are now recovering well.",
    },
    {
      date: "2026-08-21",
      tag: "Further treatment provided",
      icon: "hand",
      text: "Additional treatment was provided using the funds raised. Thank you for your continued support.",
    },
  ],
};
