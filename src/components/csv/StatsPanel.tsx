import type { ColumnStats } from "@/lib/csv/types";
import { formatNumber } from "@/lib/csv/analyze";

const kindLabel: Record<string, string> = {
  number: "Number",
  date: "Date",
  boolean: "Boolean",
  text: "Text",
  empty: "Empty",
};

export function StatsPanel({ stats, rowCount }: { stats: ColumnStats[]; rowCount: number }) {
  return (
    <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {stats.map((s) => (
        <div key={s.index} className="rounded-lg border border-border bg-card p-3">
          <div className="flex items-baseline justify-between gap-2">
            <span className="truncate text-sm font-semibold text-foreground">{s.name}</span>
            <span className="shrink-0 rounded-full border border-border px-2 py-0.5 text-[10px] uppercase tracking-wide text-muted-foreground">
              {kindLabel[s.kind] ?? s.kind}
            </span>
          </div>
          <dl className="mt-2 grid grid-cols-2 gap-x-3 gap-y-1 font-mono text-[11px] tabular-nums text-muted-foreground">
            <div className="flex justify-between">
              <dt>unique</dt>
              <dd className="text-foreground">{formatNumber(s.unique)}</dd>
            </div>
            <div className="flex justify-between">
              <dt>empty</dt>
              <dd className="text-foreground">
                {formatNumber(s.empty)}
                {rowCount > 0 && ` (${Math.round((s.empty / rowCount) * 100)}%)`}
              </dd>
            </div>
            {s.min !== undefined && (
              <>
                <div className="flex justify-between">
                  <dt>min</dt>
                  <dd className="text-foreground">{formatNumber(s.min)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt>max</dt>
                  <dd className="text-foreground">{formatNumber(s.max ?? 0)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt>mean</dt>
                  <dd className="text-foreground">{formatNumber(s.mean ?? 0)}</dd>
                </div>
              </>
            )}
          </dl>
        </div>
      ))}
    </div>
  );
}
