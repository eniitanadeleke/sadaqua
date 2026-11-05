import Link from "next/link";
import { RiArrowLeftLine } from "react-icons/ri";
import RequestReview from "@/components/admin/RequestReview";
import { isAdminDemo } from "@/lib/api/admin/demo";
import { getRequestForReview } from "@/lib/api/admin/requests";
import { getCategory } from "@/lib/categories";
import styles from "./page.module.css";

export const metadata = { title: "Review request | Sadaqua admin" };

/** Request Review & Verification. ?action=info | reject opens the pop-up. */
export default async function RequestReviewPage({ params, searchParams }) {
  const { requestId } = await params;
  const query = await searchParams;
  const demo = await isAdminDemo(query);
  const request = await getRequestForReview(requestId, { demo });

  if (!request) {
    return (
      <div className={styles.missing}>
        <Link href="/admin/requests" className={styles.back}>
          <RiArrowLeftLine aria-hidden="true" />
          Back to requests
        </Link>
        <h1 className={styles.title}>Request not found</h1>
        <p className={styles.text}>
          We couldn&apos;t find request {requestId}. It may have been removed.
        </p>
      </div>
    );
  }

  const modal = ["info", "reject"].includes(query.action) ? query.action : null;
  return (
    <RequestReview
      request={request}
      categoryLabel={getCategory(request.category)?.label ?? request.category}
      modal={modal}
    />
  );
}
