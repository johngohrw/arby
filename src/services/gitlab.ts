import type { Config, FileContent, ParsedFile } from "../types/index.ts";
import { filterAlphaOnly } from "../utils/formatters.ts";

interface FetchOptions {
  gitlabEndpoint: string;
  projectId: string;
  privateToken: string;
  branch: string;
  filePaths: string[];
}

export async function fetchTranslationFiles(options: FetchOptions): Promise<FileContent[]> {
  const { gitlabEndpoint, projectId, privateToken, branch, filePaths } = options;
  
  const fetchPromises = filePaths.map(async (filePath) => {
    const decodedContent = await getGitFile({
      gitlabEndpoint,
      branch,
      filePath,
      privateToken,
      projectId,
    });

    if (decodedContent === undefined) {
      throw new Error(`Failed to fetch file: ${filePath}`);
    }

    return { filePath, decodedContent };
  });

  return Promise.all(fetchPromises);
}

interface CommitOptions {
  gitlabEndpoint: string;
  projectId: string;
  privateToken: string;
  branch: string;
  commitMessage: string;
  files: { path: string; content: string }[];
}

export async function commitTranslations(options: CommitOptions): Promise<void> {
  const { gitlabEndpoint, projectId, privateToken, branch, commitMessage, files } = options;
  
  const response = await fetch(
    `${gitlabEndpoint}/api/v4/projects/${projectId}/repository/commits`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "PRIVATE-TOKEN": privateToken,
      },
      body: JSON.stringify({
        branch,
        commit_message: commitMessage,
        actions: files.map((file) => ({
          action: "update" as const,
          file_path: file.path,
          content: file.content,
        })),
      }),
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to commit files");
  }
}

async function getGitFile(options: {
  gitlabEndpoint: string;
  projectId: string;
  privateToken: string;
  branch: string;
  filePath: string;
}): Promise<string | undefined> {
  try {
    const response = await fetch(
      `${options.gitlabEndpoint}/api/v4/projects/${
        options.projectId
      }/repository/files/${encodeURIComponent(options.filePath)}?ref=${
        options.branch
      }`,
      {
        method: "GET",
        headers: {
          "PRIVATE-TOKEN": options.privateToken,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Decode base64 to UTF-8 properly
    const binaryString = atob(data.content);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return new TextDecoder("utf-8").decode(bytes);
  } catch (error) {
    console.error("Error fetching file:", error);
    return undefined;
  }
}
