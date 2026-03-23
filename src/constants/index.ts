import type { Config } from "../types/index.ts";

export const DEFAULT_CONFIG: Config = {
  gitlabEndpoint: "",
  privateToken: "",
  projectId: "",
  branch: "",
  filePaths: "",
  commitMessage: "Update translation",
};

export const LOCAL_STORAGE_KEY = "arby-config";

export const VALIDATION_MESSAGES = {
  gitlabEndpoint: "GitLab Endpoint is required",
  projectId: "Project ID is required",
  privateToken: "Private token is required",
  branch: "Branch is required",
  filePaths: "File Paths are required",
  noValue: "No value given",
  invalidCharacters: "Allowed characters: alphanumerals, @, _",
  uppercaseFirst: "First letter can't be uppercase",
};
