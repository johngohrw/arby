import { forwardRef } from "react";
import { AgGridReact } from "ag-grid-react";
import type { TranslationRow, FileMap } from "../../../types/index.ts";
import { useGridConfig } from "./useGridConfig.ts";

interface TranslationGridProps {
  rows: TranslationRow[];
  fileMaps: FileMap[];
}

export const TranslationGrid = forwardRef<AgGridReact, TranslationGridProps>(
  function TranslationGrid({ rows, fileMaps }, ref) {
    const { columnDefs, autoSizeStrategy } = useGridConfig({
      fileMaps,
      gridRef: ref as React.MutableRefObject<AgGridReact | null>,
    });

    return (
      <div className="h-full p-4">
        <AgGridReact<TranslationRow>
          ref={ref}
          rowData={rows}
          tooltipHideDelay={3000}
          tooltipShowDelay={0}
          columnDefs={columnDefs}
          autoSizeStrategy={autoSizeStrategy}
        />
      </div>
    );
  }
);
