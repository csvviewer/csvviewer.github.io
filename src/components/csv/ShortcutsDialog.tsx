import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const shortcuts: [string, string][] = [
  ["/  or  Ctrl + F", "Focus the search box"],
  ["Enter", "Jump to the next match"],
  ["Shift + Enter", "Jump to the previous match"],
  ["Ctrl + G", "Go to a row number"],
  ["Ctrl + Z", "Undo the last cell edit"],
  ["Double-click a cell", "Edit its value"],
  ["Drag a column header", "Reorder columns"],
  ["Drag a header edge", "Resize a column"],
  ["?", "Open this help"],
  ["Esc", "Close dialogs / cancel editing"],
];

export function ShortcutsDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Keyboard shortcuts</DialogTitle>
        </DialogHeader>
        <dl className="divide-y divide-border">
          {shortcuts.map(([keys, label]) => (
            <div key={keys} className="flex items-center justify-between gap-4 py-2">
              <dt className="text-sm text-muted-foreground">{label}</dt>
              <dd className="shrink-0 rounded border border-border bg-secondary px-2 py-0.5 font-mono text-[11px] text-foreground">
                {keys}
              </dd>
            </div>
          ))}
        </dl>
      </DialogContent>
    </Dialog>
  );
}
