import { ReactNode } from 'react';

export interface Column<T> {
  header: string;
  render: (row: T) => ReactNode;
  className?: string;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  rowKey: (row: T) => string;
  emptyMessage?: string;
  loading?: boolean;
}

export function Table<T>({
  columns,
  data,
  rowKey,
  emptyMessage = 'Aucune donnée pour le moment.',
  loading = false,
}: TableProps<T>) {
  const rows = Array.isArray(data) ? data : [];
  return (
    <div className="overflow-hidden rounded-xl border border-ink/10 bg-white shadow-card">
      <table className="w-full text-left text-sm">
        <thead className="bg-brand-50 text-xs font-semibold uppercase tracking-wide text-brand-700">
          <tr>
            {columns.map((col) => (
              <th key={col.header} className="px-4 py-3">
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-ink/5">
          {loading && (
            <tr>
              <td colSpan={columns.length} className="px-4 py-8 text-center text-ink/50">
                Chargement...
              </td>
            </tr>
          )}
          {!loading && rows.length === 0 && (
            <tr>
              <td colSpan={columns.length} className="px-4 py-8 text-center text-ink/50">
                {emptyMessage}
              </td>
            </tr>
          )}
          {!loading &&
            rows.map((row) => (
              <tr key={rowKey(row)} className="hover:bg-brand-50/50">
                {columns.map((col) => (
                  <td key={col.header} className={`px-4 py-3 ${col.className ?? ''}`}>
                    {col.render(row)}
                  </td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
