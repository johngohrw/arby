import type { FileContent, ParsedFile, TranslationRow, FileMap } from "../types/index.ts";
import { filterAlphaOnly } from "../utils/formatters.ts";

export function parseTranslationFiles(files: FileContent[]): {
  rows: TranslationRow[];
  fileMaps: FileMap[];
} {
  const parsed: ParsedFile[] = files.map((file) => ({
    ...file,
    decodedContent: JSON.parse(file.decodedContent ?? "{}"),
  }));

  const allKeys = Array.from(
    new Set(parsed.flatMap((lang) => Object.keys(lang.decodedContent)))
  );

  const filePaths = parsed.map((o) => o.filePath);

  // Pre-fill structure
  const emptyFilePathsObj = Object.fromEntries(
    filePaths.map((path) => [filterAlphaOnly(path), undefined])
  );
  
  const vals: Record<string, Record<string, string | undefined>> = Object.fromEntries(
    allKeys.map((key) => [key, { ...emptyFilePathsObj }])
  );

  // Actual fill
  parsed.forEach((file) => {
    const dict = file.decodedContent;
    const lang = filterAlphaOnly(file.filePath);
    Object.entries(dict).forEach(([key, value]) => {
      if (vals[key]) {
        vals[key][lang] = value;
        vals[key][`prev_${lang}`] = value;
      }
    });
  });

  const rows = allKeys.map((key) => ({
    key,
    ...vals[key],
  }));

  const fileMaps = filePaths.map((path) => ({
    path,
    fieldName: filterAlphaOnly(path),
  }));

  return { rows, fileMaps };
}

export function sortTranslationRows(rows: TranslationRow[]): TranslationRow[] {
  const topKeysMap: Record<string, TranslationRow> = {};
  const atKeysMap: Record<string, TranslationRow> = {};
  const normalKeysMap: Record<string, TranslationRow> = {};

  rows.forEach((row) => {
    if (row.key.startsWith("@@")) {
      topKeysMap[row.key] = row;
    } else if (row.key.startsWith("@")) {
      atKeysMap[row.key] = row;
    } else {
      normalKeysMap[row.key] = row;
    }
  });

  const sortedRows: TranslationRow[] = [];
  
  // Include all @@ keys first
  Object.values(topKeysMap).forEach((row) => sortedRows.push(row));
  
  // Go through all normal keys
  Object.values(normalKeysMap).forEach((row) => {
    sortedRows.push(row);
    // If there's a corresponding @ for this normal key, push it right after
    const atKey = `@${row.key}`;
    if (atKeysMap[atKey]) {
      sortedRows.push(atKeysMap[atKey]);
    }
  });

  return sortedRows;
}

export function formatFilesForCommit(
  sortedRows: TranslationRow[],
  fileMaps: FileMap[]
): { path: string; content: string }[] {
  return fileMaps.map(({ path, fieldName }) => {
    const lines = sortedRows
      .map((row, index) => {
        const isLastLine = index === sortedRows.length - 1;
        const isAtKey = row.key.startsWith("@") && !row.key.startsWith("@@");
        const value = row[fieldName];

        if (!value) return undefined;

        const formattedVal = isAtKey ? JSON.stringify(value) : `"${value}"`;
        return `  "${row.key}": ${formattedVal}${isLastLine ? "" : ","}`;
      })
      .filter((line): line is string => line !== undefined);

    const joined = `{\n${lines.join("\n")}\n}`;
    const safeJoined = joined.replace(/,\n}$/, "\n}"); // Remove trailing comma

    return { path, content: safeJoined };
  });
}
