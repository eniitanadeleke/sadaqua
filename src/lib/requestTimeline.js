// The "Request Progress" list on the request details page
// (Figma: My request details, one frame per status).
//
// Each step: { key, title, text, state, date }
//   state: "done" (green tick), "current" (ring with a dot),
//          "pending" (empty ring) or "failed" (red cross)
//   date:  ISO date, shown on the right once the stage has happened
//
// The steps and words depend only on the request's status; the dates come
// from request.history, which the backend fills in as the request moves on.

const SUBMITTED = (h) => ({
  key: "submitted",
  title: "Request submitted",
  text: "Your request was received.",
  state: "done",
  date: h.submitted,
});

const REVIEWED = (h) => ({
  key: "review",
  title: "Under review",
  text: "We reviewed your information.",
  state: "done",
  date: h.reviewed,
});

const VERIFIED = (h) => ({
  key: "verified",
  title: "Verified",
  text: "Your request has been verified.",
  state: "done",
  date: h.verified,
});

const PUBLISHED = (h) => ({
  key: "published",
  title: "Published",
  text: "Your request was published to givers.",
  state: "done",
  date: h.published,
});

const VERIFIED_NEXT = {
  key: "verified",
  title: "Verified",
  text: "Your request will be verified if approved.",
  state: "pending",
};

const PUBLISHED_NEXT = {
  key: "published",
  title: "Published",
  text: "Once approved, your request can be published as a cause.",
  state: "pending",
};

export function buildTimeline(request) {
  const h = request.history ?? {};

  switch (request.status) {
    case "needs_changes":
      return [
        SUBMITTED(h),
        {
          key: "info",
          title: "More information needed",
          text: "We need additional details from you.",
          state: "current",
          date: h.infoRequested,
        },
        {
          key: "review",
          title: "Under review",
          text: "We’ll review again once you respond.",
          state: "pending",
        },
        VERIFIED_NEXT,
        PUBLISHED_NEXT,
      ];

    case "verified":
      return [
        SUBMITTED(h),
        REVIEWED(h),
        VERIFIED(h),
        {
          key: "published",
          title: "Published",
          text: "Your request will be visible to givers once published.",
          state: "pending",
        },
      ];

    case "published":
      return [
        SUBMITTED(h),
        REVIEWED(h),
        VERIFIED(h),
        { ...PUBLISHED(h), state: "current" },
      ];

    case "in_progress":
      return [
        SUBMITTED(h),
        REVIEWED(h),
        VERIFIED(h),
        PUBLISHED(h),
        {
          key: "progress",
          title: "In progress",
          text: "You are now receiving help from givers.",
          state: "current",
        },
      ];

    case "fulfilled":
      return [
        SUBMITTED(h),
        REVIEWED(h),
        VERIFIED(h),
        PUBLISHED(h),
        {
          key: "progress",
          title: "In progress",
          text: "You received help from givers.",
          state: "done",
          date: h.firstHelp,
        },
        {
          key: "fulfilled",
          title: "Fulfilled",
          text: "Your request has been fully funded.",
          state: "done",
          date: h.fulfilled,
        },
      ];

    case "rejected":
      return [
        SUBMITTED(h),
        REVIEWED(h),
        {
          key: "rejected",
          title: "Not approved",
          text: "Unfortunately, we can’t approve this request.",
          state: "failed",
          date: h.rejected,
        },
      ];

    // "submitted" and "under_review"
    default:
      return [
        SUBMITTED(h.submitted ? h : { submitted: request.submittedAt }),
        {
          key: "review",
          title: "Under review",
          text: "We are checking the information provided.",
          state: "current",
        },
        VERIFIED_NEXT,
        PUBLISHED_NEXT,
      ];
  }
}
