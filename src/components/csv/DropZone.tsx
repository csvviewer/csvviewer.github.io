import { useRef, useState } from "react";
import { FileUp, ClipboardPaste, Link2, Sparkles, FileSpreadsheet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const SUPPORTED_FORMATS = [
  {
    ext: ".csv",
    label: "CSV",
    delimiter: ",",
    desc: "Comma-separated values",
    color: "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
    dot: "bg-emerald-500",
  },
  {
    ext: ".tsv",
    label: "TSV",
    delimiter: "⇥ tab",
    desc: "Tab-separated values",
    color: "border-sky-500/30 bg-sky-500/10 text-sky-700 dark:text-sky-300",
    dot: "bg-sky-500",
  },
  {
    ext: ".tab",
    label: "TAB",
    delimiter: "⇥ tab",
    desc: "Tab-delimited text",
    color: "border-cyan-500/30 bg-cyan-500/10 text-cyan-700 dark:text-cyan-300",
    dot: "bg-cyan-500",
  },
  {
    ext: ".txt",
    label: "TXT",
    delimiter: "; / custom",
    desc: "Delimited plain text",
    color: "border-violet-500/30 bg-violet-500/10 text-violet-700 dark:text-violet-300",
    dot: "bg-violet-500",
  },
  {
    ext: ".psv",
    label: "PSV",
    delimiter: "| pipe",
    desc: "Pipe-separated values",
    color: "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300",
    dot: "bg-amber-500",
  },
] as const;

type Props = {
  onFiles: (files: File[]) => void;
  onText: (text: string, name: string) => void;
  onUrl: (url: string) => void;
  onSample: () => void;
  compact?: boolean;
};

export function DropZone({ onFiles, onText, onUrl, onSample, compact }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [over, setOver] = useState(false);
  const [pasteOpen, setPasteOpen] = useState(false);
  const [urlOpen, setUrlOpen] = useState(false);
  const [pasted, setPasted] = useState("");
  const [url, setUrl] = useState("");

  return (
    <div
      role="region"
      aria-label="CSV and delimited data file upload area"
      onDragOver={(e) => {
        e.preventDefault();
        setOver(true);
      }}
      onDragLeave={() => setOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setOver(false);
        const files = Array.from(e.dataTransfer.files);
        if (files.length) onFiles(files);
      }}
      className={[
        "relative rounded-xl border-2 border-dashed transition-all duration-200",
        over
          ? "border-primary bg-primary/5 ring-4 ring-primary/10 scale-[1.005]"
          : "border-border bg-card/40 hover:border-border/80 hover:bg-card/60",
        compact ? "p-6" : "p-10 sm:p-14",
      ].join(" ")}
    >
      <input
        ref={inputRef}
        type="file"
        accept=".csv,.tsv,.tab,.txt,.psv,text/csv,text/tab-separated-values,text/plain"
        multiple
        className="hidden"
        onChange={(e) => {
          const files = Array.from(e.target.files ?? []);
          if (files.length) onFiles(files);
          e.target.value = "";
        }}
      />

      <div className="flex flex-col items-center gap-4 text-center">
        <div
          className={[
            "flex size-14 items-center justify-center rounded-full border transition-all duration-200",
            over
              ? "border-primary bg-primary/20 text-primary scale-110 shadow-md"
              : "border-border bg-secondary text-primary",
          ].join(" ")}
        >
          <FileUp
            className={`size-6 transition-transform duration-200 ${over ? "-translate-y-0.5" : ""}`}
          />
        </div>
        <div>
          <p className="text-lg font-semibold text-foreground">
            Drop CSV, TSV, or tabular files here
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Or choose a file, paste text, or load from a URL. Everything stays private on your device.
          </p>
        </div>

        {/* Visual Semantic Format Chips with color coding and delimiter indicators */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 pt-0.5">
          <span className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
            <FileSpreadsheet className="size-3.5 text-primary/70" />
            <span>Supported formats:</span>
          </span>
          <div
            className="flex flex-wrap items-center justify-center gap-1.5"
            role="list"
            aria-label="Supported file formats and delimiters"
          >
            {SUPPORTED_FORMATS.map((f) => (
              <div
                key={f.ext}
                role="listitem"
                title={`${f.label} (${f.desc}) — delimiter: ${f.delimiter}`}
                className={`inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 text-xs font-medium shadow-2xs transition-all duration-150 hover:scale-105 cursor-default ${f.color}`}
              >
                <span className={`size-1.5 rounded-full ${f.dot}`} aria-hidden="true" />
                <span className="font-mono font-bold tracking-tight">{f.ext}</span>
                <span className="text-[10px] font-mono opacity-80">({f.delimiter})</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
          <Button onClick={() => inputRef.current?.click()} className="gap-1.5 shadow-sm">
            <FileUp className="size-4" /> Choose CSV / TSV file
          </Button>

          <Button
            variant="secondary"
            onClick={onSample}
            className="gap-1.5 border border-border/80 shadow-sm"
          >
            <Sparkles className="size-4 text-emerald-500" /> Try sample data
          </Button>

          <Dialog open={pasteOpen} onOpenChange={setPasteOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="gap-1.5">
                <ClipboardPaste className="size-4" /> Paste data
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Paste tabular data (CSV, TSV, TXT)</DialogTitle>
                <DialogDescription>
                  Paste rows copied from a spreadsheet or a text file (.csv, .tsv, .txt).
                </DialogDescription>
              </DialogHeader>
              <Textarea
                value={pasted}
                onChange={(e) => setPasted(e.target.value)}
                placeholder={"name,score\nada,99"}
                className="min-h-48 font-mono text-xs"
              />
              <DialogFooter>
                <Button
                  disabled={pasted.trim() === ""}
                  onClick={() => {
                    onText(pasted, "Pasted data");
                    setPasted("");
                    setPasteOpen(false);
                  }}
                >
                  Open table
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog open={urlOpen} onOpenChange={setUrlOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="gap-1.5">
                <Link2 className="size-4" /> From URL
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Load CSV or TSV from a link</DialogTitle>
                <DialogDescription>
                  The file (.csv, .tsv, .txt) is fetched straight into your browser.
                </DialogDescription>
              </DialogHeader>
              <Input
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com/data.csv"
              />
              <DialogFooter>
                <Button
                  disabled={url.trim() === ""}
                  onClick={() => {
                    onUrl(url.trim());
                    setUrl("");
                    setUrlOpen(false);
                  }}
                >
                  Load
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
