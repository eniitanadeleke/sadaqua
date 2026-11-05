// Sample help requests for the admin side (Figma: Verification Request Queue,
// Request Review & Verification). Shown only with ?preview=demo.

const FIRST = [
  { name: "Amina Musa", category: "healthcare", status: "submitted" },
  { name: "Ahmed Omar", category: "education", status: "under_review" },
  { name: "Zainab Illiya", category: "feeding", status: "approved" },
  { name: "Kabir Ibrahim", category: "housing", status: "needs_changes" },
  { name: "Bashir Doma", category: "emergency", status: "approved" },
  { name: "Aminu Muhammed", category: "business", status: "rejected" },
];

const MORE_NAMES = [
  "Fatima Sani",
  "Musa Bello",
  "Hauwa Yusuf",
  "Ibrahim Lawal",
  "Halima Garba",
  "Usman Aliyu",
  "Maryam Abubakar",
  "Sani Danjuma",
];
const CATEGORY_CYCLE = [
  "healthcare",
  "education",
  "feeding",
  "housing",
  "emergency",
  "business",
];
const STATUS_CYCLE = [
  "submitted",
  "under_review",
  "needs_changes",
  "approved",
  "submitted",
  "rejected",
];

// 50 requests: the six from the Figma first (SAD-0029 is the one on the
// review screen), then more of the same shape
export const ADMIN_REQUESTS = Array.from({ length: 50 }, (_, i) => {
  const base = FIRST[i] ?? {
    name: MORE_NAMES[i % MORE_NAMES.length],
    category: CATEGORY_CYCLE[i % CATEGORY_CYCLE.length],
    status: STATUS_CYCLE[i % STATUS_CYCLE.length],
  };
  const day = 16 - Math.floor(i / 6);
  return {
    id: `SAD-${String(29 + i).padStart(4, "0")}`,
    reference: `SAD-${String(29 + i).padStart(4, "0")}`,
    applicant: base.name,
    category: base.category,
    location: "Abuja, FCT",
    amountNeeded: 300000,
    urgency: i % 2 === 0 ? "urgent" : "normal",
    submittedAt: `2026-09-${String(Math.max(day, 1)).padStart(2, "0")}T10:24`,
    updatedAt: "2026-09-17T14:12",
    status: base.status,
    description:
      "I need help to pay for my bone marrow surgery, I’ve been diagnosed with leukemia and the doctors advises immediate surgery.",
    document: {
      name: "medical_report.pdf",
      image: "/images/sample-medical-report.webp",
    },
    checks: {
      identity: true,
      phone: true,
      location: true,
      document: true,
      genuine: false,
    },
    outcome: "verified",
    notes:
      "The identity details and supporting document are consistent. The phone number is active and the location matches the address on the medical report. The request appears genuine and meets Sadaqua criteria.",
  };
});

// What the publish page starts from (Figma: Publish Approved Cause); the
// admin can change all of it before publishing.
export function samplePublishDraft(request) {
  const first = request.applicant.split(" ")[0];
  return {
    title: `Help ${first} beat Leukemia`,
    story: `${first} is a 32 year old mother of three living in Abuja, FCT. She is currently battling Leukemia and needs support for her treatment and medication. She has exhausted her savings and cannot afford the cost on her own`,
    image: "/images/causes/leukemia.webp",
    nameDisplay: "first",
  };
}

export const ADMIN_REQUEST_STATS = {
  new: 16,
  underReview: 18,
  needsInfo: 8,
  approved: 36,
};
