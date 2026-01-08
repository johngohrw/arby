import { useEffect, useState, type ComponentProps } from "react";

import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";

import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import { getGitFile } from "../utils/git";
import clsx from "clsx";

ModuleRegistry.registerModules([AllCommunityModule]);

export const ArbyApp = () => {
  const [data, setData] = useState<{ key: string }[]>([]);
  const [colDefs, setColDefs] = useState([{ field: "key" }]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [showForm, setShowForm] = useState(true);

  const [formVals, setFormVals] = useState({
    gitlabEndpoint: "https://git.alphawave-innovations.com",
    privateToken: "",
    projectId: "37",
    branch: "test/translation",
    filePaths: "arb/app_en.arb,arb/app_zh.arb,arb/app_ms.arb",
  });

  const handleFetch = () => {
    if (!formVals.privateToken) {
      alert("Private token is required");
      return;
    }
    if (!formVals.projectId) {
      alert("Project ID is required");
      return;
    }
    if (!formVals.gitlabEndpoint) {
      alert("GitLab Endpoint is required");
      return;
    }
    if (!formVals.branch) {
      alert("Branch is required");
      return;
    }
    if (!formVals.filePaths) {
      alert("File Paths are required");
      return;
    }
    const fetch = async () => {
      const { rows, filePaths } = await fetchAndParseArbsIntoRows();
      console.log("rows", rows);
      console.log("filePaths", filePaths);
      setData(rows);
      const _colDefs = [
        { field: "key", editable: true, filter: "agTextColumnFilter" },
        ...filePaths.map((path) => ({
          field: filterAlphaOnly(path),
          editable: true,
          headerName: path,
          originalFilePath: path,
          filter: "agTextColumnFilter",
        })),
      ];
      console.log("_colDefs", _colDefs);
      setColDefs(_colDefs);
      setDataLoaded(true);
    };
    fetch();
  };

  const fetchAndParseArbsIntoRows = async () => {
    const inputFilePaths = [
      "arb/app_en.arb",
      "arb/app_zh.arb",
      "arb/app_ms.arb",
    ];

    const fetchPromises = inputFilePaths.map(async (filePath) => {
      const decodedContent = await getGitFile({
        gitlabEndpoint: formVals.gitlabEndpoint,
        branch: formVals.branch,
        filePath: filePath,
        privateToken: formVals.privateToken,
        projectId: formVals.projectId,
      });

      return { filePath, decodedContent };
    });

    const results = await Promise.all(fetchPromises);
    const parsed = results.map((o) => ({
      ...o,
      decodedContent: JSON.parse(o.decodedContent ?? "{}"),
    }));
    console.log("parsed", parsed);
    const allKeys = Array.from(
      new Set(parsed.map((lang) => Object.keys(lang.decodedContent)).flat())
    );
    console.log("allKeys", allKeys);
    const filePaths = parsed.map((o) => o.filePath);
    console.log("filePaths", filePaths);

    // pre-fill
    const emptyFilePathsObj = Object.fromEntries(
      filePaths.map((path) => [filterAlphaOnly(path), undefined])
    );
    const vals = Object.fromEntries(
      allKeys.map((key) => [key, { ...emptyFilePathsObj }])
    );

    console.log("vals", vals);

    // actual-fill
    parsed.forEach((o) => {
      const dict = o.decodedContent;
      const _keys = Object.keys(dict);
      const lang = filterAlphaOnly(o.filePath);
      _keys.forEach((key) => {
        vals[key][lang] = dict[key];
        vals[key][`prev_${lang}`] = dict[key];
      });
    });

    console.log("parsed", parsed);

    const rows = allKeys.map((key) => ({
      key,
      ...vals[key as any],
    }));

    console.log("rows", rows);

    return { rows, filePaths };
  };

  return (
    <div className="flex flex-col h-full">
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
        <div className="border border-slate-300 rounded-md shadow-xl  flex flex-col p-4 w-full bg-slate-50">
          <TextInput
            label="GitLab Endpoint"
            value={formVals.gitlabEndpoint}
            onChange={(e) =>
              setFormVals((p) => ({ ...p, gitlabEndpoint: e.target.value }))
            }
          />
          <TextInput
            label="Project ID"
            value={formVals.projectId}
            onChange={(e) =>
              setFormVals((p) => ({ ...p, branch: e.target.value }))
            }
          />
          <TextInput
            label="Private Token"
            value={formVals.privateToken}
            onChange={(e) =>
              setFormVals((p) => ({ ...p, privateToken: e.target.value }))
            }
          />
          <TextInput
            label="Branch"
            value={formVals.branch}
            onChange={(e) =>
              setFormVals((p) => ({ ...p, branch: e.target.value }))
            }
          />
          <TextInput
            label="File Paths"
            value={formVals.filePaths}
            onChange={(e) =>
              setFormVals((p) => ({ ...p, filePaths: e.target.value }))
            }
          />
          <Button className="mt-2" onClick={handleFetch}>
            Fetch Translations
          </Button>
          <Button
            onClick={() => setShowForm((p) => !p)}
            className={clsx(
              "bg-slate-500 text-xs absolute -bottom-3 left-[50%] translate-x-[-50%] translate-y-[100%] shadow-md",
              showForm && "-bottom-2!"
            )}
          >
            {showForm ? "Hide" : "Fetcher"}
          </Button>
        </div>
      </div>
      <div className="p-4 pb-0">
        <div>
          <span className="font-bold">Arby</span>
          <span className="text-xsm">™</span>
        </div>
      </div>
      {dataLoaded ? (
        <div className="h-full p-4">
          <AgGridReact<any>
            rowData={data}
            columnDefs={colDefs}
            autoSizeStrategy={{
              type: "fitGridWidth",
              defaultMinWidth: 100,
              columnLimits: [
                {
                  colId: "key",
                  maxWidth: 280,
                },
              ],
            }}
            onCellValueChanged={(e) => {
              console.log("onCellValueChanged", e);
              const newData = e.data;
              const rowIndex = e.rowIndex;
              if (rowIndex) {
                setData((p) => {
                  const newRows = [...p];
                  newRows[rowIndex] = newData;
                  return newRows;
                });
              }
            }}
          />
        </div>
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <span className="text-sm text-slate-400">Try fetching some data</span>
        </div>
      )}
    </div>
  );
};

function filterAlphaOnly(str: string): string {
  return str.replace(/[^a-zA-Z]/g, "");
}

export const TextInput = ({
  label,
  ...rest
}: { label: string } & ComponentProps<"input">) => {
  return (
    <div className="flex flex-row items-center mb-2">
      <div className="font-medium mr-2 whitespace-nowrap text-sm w-64 shrink-0">
        {label}
      </div>
      <input
        className="border border-slate-400 rounded px-2 py-1 text-sm w-full"
        {...rest}
      />
    </div>
  );
};

export const Button = ({
  children,
  className,
  ...rest
}: ComponentProps<"button">) => {
  return (
    <button
      className={clsx(
        "bg-indigo-500 text-white px-3 py-1.5 font-semibold rounded-lg min-w-16 text-sm cursor-pointer disabled:bg-slate-300 disabled:text-slate-500 disabled:cursor-not-allowed",
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
};
