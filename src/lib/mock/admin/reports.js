// Sample numbers for the admin Reports page (Figma: Reports, Share Reports).
// Shown only with ?preview=demo. The chart values are picked so the points and
// bars land where the designer drew them.

export const REPORT_SAMPLE_RANGE = { from: "2026-09-01", to: "2026-09-07" };

export const REPORT_SAMPLE = {
  stats: {
    users: { value: 120, change: 8.2 },
    donations: { value: 508, change: 8.2 },
    causes: { value: 13, change: 8.2 },
    disbursements: { value: 17, change: 8.2 },
  },
  // Previous period the change is measured against (Figma: "from 1 Aug - 7 Aug")
  compareRange: { from: "2026-08-01", to: "2026-08-07" },

  users: {
    newCount: 120,
    total: 1820,
    labels: [
      "1/09/26",
      "2/09/26",
      "3/09/26",
      "4/09/26",
      "5/09/26",
      "6/09/26",
      "7/09/26",
    ],
    values: [406, 1621, 3624, 966, 2627, 6372, 10000],
  },
  donations: {
    newCount: 508,
    amount: 12450000,
    labels: [
      "1/09/26",
      "2/09/26",
      "3/09/26",
      "4/09/26",
      "5/09/26",
      "6/09/26",
      "7/09/26",
    ],
    values: [6310000, 10000000, 28400000, 901000, 901000, 20600000, 3160000],
  },
  causes: {
    newCount: 13,
    active: 9,
    fulfilled: 4,
    labels: [
      "1/09/26",
      "2/09/26",
      "3/09/26",
      "4/09/26",
      "5/09/26",
      "6/09/26",
      "7/09/26",
    ],
    values: [6310000, 10000000, 28400000, 901000, 901000, 20600000, 3160000],
  },
  disbursements: {
    newCount: 17,
    amount: 2450000,
    labels: [
      "1/09/26",
      "7/09/26",
      "14/09/26",
      "21/09/26",
      "28/09/26",
      "5/10/26",
      "12/10/26",
    ],
    values: [61700, 615600, 870550, 461300, 757900, 2238700, 10000000],
  },
};
