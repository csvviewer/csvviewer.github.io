import type { ColumnKind, ColumnStats } from "./types";

const BOOLS = new Set(["true", "false", "yes", "no", "0", "1"]);

export function toNumber(value: string): number | null {
  if (value.trim() === "") return null;
  const cleaned = value.replace(/[\s,_]/g, "").replace(/^\$|%$/g, "");
  if (cleaned === "" || !/^-?\d*\.?\d+(e-?\d+)?$/i.test(cleaned)) return null;
  const n = Number(cleaned);
  return Number.isFinite(n) ? n : null;
}

function looksLikeDate(value: string): boolean {
  if (!/\d{4}|\d{1,2}[/-]\d{1,2}/.test(value)) return false;
  return !Number.isNaN(Date.parse(value));
}

export function analyzeColumn(rows: string[][], index: number, name: string): ColumnStats {
  const sampleLimit = 5000;
  const seen = new Set<string>();
  let empty = 0;
  let numeric = 0;
  let dateish = 0;
  let boolish = 0;
  let filled = 0;
  let min = Infinity;
  let max = -Infinity;
  let sum = 0;

  for (let i = 0; i < rows.length; i++) {
    const value = rows[i]?.[index] ?? "";
    if (seen.size < 50_000) seen.add(value);
    if (value.trim() === "") {
      empty++;
      continue;
    }
    filled++;
    const n = toNumber(value);
    if (n !== null) {
      numeric++;
      if (n < min) min = n;
      if (n > max) max = n;
      sum += n;
    } else if (i < sampleLimit && looksLikeDate(value)) {
      dateish++;
    }
    if (BOOLS.has(value.trim().toLowerCase())) boolish++;
  }

  let kind: ColumnKind = "text";
  if (filled === 0) kind = "empty";
  else if (numeric / filled > 0.9) kind = "number";
  else if (boolish / filled > 0.9) kind = "boolean";
  else if (dateish > 0 && dateish / Math.min(filled, sampleLimit) > 0.8) kind = "date";

  const stats: ColumnStats = {
    index,
    name,
    kind,
    empty,
    unique: seen.size,
  };

  if (kind === "number" && numeric > 0) {
    stats.min = min;
    stats.max = max;
    stats.mean = sum / numeric;
  }

  return stats;
}

export function formatNumber(n: number): string {
  if (!Number.isFinite(n)) return "—";
  const abs = Math.abs(n);
  const digits = abs >= 1000 || Number.isInteger(n) ? 0 : abs >= 1 ? 2 : 4;
  return n.toLocaleString(undefined, { maximumFractionDigits: digits });
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}
