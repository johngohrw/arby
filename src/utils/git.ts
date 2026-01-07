export const updateMultipleFiles = async (options: {
  gitlabEndpoint: string;
  projectId: string;
  privateToken: string;
  branch: string;
  commitMessage: string;
  fileUpdates: {
    action: "update";
    file_path: string;
    content: string;
  }[];
}) => {
  try {
    const response = await fetch(
      `${options.gitlabEndpoint}/api/v4/projects/${options.projectId}/repository/commits`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "PRIVATE-TOKEN": options.privateToken,
        },
        body: JSON.stringify({
          branch: options.branch,
          commit_message: options.commitMessage,
          actions: options.fileUpdates,
        }),
      }
    );

    if (response.ok) {
      const data = await response.json();
      console.log("Files updated successfully:", data);
      alert("All files updated in one commit!");
    } else {
      const error = await response.json();
      console.error("Error:", error);
      alert("Error: " + error.message);
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Error updating files");
  }
};

export const getGitFile = async (options: {
  gitlabEndpoint: string;
  projectId: string;
  privateToken: string;
  branch: string;
  filePath: string;
}) => {
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

    const data = await response.json();

    // Decode base64 to UTF-8 properly
    const binaryString = atob(data.content);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    const decodedContent = new TextDecoder("utf-8").decode(bytes);

    return decodedContent;
  } catch (error) {
    console.error("Error:", error);
  }
};

export const updateFile = async (options: {
  gitlabEndpoint: string;
  projectId: string;
  privateToken: string;
  branch: string;
  commitMessage: string;
  filePath: string;
  newContent: string;
}) => {
  try {
    const response = await fetch(
      `${options.gitlabEndpoint}/api/v4/projects/${
        options.projectId
      }/repository/files/${encodeURIComponent(options.filePath)}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "PRIVATE-TOKEN": options.privateToken,
        },
        body: JSON.stringify({
          branch: options.branch,
          content: options.newContent,
          commit_message: options.commitMessage,
        }),
      }
    );

    if (response.ok) {
      const data = await response.json();
      console.log("File updated successfully:", data);
      alert("File updated successfully!");
    } else {
      const error = await response.json();
      console.error("Error updating file:", error);
      alert("Error: " + error.message);
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Error updating file");
  }
};
