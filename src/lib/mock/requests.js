// Sample help requests (Figma: Recipient Home, My request).
// Only shown with ?preview=demo; a new recipient has none.
// Amounts are in naira; dates are when the request was sent.

export const RECIPIENT = {
  firstName: "Ahmed",
};

export const REQUESTS = [
  {
    id: "req-medical-treatment",
    title: "Medical treatment support",
    category: "healthcare",
    location: "Abuja, FCT",
    amount: 300000,
    status: "under_review",
    // Figma's Recipient Home says 2 Sept; My request says 8 Sept (asked the designer)
    submittedAt: "2026-09-02",
    urgency: "urgent",
    description:
      "I need help to pay for my bone marrow surgery, I’ve been diagnosed with leukemia and the doctors advises immediate surgery.",
    state: "Abuja FCT",
    area: "Kubwa",
    document: { name: "medical_report.pdf", size: 1468006 },
  },
  {
    id: "req-school-fees",
    title: "School fee support",
    category: "education",
    location: "Abuja, FCT",
    amount: 130000,
    status: "verified",
    submittedAt: "2026-09-02",
  },
  {
    id: "req-rent",
    title: "Rent support",
    category: "housing",
    location: "Abuja, FCT",
    amount: 3000000,
    status: "needs_changes",
    submittedAt: "2026-09-02",
  },
];
