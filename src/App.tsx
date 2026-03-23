import "./lib/ag-grid";
import { useState, useRef, useCallback } from "react";
import type { AgGridReact } from "ag-grid-react";
import type { TranslationRow } from "./types/index.ts";
import { DEFAULT_CONFIG, LOCAL_STORAGE_KEY } from "./constants/index.ts";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { useTranslations } from "./hooks/useTranslations";
import { ConfigForm } from "./components/features/ConfigForm";
import { TranslationGrid } from "./components/features/TranslationGrid";
import { Button, TextInputBare } from "./components/ui/index.ts";

export function App() {
  const { value: config, setValue: setConfig, isHydrated } = useLocalStorage(
    LOCAL_STORAGE_KEY,
    DEFAULT_CONFIG
  );
  
  const [showForm, setShowForm] = useState(true);
  const gridRef = useRef<AgGridReact>(null);
  
  const {
    rows,
    fileMaps,
    isLoading,
    isSubmitting,
    dataLoaded,
    fetchData,
    submitData,
  } = useTranslations(config);

  const handleFetch = useCallback(() => {
    fetchData();
  }, [fetchData]);

  const handleSubmit = useCallback(() => {
    const allRows: TranslationRow[] = [];
    gridRef.current?.api.forEachNode((node) => {
      if (node.data) allRows.push(node.data);
    });
    submitData(allRows);
  }, [submitData]);

  const toggleForm = useCallback(() => {
    setShowForm((prev) => !prev);
  }, []);

  if (!isHydrated) {
    return null;
  }

  return (
    <div className="flex flex-col h-full">
      <ConfigForm
        config={config}
        onConfigChange={setConfig}
        onFetch={handleFetch}
        showForm={showForm}
        onToggleForm={toggleForm}
      />

      <div className="p-4 pb-0">
        <div>
          <span className="font-bold">Arby</span>
          <span className="text-xsm">™</span>
        </div>
      </div>

      {dataLoaded ? (
        <TranslationGrid ref={gridRef} rows={rows} fileMaps={fileMaps} />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <span className="text-sm text-slate-400">Try fetching some data</span>
        </div>
      )}

      <div className="p-4 pt-0 flex justify-end">
        <TextInputBare
          placeholder="Commit Message"
          value={config.commitMessage}
          onChange={(e) =>
            setConfig((prev) => ({ ...prev, commitMessage: e.target.value }))
          }
          className="mr-2"
        />
        <Button
          disabled={config.commitMessage.length === 0 || isSubmitting}
          onClick={handleSubmit}
        >
          Update
        </Button>
      </div>
    </div>
  );
}
