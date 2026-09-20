import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Columns3,
  Copy,
  Download,
  FileDown,
  Filter,
  Keyboard,
  Plus,
  Search,
  ShieldCheck,
  Sigma,
  Undo2,
  X,
  Zap,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DropZone } from "./DropZone";
import { DataGrid, type ViewRow } from "./DataGrid";
import { StatsPanel } from "./StatsPanel";
import { ShortcutsDialog } from "./ShortcutsDialog";
import { analyzeColumn, formatBytes, formatNumber, toNumber } from "@/lib/csv/analyze";
import { baseName, download, toDelimited, toJson, toMarkdown } from "@/lib/csv/export";
import { parseFile, parseText, readFile } from "@/lib/csv/parse";
import { sampleCsv } from "@/lib/csv/sample";
import {
  defaultParseOptions,
  type ColumnStats,
  type Delimiter,
  type ParseOptions,
  type Sheet,
  type SortState,
} from "@/lib/csv/types";

const SETTINGS_KEY = "csvviewer.settings";

type ViewState = {
  search: string;
  sort: SortState;
  filters: Record<number, string>;
  hidden: number[];
  order: number[];
  widths: Record<number, number>;
};

function initialView(columnCount: number): ViewState {
  return {
    search: "",
    sort: null,
    filters: {},
    hidden: [],
    order: Array.from({ length: columnCount }, (_, i) => i),
    widths: {},
  };
}

export function CsvViewer() {
  const [sheets, setSheets] = useState<Sheet[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [views, setViews] = useState<Record<string, ViewState>>({});
  const [options, setOptions] = useState<ParseOptions>(defaultParseOptions);
  const [showFilters, setShowFilters] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [shortcutsOpen, setShortcutsOpen] = useState(false);
  const [matchCursor, setMatchCursor] = useState(0);
  const [scrollToRow, setScrollToRow] = useState<number | null>(null);
  const [undoStack, setUndoStack] = useState<
    { sheet: string; row: number; col: number; prev: string }[]
  >([]);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(SETTINGS_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as {
        options?: ParseOptions;
        showFilters?: boolean;
        showStats?: boolean;
      };
      if (parsed.options) setOptions({ ...defaultParseOptions, ...parsed.options });
      if (typeof parsed.showFilters === "boolean") setShowFilters(parsed.showFilters);
      if (typeof parsed.showStats === "boolean") setShowStats(parsed.showStats);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify({ options, showFilters, showStats }));
  }, [options, showFilters, showStats]);

  const active = sheets.find((s) => s.id === activeId) ?? null;
  const view = (activeId && views[activeId]) || initialView(active?.columns.length ?? 0);

  const addSheet = useCallback((sheet: Sheet) => {
    setSheets((prev) => [...prev, sheet]);
    setViews((prev) => ({ ...prev, [sheet.id]: initialView(sheet.columns.length) }));
    setActiveId(sheet.id);
    if (sheet.errors.length) toast.warning(`Opened with warnings: ${sheet.errors[0]}`);
  }, []);

  const handleFiles = useCallback(
    async (files: File[]) => {
      for (const file of files) {
        try {
          const sheet = await parseFile(file, options);
          addSheet(sheet);
          toast.success(`${file.name} — ${formatNumber(sheet.rows.length)} rows`);
        } catch {
          toast.error(`Couldn't read ${file.name}`);
        }
      }
    },
    [addSheet, options],
  );

  const handleText = useCallback(
    (text: string, name: string) => addSheet(parseText(text, name, options)),
    [addSheet, options],
  );

  const handleUrl = useCallback(
    async (url: string) => {
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(String(res.status));
        const text = await res.text();
        addSheet(parseText(text, url.split("/").pop() || "Remote file", options));
      } catch {
        toast.error("That link couldn't be loaded. The site may block outside access.");
      }
    },
    [addSheet, options],
  );

  const reparse = useCallback(
    async (next: Partial<ParseOptions>) => {
      const merged = { ...options, ...next };
      setOptions(merged);
      if (!active) return;
      let raw = active.raw;
      if (next.encoding && active.file) {
        try {
          raw = await readFile(active.file, merged.encoding);
        } catch {
          toast.error("Failed to re-read file with selected encoding");
        }
      }
      const fresh = parseText(raw, active.name, merged, active.bytes);
      fresh.file = active.file;
      setSheets((prev) => prev.map((s) => (s.id === active.id ? { ...fresh, id: s.id } : s)));
      setViews((prev) => ({ ...prev, [active.id]: initialView(fresh.columns.length) }));
    },
    [active, options],
  );

  const patchView = useCallback(
    (patch: Partial<ViewState>) => {
      if (!activeId) return;
      setViews((prev) => ({
        ...prev,
        [activeId]: { ...(prev[activeId] ?? initialView(active?.columns.length ?? 0)), ...patch },
      }));
    },
    [activeId, active],
  );

  const stats = useMemo<ColumnStats[]>(() => {
    if (!active) return [];
    return active.columns.map((name, i) => analyzeColumn(active.rows, i, name));
  }, [active]);

  const statsByIndex = useMemo(() => {
    const map: Record<number, ColumnStats> = {};
    stats.forEach((s) => (map[s.index] = s));
    return map;
  }, [stats]);

  const rows = useMemo<ViewRow[]>(() => {
    if (!active) return [];
    const search = view.search.trim().toLowerCase();
    const filterEntries = Object.entries(view.filters).filter(([, v]) => v.trim() !== "");

    let out: ViewRow[] = active.rows.map((cells, index) => ({ index, cells }));

    if (filterEntries.length) {
      out = out.filter((r) =>
        filterEntries.every(([col, needle]) =>
          (r.cells[Number(col)] ?? "").toLowerCase().includes(needle.trim().toLowerCase()),
        ),
      );
    }
    if (search) {
      out = out.filter((r) => r.cells.some((c) => c.toLowerCase().includes(search)));
    }
    if (view.sort) {
      const { column, dir } = view.sort;
      const numeric = statsByIndex[column]?.kind === "number";
      out = [...out].sort((a, b) => {
        const av = a.cells[column] ?? "";
        const bv = b.cells[column] ?? "";
        let cmp: number;
        if (numeric) {
          const an = toNumber(av);
          const bn = toNumber(bv);
          cmp = (an ?? Number.NEGATIVE_INFINITY) - (bn ?? Number.NEGATIVE_INFINITY);
        } else {
          cmp = av.localeCompare(bv, undefined, { numeric: true, sensitivity: "base" });
        }
        return dir === "asc" ? cmp : -cmp;
      });
    }
    return out;
  }, [active, view.search, view.filters, view.sort, statsByIndex]);

  const matchCount = useMemo(() => {
    const q = view.search.trim().toLowerCase();
    if (!q || !active) return 0;
    let count = 0;
    for (const r of rows) for (const c of r.cells) if (c.toLowerCase().includes(q)) count++;
    return count;
  }, [rows, view.search, active]);

  const visibleOrder = view.order.filter((c) => !view.hidden.includes(c));

  const editCell = useCallback(
    (rowIndex: number, col: number, value: string) => {
      if (!active) return;
      const prev = active.rows[rowIndex]?.[col] ?? "";
      if (prev === value) return;
      setUndoStack((s) => [...s.slice(-99), { sheet: active.id, row: rowIndex, col, prev }]);
      setSheets((all) =>
        all.map((s) => {
          if (s.id !== active.id) return s;
          const nextRows = s.rows.slice();
          const row = (nextRows[rowIndex] ?? []).slice();
          row[col] = value;
          nextRows[rowIndex] = row;
          return { ...s, rows: nextRows };
        }),
      );
    },
    [active],
  );

  const undo = useCallback(() => {
    const last = undoStack[undoStack.length - 1];
    if (!last) return;
    setUndoStack((s) => s.slice(0, -1));
    setSheets((all) =>
      all.map((s) => {
        if (s.id !== last.sheet) return s;
        const nextRows = s.rows.slice();
        const row = (nextRows[last.row] ?? []).slice();
        row[last.col] = last.prev;
        nextRows[last.row] = row;
        return { ...s, rows: nextRows };
      }),
    );
  }, [undoStack]);

  const exportData = useCallback(
    (format: "csv" | "tsv" | "json" | "md" | "clipboard") => {
      if (!active) return;
      const cols = visibleOrder.map((c) => active.columns[c] ?? "");
      const data = rows.map((r) => visibleOrder.map((c) => r.cells[c] ?? ""));
      const name = baseName(active.name);
      if (format === "csv") download(`${name}.csv`, toDelimited(cols, data, ","), "text/csv");
      if (format === "tsv")
        download(`${name}.tsv`, toDelimited(cols, data, "\t"), "text/tab-separated-values");
      if (format === "json") download(`${name}.json`, toJson(cols, data), "application/json");
      if (format === "md") download(`${name}.md`, toMarkdown(cols, data), "text/markdown");
      if (format === "clipboard") {
        navigator.clipboard
          .writeText(toDelimited(cols, data, "\t"))
          .then(() => toast.success("Copied the visible rows"))
          .catch(() => toast.error("Clipboard access was blocked"));
        return;
      }
      toast.success("Download started");
    },
    [active, rows, visibleOrder],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const typing = target && /^(INPUT|TEXTAREA)$/.test(target.tagName);
      if ((e.key === "/" && !typing) || (e.key.toLowerCase() === "f" && (e.metaKey || e.ctrlKey))) {
        e.preventDefault();
        searchRef.current?.focus();
        return;
      }
      if (e.key === "?" && !typing) {
        e.preventDefault();
        setShortcutsOpen(true);
        return;
      }
      if (e.key.toLowerCase() === "z" && (e.metaKey || e.ctrlKey) && !typing) {
        e.preventDefault();
        undo();
        return;
      }
      if (e.key.toLowerCase() === "g" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        const answer = window.prompt("Go to row number");
        const n = Number(answer);
        if (Number.isFinite(n) && n >= 1) setScrollToRow(Math.min(n, rows.length) - 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [undo, rows.length]);

  const jumpMatch = (dir: 1 | -1) => {
    const q = view.search.trim().toLowerCase();
    if (!q) return;
    const hits = rows
      .map((r, i) => (r.cells.some((c) => c.toLowerCase().includes(q)) ? i : -1))
      .filter((i) => i >= 0);
    if (!hits.length) return;
    const next = (matchCursor + dir + hits.length) % hits.length;
    setMatchCursor(next);
    setScrollToRow(hits[next] ?? 0);
  };

  if (!active) {
    return (
      <div className="mx-auto w-full max-w-3xl space-y-8 py-4">
        <div className="text-center space-y-1.5">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Fast, in-browser CSV viewer
          </h1>
          <p className="text-sm text-muted-foreground max-w-lg mx-auto">
            View, search, filter, and edit large CSV files with instant zero-lag virtualized
            scrolling. Your files never leave your computer.
          </p>
        </div>

        <DropZone
          onFiles={handleFiles}
          onText={handleText}
          onUrl={handleUrl}
          onSample={() => handleText(sampleCsv, "sample-orders.csv")}
        />

        {/* Value line & feature strip below the fold */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-4 border-t border-border">
          <div className="rounded-lg border border-border bg-card p-3.5 space-y-1">
            <div className="flex items-center gap-2 text-foreground font-semibold text-xs">
              <Zap className="size-4 text-primary shrink-0" />
              <span>Virtualized Grid</span>
            </div>
            <p className="text-[12px] text-muted-foreground leading-relaxed">
              Renders 100k+ rows smoothly at 60fps without browser lockup.
            </p>
          </div>

          <div className="rounded-lg border border-border bg-card p-3.5 space-y-1">
            <div className="flex items-center gap-2 text-foreground font-semibold text-xs">
              <ShieldCheck className="size-4 text-primary shrink-0" />
              <span>100% Client-Side</span>
            </div>
            <p className="text-[12px] text-muted-foreground leading-relaxed">
              Zero server uploads, zero trackers. Your data remains strictly local.
            </p>
          </div>

          <div className="rounded-lg border border-border bg-card p-3.5 space-y-1">
            <div className="flex items-center gap-2 text-foreground font-semibold text-xs">
              <Search className="size-4 text-primary shrink-0" />
              <span>Deep Search & Filters</span>
            </div>
            <p className="text-[12px] text-muted-foreground leading-relaxed">
              Instant match highlights, per-column filters, and numeric-aware sorting.
            </p>
          </div>

          <div className="rounded-lg border border-border bg-card p-3.5 space-y-1">
            <div className="flex items-center gap-2 text-foreground font-semibold text-xs">
              <FileDown className="size-4 text-primary shrink-0" />
              <span>Edit & Multi-Export</span>
            </div>
            <p className="text-[12px] text-muted-foreground leading-relaxed">
              In-place cell edits with undo. Export to CSV, TSV, JSON, Markdown, or clipboard.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* File tabs */}
      <div className="flex flex-wrap items-center gap-1.5">
        {sheets.map((s) => (
          <div
            key={s.id}
            className={[
              "group flex items-center gap-1 rounded-md border px-2.5 py-1 text-xs transition-colors",
              s.id === activeId
                ? "border-primary/60 bg-primary/10 text-foreground"
                : "border-border bg-card text-muted-foreground hover:text-foreground",
            ].join(" ")}
          >
            <button onClick={() => setActiveId(s.id)} className="max-w-56 truncate font-medium">
              {s.name}
            </button>
            <button
              onClick={() => {
                setSheets((prev) => prev.filter((x) => x.id !== s.id));
                if (activeId === s.id) {
                  const rest = sheets.filter((x) => x.id !== s.id);
                  setActiveId(rest[0]?.id ?? null);
                }
              }}
              className="text-muted-foreground/60 hover:text-destructive"
              aria-label={`Close ${s.name}`}
            >
              <X className="size-3.5" />
            </button>
          </div>
        ))}
        <label className="flex cursor-pointer items-center gap-1 rounded-md border border-dashed border-border px-2.5 py-1 text-xs text-muted-foreground hover:text-foreground">
          <Plus className="size-3.5" /> Open file
          <input
            type="file"
            multiple
            accept=".csv,.tsv,.txt,text/csv,text/plain"
            className="hidden"
            onChange={(e) => {
              const files = Array.from(e.target.files ?? []);
              if (files.length) handleFiles(files);
              e.target.value = "";
            }}
          />
        </label>
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-2 rounded-lg border border-border bg-card p-2">
        <div className="relative min-w-52 flex-1">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            ref={searchRef}
            value={view.search}
            onChange={(e) => {
              patchView({ search: e.target.value });
              setMatchCursor(0);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                jumpMatch(e.shiftKey ? -1 : 1);
              }
            }}
            placeholder="Search all cells…  (press /)"
            className="h-9 pl-8 pr-24"
          />
          {view.search && (
            <span className="absolute right-2.5 top-1/2 -translate-y-1/2 font-mono text-[11px] tabular-nums text-muted-foreground">
              {formatNumber(matchCount)} matches
            </span>
          )}
        </div>

        <Button
          variant={showFilters ? "secondary" : "ghost"}
          size="sm"
          onClick={() => setShowFilters((v) => !v)}
        >
          <Filter className="size-4" /> Filters
        </Button>
        <Button
          variant={showStats ? "secondary" : "ghost"}
          size="sm"
          onClick={() => setShowStats((v) => !v)}
        >
          <Sigma className="size-4" /> Stats
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <Columns3 className="size-4" /> Columns
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="max-h-80 overflow-auto">
            <DropdownMenuLabel>Show columns</DropdownMenuLabel>
            {active.columns.map((name, i) => (
              <DropdownMenuCheckboxItem
                key={i}
                checked={!view.hidden.includes(i)}
                onCheckedChange={(checked) =>
                  patchView({
                    hidden: checked ? view.hidden.filter((c) => c !== i) : [...view.hidden, i],
                  })
                }
              >
                <span className="truncate">{name}</span>
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <Select
          value={options.delimiter}
          onValueChange={(v) => reparse({ delimiter: v as Delimiter })}
        >
          <SelectTrigger size="sm" className="w-auto gap-1">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="auto">Delimiter: auto</SelectItem>
            <SelectItem value=",">Comma ,</SelectItem>
            <SelectItem value=";">Semicolon ;</SelectItem>
            <SelectItem value={"\t"}>Tab</SelectItem>
            <SelectItem value="|">Pipe |</SelectItem>
          </SelectContent>
        </Select>

        <Select value={options.encoding} onValueChange={(v) => reparse({ encoding: v })}>
          <SelectTrigger size="sm" className="w-auto gap-1">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="utf-8">UTF-8</SelectItem>
            <SelectItem value="windows-1252">Windows-1252</SelectItem>
            <SelectItem value="iso-8859-1">ISO-8859-1</SelectItem>
            <SelectItem value="utf-16le">UTF-16 LE</SelectItem>
            <SelectItem value="shift_jis">Shift-JIS</SelectItem>
          </SelectContent>
        </Select>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => reparse({ hasHeader: !options.hasHeader })}
        >
          {options.hasHeader ? "Header row: on" : "Header row: off"}
        </Button>

        <Button variant="ghost" size="sm" disabled={undoStack.length === 0} onClick={undo}>
          <Undo2 className="size-4" /> Undo
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="sm">
              <Download className="size-4" /> Export
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Download visible data</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => exportData("csv")}>CSV</DropdownMenuItem>
            <DropdownMenuItem onClick={() => exportData("tsv")}>TSV</DropdownMenuItem>
            <DropdownMenuItem onClick={() => exportData("json")}>JSON</DropdownMenuItem>
            <DropdownMenuItem onClick={() => exportData("md")}>Markdown table</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => exportData("clipboard")}>
              <Copy className="size-4" /> Copy to clipboard
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShortcutsOpen(true)}
          aria-label="Keyboard shortcuts"
        >
          <Keyboard className="size-4" />
        </Button>
      </div>

      {showStats && <StatsPanel stats={stats} rowCount={active.rows.length} />}

      <DataGrid
        columns={active.columns}
        order={visibleOrder}
        rows={rows}
        widths={view.widths}
        stats={statsByIndex}
        sort={view.sort}
        filters={view.filters}
        search={view.search.trim()}
        showFilters={showFilters}
        scrollToRow={scrollToRow}
        onResize={(col, width) => patchView({ widths: { ...view.widths, [col]: width } })}
        onReorder={(from, to) => {
          const next = view.order.filter((c) => c !== from);
          next.splice(next.indexOf(to), 0, from);
          patchView({ order: next });
        }}
        onSort={(col) =>
          patchView({
            sort:
              view.sort?.column === col
                ? view.sort.dir === "asc"
                  ? { column: col, dir: "desc" }
                  : null
                : { column: col, dir: "asc" },
          })
        }
        onFilter={(col, value) => patchView({ filters: { ...view.filters, [col]: value } })}
        onEdit={editCell}
      />

      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[11px] tabular-nums text-muted-foreground">
        <span>{formatNumber(rows.length)} rows shown</span>
        <span>{formatNumber(active.rows.length)} total</span>
        <span>
          {formatNumber(visibleOrder.length)} of {active.columns.length} columns
        </span>
        <span>
          delimiter “{active.detectedDelimiter === "\t" ? "tab" : active.detectedDelimiter}”
        </span>
        <span>{formatBytes(active.bytes)}</span>
      </div>

      <ShortcutsDialog open={shortcutsOpen} onOpenChange={setShortcutsOpen} />
    </div>
  );
}
