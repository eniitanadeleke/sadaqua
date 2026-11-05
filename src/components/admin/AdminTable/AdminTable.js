import styles from "./AdminTable.module.css";

/**
 * The admin list table (Figma: request queue, Approved Causes, Disbursements,
 * Users): sage header row, 64px rows with a line between them.
 *
 * columns: [{ key, label, width, align }]  width in px as measured in Figma
 * rows:    [{ id, ...cells }]  each cell is whatever should show in that column
 * empty:   what to show when there are no rows
 * caption: text for screen readers
 */
export default function AdminTable({
  columns,
  rows,
  empty,
  caption,
  className = "",
}) {
  return (
    <div className={`${styles.wrap} ${className}`}>
      <table className={styles.table}>
        {caption && <caption className="visually-hidden">{caption}</caption>}
        <colgroup>
          {columns.map((column) => (
            <col key={column.key} style={{ width: column.width }} />
          ))}
        </colgroup>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key} scope="col" className={styles.th}>
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className={styles.row}>
              {columns.map((column) => (
                <td key={column.key} className={styles.td}>
                  {row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {rows.length === 0 && empty && (
        <div className={styles.empty}>{empty}</div>
      )}
    </div>
  );
}

/** Name in ink with a smaller grey line under it (e.g. "Amina Musa / SAD-0029") */
export function TwoLines({ main, sub, className = "" }) {
  return (
    <span className={`${styles.twoLines} ${className}`}>
      <span className={styles.main}>{main}</span>
      <span className={styles.sub}>{sub}</span>
    </span>
  );
}
