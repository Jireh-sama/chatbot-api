const { red } = require('colorette');
const defaultConfig = require('./config/default_config');
const Nlp = require('./Nlp')


const nlp = new Nlp(defaultConfig)

const startModel = async () => {
  try {
    await nlp.initializeOrTrainModel()
  } catch (error) {
    console.error(red(`Starting model failed: ${error}`));
  }
};

const sendMessage = async (message) => {
  try {
    const response = await nlp.handleMessage(message)
    return response
  } catch (error) {
    console.error('Error while sending message: ', error);
  }
}

const createKnowledgeBase = async (knowledgeBaseName, defaultDataEntry) => {
  await nlp.handleCreateKnowledgeBase(knowledgeBaseName, defaultDataEntry)
}

const getKnowledge = async (knowledgeBaseName) => {
  await nlp.handleReadKnowledgeBase(knowledgeBaseName)
}

const getAllKnowledge = async () => {
  return await nlp.handleReadAllknowledge()
}

const updateKnowledgeBaseName = async (oldName, newName) => {
  await nlp.handleUpdateKnowledgeBaseName(oldName, newName)
}

const deleteKnowledgeBase = async (knowledgeBaseName) => {
  await nlp.handleDeleteKnowledgeBase(knowledgeBaseName)
}

const addKnowledgeEntry = async (knowledgeName, newData) => {
  await nlp.handleAddKnowledgeEntry(knowledgeName, newData)
}

const updateKnowledgeEntry = async (knowledgeName, index, newKnowledgeEntry) => {
  await nlp.handleUpdateKnowledgeEntry(knowledgeName, index, newKnowledgeEntry)
}

const deleteKnowledgeEntry = async (knowledgeBaseName, knowledgeEntryIndex) => {
  await nlp.handleDeleteKnowledgeEntry(knowledgeBaseName, knowledgeEntryIndex)
}


module.exports = {
  startModel,
  sendMessage,
  getKnowledge,
  getAllKnowledge,
  createKnowledgeBase,
  updateKnowledgeBaseName,
  deleteKnowledgeBase,
  addKnowledgeEntry,
  updateKnowledgeEntry,
  deleteKnowledgeEntry
};
