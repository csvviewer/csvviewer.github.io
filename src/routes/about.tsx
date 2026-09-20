import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ShieldCheck,
  Zap,
  Search,
  FileSpreadsheet,
  Columns3,
  SlidersHorizontal,
  Download,
  Keyboard,
  ArrowLeft,
  Lock,
  Cpu,
  EyeOff,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About & Privacy — CSV Viewer" },
      {
        name: "description",
        content:
          "Learn how CSV Viewer keeps your data 100% private in-browser. Zero server uploads, instant virtualized rendering, and comprehensive keyboard shortcuts.",
      },
      { property: "og:title", content: "About & Privacy — CSV Viewer" },
      {
        property: "og:description",
        content:
          "Zero server uploads, zero tracking. 100% client-side CSV viewer and editor built for speed, privacy, and productivity.",
      },
    ],
  }),
  component: AboutPage,
});

const shortcutsList = [
  { keys: ["/ ", "Ctrl", "F"], description: "Focus global search box" },
  { keys: ["Enter"], description: "Jump to next search match" },
  { keys: ["Shift", "Enter"], description: "Jump to previous search match" },
  { keys: ["Ctrl", "G"], description: "Jump to a specific row number" },
  { keys: ["Ctrl", "Z"], description: "Undo the last cell edit" },
  { keys: ["Double-click cell"], description: "Edit cell value in place" },
  { keys: ["Drag header"], description: "Reorder columns" },
  { keys: ["Drag header edge"], description: "Resize column width" },
  { keys: ["?"], description: "Open keyboard shortcuts modal" },
  { keys: ["Esc"], description: "Cancel cell edit or close dialogs" },
];

function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-12 py-6">
      {/* Header & Back Link */}
      <div className="space-y-4">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-3.5" /> Back to Viewer
        </Link>
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/60 px-3 py-1 text-xs font-medium text-primary">
            <Cpu className="size-3.5" /> 100% Client-Side Architecture
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            About CSV Viewer
          </h1>
          <p className="text-base text-muted-foreground leading-relaxed max-w-2xl">
            A fast, data-dense, privacy-first online CSV viewer designed for engineers, analysts,
            and anyone who works with tabular data.
          </p>
        </div>
      </div>

      {/* Privacy Promise Banner */}
      <div className="rounded-xl border border-primary/30 bg-primary/5 p-6 sm:p-8">
        <div className="flex items-start gap-4">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <ShieldCheck className="size-5" />
          </div>
          <div className="space-y-2">
            <h2 className="text-lg font-semibold text-foreground">Our Privacy Guarantee</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Your files <strong className="text-foreground">never leave your computer</strong>. All
              parsing, sorting, filtering, searching, and exporting happen entirely within your
              browser's JavaScript runtime.
            </p>
            <div className="grid gap-3 pt-3 sm:grid-cols-3">
              <div className="flex items-center gap-2 text-xs font-medium text-foreground">
                <Lock className="size-4 text-primary shrink-0" />
                <span>Zero Server Uploads</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-foreground">
                <EyeOff className="size-4 text-primary shrink-0" />
                <span>Zero Analytics Tracking</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-foreground">
                <Cpu className="size-4 text-primary shrink-0" />
                <span>Local Memory Only</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Why CSV Viewer Section */}
      <div className="space-y-6">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Why use CSV Viewer?
          </h2>
          <p className="text-sm text-muted-foreground">
            Built to overcome common frustrations with spreadsheet software and online tools.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-border bg-card p-5 space-y-2">
            <div className="flex items-center gap-2 font-medium text-foreground">
              <Zap className="size-4 text-primary" />
              <span>Handles 100,000+ Rows with Zero Lag</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Traditional web tables choke when rendering thousands of DOM elements. CSV Viewer uses
              virtualized windowing (
              <code className="font-mono text-[11px] bg-muted px-1 rounded">
                @tanstack/react-virtual
              </code>
              ) to only render rows currently in view, maintaining a smooth 60fps scrolling
              experience.
            </p>
          </div>

          <div className="rounded-lg border border-border bg-card p-5 space-y-2">
            <div className="flex items-center gap-2 font-medium text-foreground">
              <Search className="size-4 text-primary" />
              <span>Instant Deep Search & Column Filters</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Quickly find any cell value with global substring match highlighting and real-time
              match counts. Combine global search with individual per-column text filters.
            </p>
          </div>

          <div className="rounded-lg border border-border bg-card p-5 space-y-2">
            <div className="flex items-center gap-2 font-medium text-foreground">
              <SlidersHorizontal className="size-4 text-primary" />
              <span>Auto Delimiter & Multi-Encoding Support</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Automatically detects comma, semicolon, tab, or pipe delimiters. Switch between UTF-8,
              Windows-1252, ISO-8859-1, UTF-16, and Shift-JIS without data corruption or garbled
              characters.
            </p>
          </div>

          <div className="rounded-lg border border-border bg-card p-5 space-y-2">
            <div className="flex items-center gap-2 font-medium text-foreground">
              <Download className="size-4 text-primary" />
              <span>In-Place Editing & Multi-Format Export</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Double-click any cell to fix typos or adjust data with full undo history. Export the
              filtered or modified data directly to CSV, TSV, JSON, or clean Markdown tables.
            </p>
          </div>
        </div>
      </div>

      {/* Keyboard Shortcuts Reference */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Keyboard className="size-5 text-primary" />
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Keyboard Shortcuts Reference
          </h2>
        </div>
        <p className="text-sm text-muted-foreground">
          Work at the speed of thought with full keyboard navigation:
        </p>

        <div className="overflow-hidden rounded-lg border border-border bg-card">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-border bg-muted/40 font-mono text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-4 py-2.5 font-medium">Action</th>
                <th className="px-4 py-2.5 font-medium text-right">Shortcut</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {shortcutsList.map((item, idx) => (
                <tr key={idx} className="hover:bg-muted/20">
                  <td className="px-4 py-2.5 text-xs text-foreground font-medium">
                    {item.description}
                  </td>
                  <td className="px-4 py-2.5 text-right">
                    <div className="inline-flex items-center gap-1">
                      {item.keys.map((k, ki) => (
                        <kbd
                          key={ki}
                          className="rounded border border-border bg-secondary px-2 py-0.5 font-mono text-[11px] text-foreground shadow-xs"
                        >
                          {k}
                        </kbd>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-xl border border-border bg-card p-6">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="font-semibold text-foreground">Ready to explore your data?</h3>
          <p className="text-xs text-muted-foreground">
            Drop a file or try an example dataset right in your browser.
          </p>
        </div>
        <Button asChild>
          <Link to="/">
            <FileSpreadsheet className="size-4" /> Open CSV Viewer
          </Link>
        </Button>
      </div>
    </div>
  );
}
