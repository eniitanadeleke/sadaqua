import {
  RiCheckboxCircleLine,
  RiFilePdfLine,
  RiFileTextLine,
} from "react-icons/ri";
import { formatFileSize } from "@/lib/format";
import styles from "./RequestForm.module.css";

/**
 * A chosen supporting document: file icon, name, size and a green tick
 * (Figma: Help Request - Review, "medical_report.pdf  1.4 MB").
 * action: optional button (e.g. "Remove") shown instead of the tick
 */
export default function DocumentRow({ document, action }) {
  const isPdf = document.name.toLowerCase().endsWith(".pdf");
  const FileIcon = isPdf ? RiFilePdfLine : RiFileTextLine;
  return (
    <div className={styles.document}>
      <FileIcon
        className={`${styles.documentIcon} ${isPdf ? styles.pdf : ""}`}
        aria-hidden="true"
      />
      <div className={styles.documentText}>
        <p className={styles.documentName}>{document.name}</p>
        <p className={styles.documentSize}>{formatFileSize(document.size)}</p>
      </div>
      {action ?? (
        <RiCheckboxCircleLine
          className={styles.documentTick}
          aria-label="Uploaded"
        />
      )}
    </div>
  );
}
