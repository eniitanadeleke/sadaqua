// Sample published causes for the admin side (Figma: Approved Causes,
// Cause Management). Shown only with ?preview=demo.

const ROWS = [
  {
    title: "Help Amina beat leukemia",
    category: "healthcare",
    goal: 300000,
    raised: 130000,
    status: "active",
    image: "/images/causes/leukemia.webp",
  },
  {
    title: "Help a Family with Food",
    category: "feeding",
    goal: 300000,
    raised: 300000,
    status: "fully_funded",
    image: "/images/causes/leukemia.webp",
  },
  {
    title: "School supply for Yusuf",
    category: "education",
    goal: 100000,
    raised: 55000,
    status: "active",
    image: "/images/causes/leukemia.webp",
  },
  {
    title: "Provide house for a mother",
    category: "housing",
    goal: 400000,
    raised: 210000,
    status: "active",
    image: "/images/causes/leukemia.webp",
  },
  {
    title: "Support Ibrahim's Education",
    category: "education",
    goal: 300000,
    raised: 300000,
    status: "fulfilled",
    image: "/images/causes/leukemia.webp",
  },
  {
    title: "Help Amin starts his kiosk",
    category: "business",
    goal: 300000,
    raised: 274000,
    status: "active",
    image: "/images/causes/leukemia.webp",
  },
];

const MORE = [
  {
    title: "Help Musa fight kidney disease",
    category: "healthcare",
    image: "/images/causes/kidney.webp",
  },
  {
    title: "Feed 500 families in Lokoja",
    category: "feeding",
    image: "/images/causes/food-distribution.webp",
  },
  {
    title: "Renovate a community school",
    category: "education",
    image: "/images/causes/school-renovation.webp",
  },
  {
    title: "Eid food packs for families",
    category: "feeding",
    image: "/images/causes/eid-food-packs.webp",
  },
  {
    title: "Support accident victims",
    category: "emergency",
    image: "/images/causes/accident.webp",
  },
];
const STATUS_CYCLE = [
  "active",
  "active",
  "fully_funded",
  "active",
  "fulfilled",
];

// 50 causes: the six from the Figma first ("cause-1" is the Cause Management one)
export const ADMIN_CAUSES = Array.from({ length: 50 }, (_, i) => {
  const base = ROWS[i] ?? {
    ...MORE[i % MORE.length],
    goal: 300000,
    raised: [150000, 90000, 300000, 210000, 300000][i % 5],
    status: STATUS_CYCLE[i % STATUS_CYCLE.length],
  };
  return {
    id: `cause-${i + 1}`,
    reference: `SAD-${String(29 - (i % 6)).padStart(4, "0")}`,
    location: "Abuja, FCT",
    publishedAt: "2026-09-16",
    disbursed: i === 0 ? 100000 : 0,
    ...base,
  };
});

export const ADMIN_CAUSE_STATS = {
  active: 16,
  fullyFunded: 18,
  inProgress: 8,
  fulfilled: 6,
};

// Everything the Cause Management page shows for "cause-1" (Figma: Cause Management)
export const ADMIN_CAUSE_DETAIL = {
  title: "Help Amina beat Leukemia",
  publishedLabel: "17 Sept, 2026",
  displayPreference: "First name",
  verification: "verified",
  need: "Amina is a 32 year old mother of three living in Abuja, FCT. She is currently battling Leukemia and needs support for her treatment and medication. She has exhausted her savings and cannot afford the cost on her own",
  updates: [
    {
      id: "u1",
      title: "Treatment support provided",
      date: "17 Sept, 2026",
      text: "₦100,000 has been disbursed toward the recipient’s treatment.",
      by: "Admin 1",
      image: "/images/sample-medical-report.webp",
    },
    {
      id: "u2",
      title: "Initials assessment completed",
      date: "17 Sept, 2026",
      text: "The recipient has started treatment.",
      by: "Admin 1",
      icon: "stethoscope",
    },
  ],
  disbursements: [
    {
      id: "SAD-0029",
      date: "2026-09-16",
      amount: 130000,
      purpose: "Treatment",
      status: "active",
    },
  ],
};
