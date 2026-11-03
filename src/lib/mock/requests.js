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
    // My request and all the request details frames say 8 Sept
    // (only Recipient Home says 2 Sept)
    submittedAt: "2026-09-08",
    urgency: "urgent",
    description:
      "I need help to pay for my bone marrow surgery, I’ve been diagnosed with leukemia and the doctors advises immediate surgery.",
    state: "Abuja FCT",
    area: "Kubwa",
    document: { name: "medical_report.pdf", size: 1468006 },
    // When each stage happened (Figma: Request Progress). The details page
    // only shows the dates of the stages the request has reached.
    history: {
      submitted: "2026-09-08",
      infoRequested: "2026-09-08",
      reviewed: "2026-09-08",
      rejected: "2026-09-08",
      verified: "2026-09-09",
      published: "2026-09-09",
      firstHelp: "2026-09-09",
      fulfilled: "2026-09-09",
    },
    received: 170000,
    infoRequest:
      "Please provide a clearer document showing the treatment details and expected cost.",
    rejectionReason:
      "We couldn't verify some of the information provided. You can contact support for more details.",
  },
  {
    id: "req-school-fees",
    title: "School fee support",
    category: "education",
    location: "Abuja, FCT",
    amount: 130000,
    status: "verified",
    submittedAt: "2026-09-02",
    urgency: "normal",
    description:
      "I need help to pay my son’s school fees for the new term so he can stay in school.",
    state: "Abuja FCT",
    area: "Gwarinpa",
    document: { name: "school_fees_invoice.pdf", size: 820000 },
    history: {
      submitted: "2026-09-02",
      reviewed: "2026-09-03",
      verified: "2026-09-04",
    },
  },
  {
    id: "req-rent",
    title: "Rent support",
    category: "housing",
    location: "Abuja, FCT",
    amount: 3000000,
    status: "needs_changes",
    submittedAt: "2026-09-02",
    urgency: "urgent",
    description:
      "My rent is due and my landlord has given me notice. I need help to pay for the year.",
    state: "Abuja FCT",
    area: "Lugbe",
    document: { name: "tenancy_notice.jpg", size: 2300000 },
    history: {
      submitted: "2026-09-02",
      infoRequested: "2026-09-03",
    },
    infoRequest:
      "Please upload your tenancy agreement showing the rent amount and your name.",
  },
];
