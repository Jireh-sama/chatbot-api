import { NlpManager } from "node-nlp";
import ChatbotService from "#src/domain/services/chatbotService.js";
import { readFilePath } from "#src/infrastructure/utils/pathUtils.js";

function chatbotClient(config, knowledgeRepository, modelFilePath) {

  const manager = new NlpManager(config)
  const chatbotService = ChatbotService(manager, readFilePath, modelFilePath)
  
  const processQuery = async (query) => {
    return await chatbotService.processQuery(query)
  }
  const initialize = async () => {
    try {
      await chatbotService.loadModel(modelFilePath);
      console.log("Model loaded successfully!");
    } catch (error) {
      console.error("Model does not exist, training a new one...");
      await train()
    }
  }

  const train = async () => {
    try {
      const knowledgeCollection =
        await knowledgeRepository.getKnowledgeCollection();

      for (const knowledge of knowledgeCollection) {
        const { knowledgeBase, knowledgeEntry } = knowledge;

        let i = 0;
        for (i = 0; i < knowledgeEntry.length; i++) {
          const entry = knowledgeEntry[i];
          chatbotService.loadEntry(entry);
        }
        console.log(
          `Finished training knowledge base: ${knowledgeBase}, with Total of: ${i} entry`
        );
      }

      // Save model data to model dir
      chatbotService.saveModel(modelFilePath);
      console.log(`Model saved successfully to ${modelFilePath}`);
    } catch (error) {
      console.log("Training error:", error.message || error);
    }
  };

  return {initialize, processQuery, train}
}

export default chatbotClient