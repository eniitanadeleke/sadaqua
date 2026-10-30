"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { stepReached, useRequestDraft } from "./RequestDraftProvider";

const STEP_PATHS = [
  "/recipient/request-help",
  "/recipient/request-help/details",
  "/recipient/request-help/verify",
  "/recipient/request-help/review",
];

/**
 * Sends the person back to the first unfinished step if they open a later
 * step directly (e.g. from a bookmark) before answering the earlier ones.
 * Returns true once the step may be shown.
 */
export function useStepGuard(step) {
  const router = useRouter();
  const { draft, ready } = useRequestDraft();
  const reached = stepReached(draft);
  const allowed = ready && reached >= step;

  useEffect(() => {
    if (ready && reached < step) router.replace(STEP_PATHS[reached - 1]);
  }, [ready, reached, step, router]);

  return allowed;
}

export { STEP_PATHS };
