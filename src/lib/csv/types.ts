export type Delimiter = "auto" | "," | ";" | "\t" | "|";

export type ParseOptions = {
  delimiter: Delimiter;
  hasHeader: boolean;
  encoding: string;
};

export const defaultParseOptions: ParseOptions = {
  delimiter: "auto",
  hasHeader: true,
  encoding: "utf-8",
};

export type Sheet = {
  id: string;
  name: string;
  /** Original raw text, kept so options changes can re-parse without re-reading the file. */
  raw: string;
  columns: string[];
  rows: string[][];
  options: ParseOptions;
  detectedDelimiter: string;
  errors: string[];
  bytes: number;
};

export type SortState = { column: number; dir: "asc" | "desc" } | null;

export type ColumnKind = "number" | "date" | "boolean" | "text" | "empty";

export type ColumnStats = {
  index: number;
  name: string;
  kind: ColumnKind;
  empty: number;
  unique: number;
  min?: number;
  max?: number;
  mean?: number;
};
