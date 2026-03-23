export interface Config {
  gitlabEndpoint: string;
  privateToken: string;
  projectId: string;
  branch: string;
  filePaths: string;
  commitMessage: string;
}

export interface TranslationRow {
  key: string;
  [field: string]: string | undefined;
}

export interface FileMap {
  path: string;
  fieldName: string;
}

export interface FileContent {
  filePath: string;
  decodedContent: string;
}

export interface ParsedFile {
  filePath: string;
  decodedContent: Record<string, string>;
}
