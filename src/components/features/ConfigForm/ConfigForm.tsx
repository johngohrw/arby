import { useCallback } from "react";
import type { ChangeEvent } from "react";
import clsx from "clsx";
import type { Config } from "../../../types/index.ts";
import { Button, TextInput } from "../../../components/ui/index.ts";
import { VALIDATION_MESSAGES } from "../../../constants/index.ts";

interface ConfigFormProps {
  config: Config;
  onConfigChange: (config: Config) => void;
  onFetch: () => void;
  showForm: boolean;
  onToggleForm: () => void;
}

export function ConfigForm({
  config,
  onConfigChange,
  onFetch,
  showForm,
  onToggleForm,
}: ConfigFormProps) {
  const updateField = useCallback(
    <K extends keyof Config>(field: K, value: Config[K]) => {
      onConfigChange({ ...config, [field]: value });
    },
    [config, onConfigChange]
  );

  const validateAndFetch = useCallback(() => {
    if (!config.privateToken) {
      alert(VALIDATION_MESSAGES.privateToken);
      return;
    }
    if (!config.projectId) {
      alert(VALIDATION_MESSAGES.projectId);
      return;
    }
    if (!config.gitlabEndpoint) {
      alert(VALIDATION_MESSAGES.gitlabEndpoint);
      return;
    }
    if (!config.branch) {
      alert(VALIDATION_MESSAGES.branch);
      return;
    }
    if (!config.filePaths) {
      alert(VALIDATION_MESSAGES.filePaths);
      return;
    }
    onFetch();
  }, [config, onFetch]);

  return (
    <div
      className={clsx(
        `fixed top-0 z-10 w-full max-w-[768px] duration-300`,
        showForm && "top-4"
      )}
      style={{
        left: "50%",
        transform: `translate(-50%, ${showForm ? 0 : -100}%)`,
      }}
    >
      <div
        className={clsx(
          "border border-slate-300 rounded-md flex flex-col p-4 w-full bg-slate-50",
          showForm && "shadow-xl"
        )}
      >
        <TextInput
          label="GitLab Endpoint"
          value={config.gitlabEndpoint}
          onChange={(e: ChangeEvent<HTMLInputElement>) => updateField("gitlabEndpoint", e.target.value)}
        />
        <TextInput
          label="Project ID"
          value={config.projectId}
          onChange={(e: ChangeEvent<HTMLInputElement>) => updateField("projectId", e.target.value)}
        />
        <TextInput
          label="Private Token"
          value={config.privateToken}
          onChange={(e: ChangeEvent<HTMLInputElement>) => updateField("privateToken", e.target.value)}
        />
        <TextInput
          label="Branch"
          value={config.branch}
          onChange={(e: ChangeEvent<HTMLInputElement>) => updateField("branch", e.target.value)}
        />
        <TextInput
          label="File Paths"
          value={config.filePaths}
          onChange={(e: ChangeEvent<HTMLInputElement>) => updateField("filePaths", e.target.value)}
        />
        
        <Button className="mt-2" onClick={validateAndFetch}>
          Fetch Translations
        </Button>
        
        <Button
          onClick={onToggleForm}
          className={clsx(
            "bg-slate-500 text-xs absolute -bottom-3 left-[50%] translate-x-[-50%] translate-y-[100%] shadow-md",
            showForm && "-bottom-2!"
          )}
        >
          {showForm ? "Hide" : "Fetcher"}
        </Button>
      </div>
    </div>
  );
}
