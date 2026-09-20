import {
  FileSpreadsheet,
  ShieldCheck,
  Zap,
  Search,
  SlidersHorizontal,
  Table,
  Cpu,
  Lock,
  Download,
  HelpCircle,
  Sparkles,
  CheckCircle2,
  FileCode,
  ArrowDownUp,
  Layers,
  Columns3,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function CsvArticle() {
  return (
    <article
      id="guide"
      className="mt-16 pt-12 border-t border-border space-y-16 text-foreground max-w-5xl mx-auto"
    >
      {/* Intro / What is a CSV Viewer */}
      <section className="space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/80 px-3 py-1 text-xs font-medium text-primary">
          <FileSpreadsheet className="size-3.5" />
          <span>The Definitive Guide to Online CSV Viewing</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
          What is a CSV Viewer and How Does It Work?
        </h2>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
          A <strong className="text-foreground">CSV Viewer</strong> is a specialized software tool
          or web application engineered to parse, display, inspect, and analyze tabular data stored
          in plain text <strong className="text-foreground">Comma-Separated Values (CSV)</strong>{" "}
          files. Rather than forcing you to open bloated spreadsheet programs or upload confidential
          records to remote servers, a modern{" "}
          <strong className="text-foreground">browser-based CSV file viewer online</strong>{" "}
          transforms raw delimited text into an interactive, high-performance{" "}
          <strong className="text-foreground">CSV table</strong> directly inside your web browser.
        </p>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
          Whether you are a developer debugging exported database dumps, a data scientist auditing
          machine learning datasets, or a business analyst reviewing sales figures, an in-browser
          CSV viewer provides instant access to your{" "}
          <strong className="text-foreground">CSV data</strong> without installation, license keys,
          or cloud upload risks.
        </p>
      </section>

      {/* What is a CSV File? Anatomy & Comparison with Excel */}
      <section className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
            Understanding CSV Files: Comma-Separated Values Explained
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            What makes CSV the universal format for data interchange across systems?
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-xl border border-border bg-card p-5 space-y-3">
            <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
              <FileCode className="size-4 text-primary" />
              The Structure of CSV Columns and Rows
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              At its core, a CSV file is a plain text document where each line represents a single{" "}
              <strong className="text-foreground">CSV row</strong> (record), and each field within
              that line is separated by a delimiter—most commonly a comma—defining the{" "}
              <strong className="text-foreground">CSV columns</strong>.
            </p>
            <div className="rounded-md border border-border bg-muted/50 p-3 font-mono text-[11px] leading-relaxed text-foreground overflow-x-auto">
              <div className="text-muted-foreground">// Header row defining column names:</div>
              <div className="font-semibold text-primary">
                id,customer_name,email,order_total,status
              </div>
              <div className="text-muted-foreground mt-1">// Data rows:</div>
              <div>101,"Doe, Jane",jane@example.com,249.50,completed</div>
              <div>102,"Smith, John",john@example.com,89.00,shipped</div>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Because commas can occur naturally inside text fields (like names or addresses), CSV
              standards (such as RFC 4180) wrap those values in quotation marks to prevent
              accidental column splitting.
            </p>
          </div>

          <div className="rounded-xl border border-border bg-card p-5 space-y-3">
            <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
              <Table className="size-4 text-primary" />
              Excel and CSV: Key Differences & Gotchas
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              While spreadsheet tools like Microsoft Excel and Google Sheets can open CSV files,
              they frequently introduce frustrating side effects that corrupt data:
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="size-4 text-primary shrink-0 mt-0.5" />
                <span>
                  <strong className="text-foreground">Leading zero truncation:</strong> Excel often
                  strips leading zeros from postal codes, phone numbers, and identifier strings
                  (e.g., changing <code className="font-mono text-xs">"01234"</code> to{" "}
                  <code className="font-mono text-xs">1234</code>).
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="size-4 text-primary shrink-0 mt-0.5" />
                <span>
                  <strong className="text-foreground">Unwanted date conversions:</strong> Gene
                  names, ratios, or part codes (like{" "}
                  <code className="font-mono text-xs">"MARCH1"</code> or{" "}
                  <code className="font-mono text-xs">"1-2"</code>) get irreversibly converted into
                  dates.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="size-4 text-primary shrink-0 mt-0.5" />
                <span>
                  <strong className="text-foreground">Row limits & freeze-ups:</strong> Traditional
                  desktop spreadsheets struggle with large datasets and enforce rigid limits (e.g.,
                  1,048,576 rows).
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* How to Open, View, and Read CSV Files */}
      <section className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
            How to Open and View CSV Files in Your Browser
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Opening your files with our online CSV viewer requires zero setup and provides multiple
            convenient input methods:
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border border-border bg-card p-4 space-y-2">
            <div className="flex size-9 items-center justify-center rounded-lg bg-secondary text-primary font-bold text-xs">
              01
            </div>
            <h3 className="font-semibold text-sm text-foreground">Drag and Drop CSV Files</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Simply <strong className="text-foreground">drag and drop CSV files</strong> from your
              desktop or file manager straight into the drop zone for instantaneous rendering.
            </p>
          </div>

          <div className="rounded-lg border border-border bg-card p-4 space-y-2">
            <div className="flex size-9 items-center justify-center rounded-lg bg-secondary text-primary font-bold text-xs">
              02
            </div>
            <h3 className="font-semibold text-sm text-foreground">Upload CSV Files Locally</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Click "Choose file" to browse your hard drive. Multiple files open simultaneously in
              tabbed sheets so you can cross-reference records.
            </p>
          </div>

          <div className="rounded-lg border border-border bg-card p-4 space-y-2">
            <div className="flex size-9 items-center justify-center rounded-lg bg-secondary text-primary font-bold text-xs">
              03
            </div>
            <h3 className="font-semibold text-sm text-foreground">Paste Clipboard Data</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Copied raw tabular text from an API response, terminal log, or email? Use "Paste data"
              to parse it into a clean grid with one click.
            </p>
          </div>

          <div className="rounded-lg border border-border bg-card p-4 space-y-2">
            <div className="flex size-9 items-center justify-center rounded-lg bg-secondary text-primary font-bold text-xs">
              04
            </div>
            <h3 className="font-semibold text-sm text-foreground">Fetch from Remote URL</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Load CSV datasets directly from a public URL (like GitHub raw links or open government
              data portals) without manually saving to disk first.
            </p>
          </div>
        </div>
      </section>

      {/* Searching, Filtering, Sorting, and Inspecting */}
      <section className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
            Data Analysis and Data Inspection: Search, Filter, and Sort CSV Data
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Effective data inspection requires granular control over how records are displayed and
            examined:
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-lg border border-border bg-card p-5 space-y-2.5">
            <div className="flex items-center gap-2 text-foreground font-semibold text-sm">
              <Search className="size-4 text-primary" />
              <span>Search and Filter CSV Data</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Use global search (
              <kbd className="font-mono text-[10px] bg-secondary px-1 rounded border border-border">
                /
              </kbd>
              ) to scan every row and column simultaneously with real-time match highlighting and
              counter. Combine with per-column filters to narrow down specific cohorts instantly.
            </p>
          </div>

          <div className="rounded-lg border border-border bg-card p-5 space-y-2.5">
            <div className="flex items-center gap-2 text-foreground font-semibold text-sm">
              <ArrowDownUp className="size-4 text-primary" />
              <span>Type-Aware Sort CSV Data</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Click any column header to sort ascending or descending. The viewer automatically
              distinguishes between numeric values (sorting 2 before 10) and text strings, ensuring
              mathematically correct ordering.
            </p>
          </div>

          <div className="rounded-lg border border-border bg-card p-5 space-y-2.5">
            <div className="flex items-center gap-2 text-foreground font-semibold text-sm">
              <Layers className="size-4 text-primary" />
              <span>Column Statistics & Resizing</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Toggle the Stats panel to view column-level metrics including unique value counts,
              empty cell ratios, and numeric aggregations (minimum, maximum, and mean). Drag column
              edges to resize widths or reorder headers.
            </p>
          </div>
        </div>
      </section>

      {/* Why Browser-Based & Privacy */}
      <section className="rounded-xl border border-primary/20 bg-primary/5 p-6 sm:p-8 space-y-6">
        <div className="flex items-start gap-4">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <ShieldCheck className="size-6" />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-bold text-foreground">
              Why Use a Browser-Based CSV Viewer? The Power of Local & Private Viewing
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              When working with internal company data, customer PII, or confidential financial
              sheets, uploading files to third-party online converters presents serious compliance
              and security liabilities.
            </p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 pt-2">
          <div className="rounded-lg border border-border bg-card p-4 space-y-2">
            <div className="flex items-center gap-2 text-foreground font-medium text-xs">
              <Lock className="size-4 text-primary" />
              <span>100% In-Browser Privacy</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Your CSV files are parsed exclusively using your computer's CPU and memory. No network
              requests transmit your records, no telemetry tracks your cell contents, and nothing is
              ever stored on external servers.
            </p>
          </div>

          <div className="rounded-lg border border-border bg-card p-4 space-y-2">
            <div className="flex items-center gap-2 text-foreground font-medium text-xs">
              <Zap className="size-4 text-primary" />
              <span>Virtualized High-Speed Scrolling</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Standard web pages crash when rendering tens of thousands of table rows. Our
              virtualized windowing engine only paints the exact rows visible on your display,
              allowing you to fluidly browse 100,000+ records at 60 frames per second.
            </p>
          </div>
        </div>
      </section>

      {/* Delimiters & Encodings Supported */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
          TSV, Custom Delimiters, and Character Encodings
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Not every delimited file uses standard commas. Our tool automatically detects and allows
          manual switching between:
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="rounded-lg border border-border bg-card p-3 text-center space-y-1">
            <div className="font-mono text-sm font-semibold text-foreground">Comma (,)</div>
            <div className="text-[11px] text-muted-foreground">Standard CSV</div>
          </div>
          <div className="rounded-lg border border-border bg-card p-3 text-center space-y-1">
            <div className="font-mono text-sm font-semibold text-foreground">Tab (\t)</div>
            <div className="text-[11px] text-muted-foreground">TSV Files</div>
          </div>
          <div className="rounded-lg border border-border bg-card p-3 text-center space-y-1">
            <div className="font-mono text-sm font-semibold text-foreground">Semicolon (;)</div>
            <div className="text-[11px] text-muted-foreground">European CSV</div>
          </div>
          <div className="rounded-lg border border-border bg-card p-3 text-center space-y-1">
            <div className="font-mono text-sm font-semibold text-foreground">Pipe (|)</div>
            <div className="text-[11px] text-muted-foreground">Log & DB Dumps</div>
          </div>
        </div>
        <p className="text-xs text-muted-foreground">
          Character encoding support includes <strong className="text-foreground">UTF-8</strong>,{" "}
          <strong className="text-foreground">Windows-1252 (ANSI)</strong>,{" "}
          <strong className="text-foreground">ISO-8859-1</strong>,{" "}
          <strong className="text-foreground">UTF-16 LE</strong>, and{" "}
          <strong className="text-foreground">Shift-JIS</strong>, ensuring special symbols and
          international alphabets display without corruption.
        </p>
      </section>

      {/* Frequently Asked Questions (FAQ) */}
      <section id="faq" className="space-y-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <HelpCircle className="size-5 text-primary" />
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
              Frequently Asked Questions About CSV Viewer
            </h2>
          </div>
          <p className="text-sm text-muted-foreground">
            Everything you need to know about viewing, editing, and converting CSV files online.
          </p>
        </div>

        <Accordion
          type="single"
          collapsible
          className="w-full border rounded-lg border-border bg-card px-4"
        >
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-sm font-semibold text-foreground">
              Is my CSV data uploaded to any server?
            </AccordionTrigger>
            <AccordionContent className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              No. All parsing, filtering, and data manipulation happen strictly on your local
              machine via your browser's JavaScript engine. Your files are never sent over the
              network, ensuring complete confidentiality for sensitive financial, legal, or personal
              data.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger className="text-sm font-semibold text-foreground">
              How does this tool handle large CSV files with 100,000+ rows?
            </AccordionTrigger>
            <AccordionContent className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Unlike ordinary web tables that try to render every row at once (which locks up the
              browser), CSV Viewer uses DOM virtualization powered by TanStack Virtual. It only
              mounts the ~30 rows currently visible inside your viewport, allowing you to scroll
              through massive datasets with zero latency.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger className="text-sm font-semibold text-foreground">
              Can I edit cell values and export my changes?
            </AccordionTrigger>
            <AccordionContent className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Yes. Double-click any cell in the grid to edit its content. You can undo edits at any
              time with{" "}
              <kbd className="font-mono text-[10px] bg-secondary px-1 rounded border border-border">
                Ctrl+Z
              </kbd>
              . Once you're finished, you can export your visible or filtered rows to CSV, TSV,
              JSON, or a Markdown table, or copy the data directly to your clipboard.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger className="text-sm font-semibold text-foreground">
              What file formats and delimiters are supported?
            </AccordionTrigger>
            <AccordionContent className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              CSV Viewer supports CSV (.csv), TSV (.tsv), and plain text (.txt) files. You can
              choose between automatic delimiter detection or manually specify comma, semicolon,
              tab, or pipe delimiters. You can also toggle header rows on or off and choose from
              multiple character encodings.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5">
            <AccordionTrigger className="text-sm font-semibold text-foreground">
              Do I need to install software or create an account?
            </AccordionTrigger>
            <AccordionContent className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              No. CSV Viewer is 100% free, requires no login, no cookies, and no software
              installation. Bookmark the page and use it whenever you need to inspect or edit
              tabular data.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>
    </article>
  );
}
