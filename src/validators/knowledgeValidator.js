const { DEFAULT_KNOWLEDGE_PATH } = require('@nlp/config/default_paths.js')
const fs = require('fs').promises

const checkKnowledgeBaseExists = async (knowledgeBaseName) => {
  if (!knowledgeBaseName) {
    throw new Error('knowledgeBaseName is required and cannot be empty') 
  } 
  const knowledgeBasePath = `${DEFAULT_KNOWLEDGE_PATH}${knowledgeBaseName}_data.json`
  try {
    await fs.access(knowledgeBasePath, fs.constants.F_OK);
    return true; // File exists
  } catch {
    return false; // File does not exist
  }
};

module.exports = {checkKnowledgeBaseExists}