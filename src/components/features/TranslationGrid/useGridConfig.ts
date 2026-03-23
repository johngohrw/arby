import { useMemo } from "react";
import type { AgGridReact } from "ag-grid-react";
import type { MutableRefObject } from "react";
import type { TranslationRow, FileMap } from "../../../types/index.ts";
import { createColumnDefs } from "./columnDefs.tsx";

interface UseGridConfigProps {
  fileMaps: FileMap[];
  gridRef: MutableRefObject<AgGridReact | null>;
}

export function useGridConfig({ fileMaps, gridRef }: UseGridConfigProps) {
  const columnDefs = useMemo(() => {
    return createColumnDefs(fileMaps, gridRef);
  }, [fileMaps, gridRef]);

  const autoSizeStrategy = useMemo(
    () => ({
      type: "fitGridWidth" as const,
      defaultMinWidth: 100,
      columnLimits: [
        {
          colId: "key",
          maxWidth: 280,
        },
      ],
    }),
    []
  );

  return { columnDefs, autoSizeStrategy };
}
