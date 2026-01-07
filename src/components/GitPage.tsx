import { useEffect, useState } from "react";

import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";

import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import { getGitFile } from "../utils/git";

ModuleRegistry.registerModules([AllCommunityModule]);

export const GitPage = () => {
  const [data, setData] = useState<{ key: string }[]>([]);
  const [colDefs, setColDefs] = useState([{ field: "key" }]);
  const [show, setShow] = useState(false);

  const [formVals, setFormVals] = useState({
    gitlabEndpoint: "https://git.alphawave-innovations.com",
    privateToken: "",
    projectId: "37",
    branch: "test/translation",
  });

  useEffect(() => {
    const fetch = async () => {
      const { rows, langs } = await fetchAndParseArbsIntoRows();
      // console.log("rows", rows);
      setData(rows);
      const _coldfs = [
        { field: "key" },
        ...langs.map((lang) => ({
          field: filterAlphaOnly(lang),
          headerName: lang,
        })),
      ];
      // console.log("_coldfs", _coldfs);
      setColDefs(_coldfs);
      setShow(true);
    };
    fetch();
  }, []);

  const fetchAndParseArbsIntoRows = async () => {
    const filePaths = ["arb/app_en.arb", "arb/app_zh.arb", "arb/app_ms.arb"];

    const fetchPromises = filePaths.map(async (filePath) => {
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
    // console.log("parsed", parsed);
    const allKeys = Array.from(
      new Set(parsed.map((lang) => Object.keys(lang.decodedContent)).flat())
    );
    // console.log("allKeys", allKeys);
    const langs = parsed.map((o) => o.filePath);
    // console.log("langs", langs);
    const emptyLangsObj = Object.fromEntries(
      langs.map((lang) => [lang, undefined])
    );

    const vals = Object.fromEntries(
      allKeys.map((key) => [key, { ...emptyLangsObj }])
    );

    // console.log("vals", vals);

    parsed.forEach((o) => {
      const dict = o.decodedContent;
      const _keys = Object.keys(dict);
      const lang = filterAlphaOnly(o.filePath);
      _keys.forEach((key) => {
        vals[key][lang] = dict[key];
      });
    });

    // console.log("parsed", parsed);

    const rows = allKeys.map((key) => ({
      key,
      ...vals[key as any],
    }));

    return { rows, langs };
  };

  return (
    <div style={{ display: "flex", flexFlow: "column", height: "100%" }}>
      <div style={{ display: "flex" }}>
        <div>GitLab Endpoint:</div>
        <input
          value={formVals.gitlabEndpoint}
          onChange={(e) =>
            setFormVals((p) => ({ ...p, gitlabEndpoint: e.target.value }))
          }
        />
      </div>
      <div style={{ display: "flex" }}>
        <div>Project ID:</div>
        <input
          value={formVals.projectId}
          onChange={(e) =>
            setFormVals((p) => ({ ...p, branch: e.target.value }))
          }
        />
      </div>
      <div style={{ display: "flex" }}>
        <div>Private Token:</div>
        <input
          value={formVals.privateToken}
          onChange={(e) =>
            setFormVals((p) => ({ ...p, privateToken: e.target.value }))
          }
        />
      </div>
      <div style={{ display: "flex" }}>
        <div>Branch:</div>
        <input
          value={formVals.branch}
          onChange={(e) =>
            setFormVals((p) => ({ ...p, branch: e.target.value }))
          }
        />
      </div>

      {show && (
        <div style={{ height: "100%" }}>
          <AgGridReact<any> rowData={data} columnDefs={colDefs} />
        </div>
      )}
    </div>
  );
};

function filterAlphaOnly(str: string): string {
  return str.replace(/[^a-zA-Z]/g, "");
}
