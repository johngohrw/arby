import { useState, useCallback, useRef } from "react";
import type { Config, TranslationRow, FileMap } from "../types/index.ts";
import { fetchTranslationFiles, commitTranslations } from "../services/gitlab.ts";
import { parseTranslationFiles, sortTranslationRows, formatFilesForCommit } from "../services/translations.ts";

interface UseTranslationsReturn {
  rows: TranslationRow[];
  fileMaps: FileMap[];
  isLoading: boolean;
  isSubmitting: boolean;
  error: string | null;
  dataLoaded: boolean;
  fetchData: () => Promise<void>;
  submitData: (rows: TranslationRow[]) => Promise<void>;
}

export function useTranslations(config: Config): UseTranslationsReturn {
  const [rows, setRows] = useState<TranslationRow[]>([]);
  const [fileMaps, setFileMaps] = useState<FileMap[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dataLoaded, setDataLoaded] = useState(false);
  const hasFetchedRef = useRef(false);

  const fetchData = useCallback(async () => {
    if (hasFetchedRef.current) return;
    hasFetchedRef.current = true;
    
    setIsLoading(true);
    setError(null);

    try {
      const filePaths = config.filePaths.split(",").map((p) => p.trim()).filter(Boolean);
      const files = await fetchTranslationFiles({
        gitlabEndpoint: config.gitlabEndpoint,
        projectId: config.projectId,
        privateToken: config.privateToken,
        branch: config.branch,
        filePaths,
      });

      const { rows: parsedRows, fileMaps: parsedFileMaps } = parseTranslationFiles(files);
      
      setRows(parsedRows);
      setFileMaps(parsedFileMaps);
      setDataLoaded(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch translations");
      hasFetchedRef.current = false;
    } finally {
      setIsLoading(false);
    }
  }, [config]);

  const submitData = useCallback(async (currentRows: TranslationRow[]) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const sortedRows = sortTranslationRows(currentRows);
      const files = formatFilesForCommit(sortedRows, fileMaps);

      await commitTranslations({
        gitlabEndpoint: config.gitlabEndpoint,
        projectId: config.projectId,
        privateToken: config.privateToken,
        branch: config.branch,
        commitMessage: config.commitMessage,
        files,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to commit translations");
    } finally {
      setIsSubmitting(false);
    }
  }, [config, fileMaps]);

  return {
    rows,
    fileMaps,
    isLoading,
    isSubmitting,
    error,
    dataLoaded,
    fetchData,
    submitData,
  };
}
