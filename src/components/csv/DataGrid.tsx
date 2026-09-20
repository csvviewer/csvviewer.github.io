import { useEffect, useRef, useState } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { ArrowDown, ArrowUp, ChevronsUpDown, GripVertical } from "lucide-react";
import type { ColumnStats, SortState } from "@/lib/csv/types";

export type ViewRow = { index: number; cells: string[] };

type Props = {
  columns: string[];
  order: number[];
  rows: ViewRow[];
  widths: Record<number, number>;
  stats: Record<number, ColumnStats>;
  sort: SortState;
  filters: Record<number, string>;
  search: string;
  showFilters: boolean;
  onResize: (col: number, width: number) => void;
  onReorder: (from: number, to: number) => void;
  onSort: (col: number) => void;
  onFilter: (col: number, value: string) => void;
  onEdit: (rowIndex: number, col: number, value: string) => void;
  scrollToRow: number | null;
};

const DEFAULT_WIDTH = 168;
const ROW_HEIGHT = 32;

function Highlight({ value, query }: { value: string; query: string }) {
  if (!query) return <>{value}</>;
  const lower = value.toLowerCase();
  const q = query.toLowerCase();
  const parts: React.ReactNode[] = [];
  let i = 0;
  let key = 0;
  while (i < value.length) {
    const found = lower.indexOf(q, i);
    if (found === -1) {
      parts.push(value.slice(i));
      break;
    }
    if (found > i) parts.push(value.slice(i, found));
    parts.push(
      <mark key={key++} className="rounded-sm bg-primary/30 px-0.5 text-foreground">
        {value.slice(found, found + q.length)}
      </mark>,
    );
    i = found + q.length;
  }
  return <>{parts}</>;
}

export function DataGrid({
  columns,
  order,
  rows,
  widths,
  stats,
  sort,
  filters,
  search,
  showFilters,
  onResize,
  onReorder,
  onSort,
  onFilter,
  onEdit,
  scrollToRow,
}: Props) {
  const parentRef = useRef<HTMLDivElement>(null);
  const [dragCol, setDragCol] = useState<number | null>(null);
  const [editing, setEditing] = useState<{ row: number; col: number; value: string } | null>(null);

  const virtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => ROW_HEIGHT,
    overscan: 14,
  });

  useEffect(() => {
    if (scrollToRow != null && scrollToRow >= 0 && scrollToRow < rows.length) {
      virtualizer.scrollToIndex(scrollToRow, { align: "center" });
    }
  }, [scrollToRow, rows.length, virtualizer]);

  const startResize = (col: number, startX: number) => {
    const startWidth = widths[col] ?? DEFAULT_WIDTH;
    const move = (e: MouseEvent) => onResize(col, Math.max(64, startWidth + e.clientX - startX));
    const up = () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
  };

  const totalWidth = order.reduce((sum, c) => sum + (widths[c] ?? DEFAULT_WIDTH), 0) + 64;

  return (
    <div
      ref={parentRef}
      className="relative h-[calc(100vh-17rem)] min-h-80 overflow-auto rounded-lg border border-border bg-card"
    >
      <div style={{ width: totalWidth }} className="min-w-full">
        <div className="sticky top-0 z-20 bg-secondary/95 backdrop-blur">
          <div className="flex border-b border-border">
            <div className="w-16 shrink-0 border-r border-border px-2 py-1.5 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
              #
            </div>
            {order.map((col) => (
              <div
                key={col}
                draggable
                onDragStart={() => setDragCol(col)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => {
                  if (dragCol != null && dragCol !== col) onReorder(dragCol, col);
                  setDragCol(null);
                }}
                style={{ width: widths[col] ?? DEFAULT_WIDTH }}
                className="group relative shrink-0 border-r border-border"
              >
                <button
                  onClick={() => onSort(col)}
                  className="flex w-full items-center gap-1 px-2 py-1.5 text-left hover:bg-accent"
                  title={`${columns[col]} — ${stats[col]?.kind ?? "text"}`}
                >
                  <GripVertical className="size-3 shrink-0 cursor-grab text-muted-foreground/50 opacity-0 transition-opacity group-hover:opacity-100" />
                  <span className="truncate text-xs font-semibold text-foreground">
                    {columns[col]}
                  </span>
                  {sort?.column === col ? (
                    sort.dir === "asc" ? (
                      <ArrowUp className="ml-auto size-3 shrink-0 text-primary" />
                    ) : (
                      <ArrowDown className="ml-auto size-3 shrink-0 text-primary" />
                    )
                  ) : (
                    <ChevronsUpDown className="ml-auto size-3 shrink-0 text-muted-foreground/40 opacity-0 group-hover:opacity-100" />
                  )}
                </button>
                <span
                  onMouseDown={(e) => {
                    e.preventDefault();
                    startResize(col, e.clientX);
                  }}
                  className="absolute right-0 top-0 h-full w-1.5 cursor-col-resize bg-transparent hover:bg-primary/60"
                />
              </div>
            ))}
          </div>
          {showFilters && (
            <div className="flex border-b border-border bg-card/80">
              <div className="w-16 shrink-0 border-r border-border" />
              {order.map((col) => (
                <div
                  key={col}
                  style={{ width: widths[col] ?? DEFAULT_WIDTH }}
                  className="shrink-0 border-r border-border p-1"
                >
                  <input
                    value={filters[col] ?? ""}
                    onChange={(e) => onFilter(col, e.target.value)}
                    placeholder="Filter…"
                    className="h-6 w-full rounded border border-input bg-background px-1.5 text-[11px] text-foreground outline-none placeholder:text-muted-foreground/70 focus:border-primary"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ height: virtualizer.getTotalSize(), position: "relative" }}>
          {virtualizer.getVirtualItems().map((item) => {
            const row = rows[item.index];
            if (!row) return null;
            return (
              <div
                key={item.key}
                className={[
                  "absolute left-0 flex border-b border-border/60 text-[13px]",
                  item.index % 2 === 1 ? "bg-muted/30" : "",
                  "hover:bg-accent/60",
                ].join(" ")}
                style={{ top: item.start, height: item.size, width: totalWidth }}
              >
                <div className="w-16 shrink-0 border-r border-border/60 px-2 py-1.5 text-right font-mono text-[11px] tabular-nums text-muted-foreground">
                  {row.index + 1}
                </div>
                {order.map((col) => {
                  const isEditing = editing?.row === row.index && editing.col === col;
                  const value = row.cells[col] ?? "";
                  return (
                    <div
                      key={col}
                      style={{ width: widths[col] ?? DEFAULT_WIDTH }}
                      onDoubleClick={() => setEditing({ row: row.index, col, value })}
                      className="shrink-0 truncate border-r border-border/60 px-2 py-1.5"
                    >
                      {isEditing ? (
                        <input
                          autoFocus
                          value={editing.value}
                          onChange={(e) => setEditing({ ...editing, value: e.target.value })}
                          onBlur={() => {
                            onEdit(row.index, col, editing.value);
                            setEditing(null);
                          }}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              onEdit(row.index, col, editing.value);
                              setEditing(null);
                            }
                            if (e.key === "Escape") setEditing(null);
                          }}
                          className="h-5 w-full rounded-sm border border-primary bg-background px-1 text-[13px] outline-none"
                        />
                      ) : (
                        <span
                          className={
                            stats[col]?.kind === "number"
                              ? "block truncate text-right font-mono tabular-nums text-foreground"
                              : "block truncate text-foreground"
                          }
                        >
                          {value === "" ? (
                            <span className="text-muted-foreground/50">—</span>
                          ) : (
                            <Highlight value={value} query={search} />
                          )}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>

        {rows.length === 0 && (
          <div className="p-10 text-center text-sm text-muted-foreground">
            No rows match the current search or filters.
          </div>
        )}
      </div>
    </div>
  );
}
