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
  published: {
    label: "Published",
    tone: "success",
    note: ["Your request is live. Givers can now support it."],
  },
  in_progress: {
    label: "In progress",
    tone: "success",
    note: ["Great news! Your request is receiving help."],
  },
  fulfilled: {
    label: "Fulfilled",
    tone: "success",
    note: ["Your request has been fully funded."],
  },
  rejected: {
    label: "Rejected",
    tone: "error",
    note: ["We are unable to approve your request."],
  },
};

// The coloured box at the bottom of the request card on the details page
// (Figma: My request details). tone picks its colours and icon.
export const STATUS_PANELS = {
  submitted: {
    tone: "review",
    title: "Submitted",
    lines: [
      "We have received your request.",
      "Our team will start reviewing it soon.",
    ],
  },
  under_review: {
    tone: "review",
    title: "Under review",
    lines: [
      "Our team is reviewing your request.",
      "This usually takes 2-3 working days.",
    ],
  },
  needs_changes: {
    tone: "changes",
    title: "More information needed",
    lines: [
      "Our verification team needs some additional information before they can continue.",
    ],
  },
  verified: {
    tone: "verified",
    title: "Verified",
    lines: [
      "Your request has been verified and approved.",
      "It’s ready to be published as a cause.",
    ],
  },
  published: {
    tone: "verified",
    title: "Published",
    lines: [
      "Your request is now live as a cause.",
      "We’ll let you know when help comes in.",
    ],
  },
  in_progress: {
    tone: "progress",
    title: "In progress",
    lines: [
      "Great news! Your request is receiving help.",
      "We’ll keep you updated.",
    ],
  },
  fulfilled: {
    tone: "verified",
    title: "Fulfilled",
    lines: [
      "Your request has been fully funded.",
      "Thank you to everyone who helped!",
    ],
  },
  rejected: {
    tone: "rejected",
    title: "Request not approved",
    lines: [
      "We are unable to approve your request.",
      "You can contact support if you have any questions.",
    ],
  },
};

export function getStatusPanel(key) {
  return STATUS_PANELS[key] ?? STATUS_PANELS.submitted;
}

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
