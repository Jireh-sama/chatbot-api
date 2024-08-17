const fs = require("fs").promises;

const DEFAULT_KNOWLEDGE_PATH = "src/knowledge"

const checkKnowledgeBaseExists = async (dir) => {
  try {
    await fs.access(dir, fs.constants.F_OK);
    return true; // File exists
  } catch {
    return false; // File does not exist
  }
};

const extractKnowledgeBaseNameFromPath = (path) => {
  const result = path.split("/").pop().split("_")[0];
  return result
};

const getKnowledgeBasePath = (knowledgeBaseName, path = DEFAULT_KNOWLEDGE_PATH) => {
  return `${path}/${knowledgeBaseName}_data.json`
}

/**
 * Overwrites the knowledge base file with new data.
 * @param {string} knowledgePath - The path to the knowledge base file.
 * @param {Object} newData - The new data to be written to the knowledge base file.
 * @returns {Promise<void>} - A promise that resolves when the knowledge base file has been successfully overwritten.
 */
const overwriteKnowledgeBaseFile = async (knowledgePath, newData) => {
  try {
    await fs.writeFile(knowledgePath, JSON.stringify(newData, null, 2))
  } catch (error) {
    console.error("Error updating knowledge training data", error);
  }
};

const getKnowldgePathList = async (knowledgePath = DEFAULT_KNOWLEDGE_PATH) => {
  try {
    const knowledgeList = await fs.readdir(knowledgePath);
    const knowledgePathList = knowledgeList.map(file => `${knowledgePath}/${file}`);
    return knowledgePathList;
  } catch (error) {
    console.error("Error getting knowledge path list", error);
    return []
  }
}

module.exports = {
  checkKnowledgeBaseExists,
  extractKnowledgeBaseNameFromPath,
  overwriteKnowledgeBaseFile,
  getKnowldgePathList,
  getKnowledgeBasePath,
};
