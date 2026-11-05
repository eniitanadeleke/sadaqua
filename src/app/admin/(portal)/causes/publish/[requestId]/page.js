import Link from "next/link";
import { RiArrowLeftLine } from "react-icons/ri";
import PublishCause from "@/components/admin/PublishCause";
import { getPublishDraft } from "@/lib/api/admin/causes";
import { isAdminDemo } from "@/lib/api/admin/demo";
import styles from "./page.module.css";

export const metadata = { title: "Publish cause | Sadaqua admin" };

/** Publish Approved Cause. ?published=1 shows "Cause published successfully". */
export default async function PublishCausePage({ params, searchParams }) {
  const { requestId } = await params;
  const query = await searchParams;
  const demo = await isAdminDemo(query);
  const draft = await getPublishDraft(requestId, { demo });

  if (!draft) {
    return (
      <div className={styles.missing}>
        <Link href="/admin/requests" className={styles.back}>
          <RiArrowLeftLine aria-hidden="true" />
          Back to requests
        </Link>
        <h1 className={styles.title}>Request not found</h1>
        <p className={styles.text}>
          We couldn&apos;t find an approved request {requestId} to publish.
        </p>
      </div>
    );
  }

  return <PublishCause draft={draft} published={query.published === "1"} />;
}
