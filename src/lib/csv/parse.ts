import Papa from "papaparse";
import type { ParseOptions, Sheet } from "./types";

const DELIMS = [",", ";", "\t", "|"];

export function detectDelimiter(sample: string): string {
  const line = sample.split(/\r?\n/).find((l) => l.trim().length > 0) ?? "";
  let best = ",";
  let bestCount = -1;
  for (const d of DELIMS) {
    const count = line.split(d).length - 1;
    if (count > bestCount) {
      bestCount = count;
      best = d;
    }
  }
  return bestCount > 0 ? best : ",";
}

function makeId() {
  return Math.random().toString(36).slice(2, 10);
}

export function parseText(
  raw: string,
  name: string,
  options: ParseOptions,
  bytes = raw.length,
): Sheet {
  const delimiter = options.delimiter === "auto" ? detectDelimiter(raw.slice(0, 64_000)) : options.delimiter;

  const result = Papa.parse<string[]>(raw, {
    delimiter,
    skipEmptyLines: "greedy",
    dynamicTyping: false,
  });

  const data = (result.data as unknown[][]).map((r) => (r ?? []).map((c) => (c == null ? "" : String(c))));

  let columns: string[];
  let rows: string[][];

  if (options.hasHeader && data.length > 0) {
    columns = data[0].map((c, i) => (c.trim() === "" ? `Column ${i + 1}` : c.trim()));
    rows = data.slice(1);
  } else {
    const width = data.reduce((m, r) => Math.max(m, r.length), 0);
    columns = Array.from({ length: width }, (_, i) => `Column ${i + 1}`);
    rows = data;
  }

  const width = Math.max(columns.length, rows.reduce((m, r) => Math.max(m, r.length), 0));
  while (columns.length < width) columns.push(`Column ${columns.length + 1}`);
  const normalized = rows.map((r) => {
    if (r.length === width) return r;
    const copy = r.slice(0, width);
    while (copy.length < width) copy.push("");
    return copy;
  });

  return {
    id: makeId(),
    name,
    raw,
    columns,
    rows: normalized,
    options,
    detectedDelimiter: delimiter,
    errors: (result.errors ?? []).slice(0, 5).map((e) => e.message),
    bytes,
  };
}

export async function readFile(file: File, encoding: string): Promise<string> {
  const buffer = await file.arrayBuffer();
  try {
    return new TextDecoder(encoding, { fatal: false }).decode(buffer);
  } catch {
    return new TextDecoder("utf-8").decode(buffer);
  }
}

export async function parseFile(file: File, options: ParseOptions): Promise<Sheet> {
  const raw = await readFile(file, options.encoding);
  return parseText(raw, file.name, options, file.size);
}
