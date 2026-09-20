function escapeCell(value: string, delimiter: string): string {
  if (value.includes(delimiter) || value.includes('"') || /[\r\n]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

export function toDelimited(columns: string[], rows: string[][], delimiter: string): string {
  const head = columns.map((c) => escapeCell(c, delimiter)).join(delimiter);
  const body = rows.map((r) => r.map((c) => escapeCell(c ?? "", delimiter)).join(delimiter));
  return [head, ...body].join("\n");
}

export function toJson(columns: string[], rows: string[][]): string {
  const objects = rows.map((r) => {
    const o: Record<string, string> = {};
    columns.forEach((c, i) => {
      o[c] = r[i] ?? "";
    });
    return o;
  });
  return JSON.stringify(objects, null, 2);
}

export function toMarkdown(columns: string[], rows: string[][]): string {
  const esc = (v: string) => (v ?? "").replace(/\|/g, "\\|").replace(/\n/g, " ");
  const lines = [
    `| ${columns.map(esc).join(" | ")} |`,
    `| ${columns.map(() => "---").join(" | ")} |`,
    ...rows.map((r) => `| ${columns.map((_, i) => esc(r[i] ?? "")).join(" | ")} |`),
  ];
  return lines.join("\n");
}

export function download(filename: string, content: string, mime: string) {
  const blob = new Blob([content], { type: `${mime};charset=utf-8` });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function baseName(name: string): string {
  return name.replace(/\.[^.]+$/, "") || "data";
}
