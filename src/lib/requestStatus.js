// The stages a help request goes through, with the words and colours
// each one uses in Figma (Recipient Home, My request).
// tone picks the badge colours in components/requests/RequestStatusBadge.
// note: the lines in the pale green box on the request cards.

export const REQUEST_STATUSES = {
  draft: { label: "Draft", tone: "neutral" },
  submitted: { label: "Submitted", tone: "neutral" },
  under_review: {
    label: "Under review",
    tone: "review",
    note: [
      "Our team is reviewing your request.",
      "This usually takes 2-3 working days.",
    ],
  },
  needs_changes: {
    label: "Needs changes",
    tone: "error",
    note: [
      "Additional information is needed.",
      "Please check and update your request.",
    ],
  },
  verified: {
    label: "Verified",
    tone: "success",
    note: [
      "Your request has been approved and is being prepared for publication.",
    ],
  },
  published: { label: "Published", tone: "success" },
  rejected: { label: "Rejected", tone: "error" },
};

export function getRequestStatus(key) {
  return REQUEST_STATUSES[key] ?? REQUEST_STATUSES.submitted;
}

// The tabs on My requests, in Figma's order. "Draft" only shows when the
// recipient has a draft (Figma: My request has it, No request does not).
export const REQUEST_TABS = [
  { key: "all", label: "All" },
  { key: "draft", label: "Draft" },
  { key: "submitted", label: "Submitted" },
  { key: "under_review", label: "Under review" },
  { key: "needs_changes", label: "Needs changes" },
  { key: "verified", label: "Verified" },
  { key: "rejected", label: "Rejected" },
];
