const { NlpManager } = require("node-nlp");
const { yellow, red, green } = require("colorette");
const validateResponse = require("./services/validateResponse");
const { modelManager, trainDataToModel } = require('@controllers/model_manager');
const {
  createKnowledgeBase,
  readKnowledgeBase,
  updateKnowledgeBaseName,
  deleteKnowledgeBase,
  addKnowledgeEntry,
  updateKnowledgeEntry,
  deleteKnowledgeEntry,
  readAllKnowledgeBase,
  getKnowldgePathList,
} = require("@controllers/knowledge_manager");

class Nlp {
  #manager;
  constructor(config) {
    this.supportedLanguage = config.languages[0];
    this.#manager = new NlpManager(config);
  }

  getManagerInstance() {
    if (!this.#manager) {
      throw new Error("Manager instance does not exist.");
    }
    return this.#manager;
  }

  async handleMessage(message) {
    try {
      const response = await this.#manager.process(
        this.supportedLanguage,
        message
      );
      response.answer = validateResponse(
        response.utterance,
        response.intent,
        response.answer
      );
      return response;
    } catch (error) {
      console.error(red(`Error handling message: ${error}`));
    }
  }

  async handleInitializeOrTrainModel() {
    try {
      const managerInstance = this.getManagerInstance();
      const knowledgePathList = await getKnowldgePathList();
      const { trainModel, loadModel } = modelManager(managerInstance);
      try {
        await loadModel();
      } catch (error) {
        console.error(
          yellow(`Loading failed: ${error}\nTraining a new model...`)
        );
        await trainDataToModel(
          managerInstance,
          knowledgePathList,
          readKnowledgeBase
        );
        await trainModel(); // If loading fails, train the model
      }
    } catch (error) {
      console.error(red(`Error initializing model: ${error}`));
    }
  }

  // ######## KNOWLEDGE_HANDLERS ######## //
  async handleCreateKnowledgeBase(knowledgeBaseName, defaultDataEntry) {
    try {
      await createKnowledgeBase(knowledgeBaseName, defaultDataEntry);
      console.log(green("Successfully handled: handleCreateKnowledgeBase"));
    } catch (error) {
      console.error(yellow(`Error handling handleCreateKnowledgeBase`));
      throw error
    }
  }

  async handleReadKnowledgeBase(knowledgeBaseName) {
    try {
      const data = await readKnowledgeBase(knowledgeBaseName);
      console.log(green("Successfully handled: handleReadKnowledgeBase"));
      return data;
    } catch (error) {
      console.error(yellow(`Error handling: handleReadKnowledgeBase: ${error}`));
    }
  }

  async handleUpdateKnowledgeBaseName(oldName, newName) {
    try {
      await updateKnowledgeBaseName(oldName, newName);
      console.log(green("Successfully handled: handleUpdateKnowledgeBaseName"));
    } catch (error) {
      console.error(
        red(`Error handling: handleUpdateKnowledgeBaseName: ${error}`)
      );
    }
  }

  async handleDeleteKnowledgeBase(knowledgeBaseName) {
    try {
      await deleteKnowledgeBase(knowledgeBaseName);
      console.log(green("Successfully handled: handleDeleteKnowledgeBase"));
    } catch (error) {
      console.error(red(`Error handling: handleDeleteKnowledgeBase: ${error}`));
    }
  }

  async handleReadAllknowledge() {
    try {
      const allKnowledgeData = await readAllKnowledgeBase();
      console.log(green("Successfully handled: handleGetAllknowledge"));
      return allKnowledgeData;
    } catch (error) {
      console.error(red(`Error handling: handleGetAllknowledge: ${error}`));
    }
  }

  async handleAddKnowledgeEntry(knowledgeName, newData) {
    try {
      await addKnowledgeEntry(knowledgeName, newData);
      console.log(green("Successfully handled: handleAddKnowledgeEntry"));
    } catch (error) {
      console.error(red(`Error handling: handleAddKnowledgeEntry: ${error}`));
    }
  }

  async handleUpdateKnowledgeEntry(knowledgeName, index, newKnowledgeEntry) {
    try {
      await updateKnowledgeEntry(knowledgeName, index, newKnowledgeEntry)
      console.log(green("Successfully handled: handleUpdateKnowledgeEntry"));
    } catch (error) {
      console.error(red(`Error handling: handleUpdateKnowledgeEntry: ${error}`));
    }
  }

  async handleDeleteKnowledgeEntry(knowledgeBaseName, knowledgeEntryIndex) {
    try {
      await deleteKnowledgeEntry(knowledgeBaseName, knowledgeEntryIndex)
      console.log(green("Successfully handled: handleDeleteKnowledgeEntry"));
    } catch (error) {
      console.error(red(`Error handling: handleDeleteKnowledgeEntry: ${error}`));
    }
  }
}

module.exports = Nlp;
