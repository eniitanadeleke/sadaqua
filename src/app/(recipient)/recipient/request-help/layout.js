import { RequestDraftProvider } from "@/components/requests/RequestForm";

// All Help request steps share one draft, so answers survive moving
// between Need, Details, Verify and Review.
export default function HelpRequestLayout({ children }) {
  return <RequestDraftProvider>{children}</RequestDraftProvider>;
}
