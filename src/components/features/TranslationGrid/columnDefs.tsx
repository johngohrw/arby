import type { AgGridReact } from "ag-grid-react";
import type { ColDef, ICellRendererParams } from "ag-grid-community";
import type { MutableRefObject } from "react";
import type { TranslationRow, FileMap } from "../../../types/index.ts";
import { validateTranslationKey, formatTranslationKey } from "../../../utils/validators.ts";
import { filterAlphaOnly } from "../../../utils/formatters.ts";

export function createColumnDefs(
  fileMaps: FileMap[],
  gridRef: MutableRefObject<AgGridReact | null>
): ColDef<TranslationRow>[] {
  const emptyRow = createEmptyRow(fileMaps);

  return [
    {
      field: "actions",
      maxWidth: 100,
      minWidth: 100,
      cellRenderer: createActionCellRenderer(gridRef, emptyRow),
    },
    {
      field: "key",
      editable: true,
      filter: "agTextColumnFilter",
      cellEditorParams: {
        getValidationErrors: validateTranslationKey,
      },
      valueFormatter: formatTranslationKey,
    },
    ...fileMaps.map((fileMap) => ({
      field: fileMap.fieldName,
      editable: true,
      headerName: fileMap.path,
      filter: "agTextColumnFilter" as const,
    })),
  ];
}

function createEmptyRow(fileMaps: FileMap[]): TranslationRow {
  return {
    key: "",
    ...Object.fromEntries(fileMaps.map((fm) => [fm.fieldName, ""])),
  };
}

function createActionCellRenderer(
  gridRef: MutableRefObject<AgGridReact | null>,
  emptyRow: TranslationRow
) {
  return (params: ICellRendererParams<TranslationRow>) => {
    const handleAdd = () => {
      const rowIndex = params.node.rowIndex ?? 0;
      gridRef.current?.api.applyTransaction({
        add: [{ ...emptyRow }],
        addIndex: rowIndex + 1,
      });
    };

    const handleDelete = () => {
      const rowToDelete = params.data;
      if (rowToDelete) {
        gridRef.current?.api.applyTransaction({
          remove: [rowToDelete],
        });
      }
    };

    return (
      <ActionButtons onAdd={handleAdd} onDelete={handleDelete} />
    );
  };
}

interface ActionButtonsProps {
  onAdd: () => void;
  onDelete: () => void;
}

function ActionButtons({ onAdd, onDelete }: ActionButtonsProps) {
  return (
    <div className="flex gap-1 items-center h-full">
      <button
        onClick={onAdd}
        className="p-1 bg-slate-400 text-white rounded min-w-auto hover:bg-slate-500 transition-colors"
        title="Add new row below"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 5v14M5 12h14" />
        </svg>
      </button>
      <button
        onClick={onDelete}
        className="p-1 bg-red-500 text-white rounded min-w-auto hover:bg-red-600 transition-colors"
        title="Delete row"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 6h18M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
        </svg>
      </button>
    </div>
  );
}
