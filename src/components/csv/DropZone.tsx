import { useRef, useState } from "react";
import { FileUp, ClipboardPaste, Link2, Sparkles } from "lucide-react";
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
        "relative rounded-xl border-2 border-dashed transition-colors",
        over ? "border-primary bg-primary/5" : "border-border bg-card/40",
        compact ? "p-6" : "p-10 sm:p-16",
      ].join(" ")}
    >
      <input
        ref={inputRef}
        type="file"
        accept=".csv,.tsv,.txt,text/csv,text/plain"
        multiple
        className="hidden"
        onChange={(e) => {
          const files = Array.from(e.target.files ?? []);
          if (files.length) onFiles(files);
          e.target.value = "";
        }}
      />

      <div className="flex flex-col items-center gap-4 text-center">
        <div className="flex size-14 items-center justify-center rounded-full border border-border bg-secondary text-primary">
          <FileUp className="size-6" />
        </div>
        <div>
          <p className="text-lg font-semibold text-foreground">Drop a CSV file here</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Or choose a file, paste text, or load from a URL. Everything stays on your device.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2">
          <Button onClick={() => inputRef.current?.click()}>
            <FileUp className="size-4" /> Choose file
          </Button>

          <Dialog open={pasteOpen} onOpenChange={setPasteOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <ClipboardPaste className="size-4" /> Paste data
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Paste CSV text</DialogTitle>
                <DialogDescription>Paste rows copied from a spreadsheet or a text file.</DialogDescription>
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
              <Button variant="outline">
                <Link2 className="size-4" /> From URL
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Load a CSV from a link</DialogTitle>
                <DialogDescription>The file is fetched straight into your browser.</DialogDescription>
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

          <Button variant="ghost" onClick={onSample}>
            <Sparkles className="size-4" /> Try an example
          </Button>
        </div>
      </div>
    </div>
  );
}
