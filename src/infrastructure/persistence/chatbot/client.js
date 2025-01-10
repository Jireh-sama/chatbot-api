import { NlpManager } from "node-nlp";
import ChatbotService from "#src/domain/services/chatbotService.js";
function chatbotClient(config, knowledgeRepository, modelRepository) {

  let chatbotService = null;
  
  const processQuery = async (query) => {
    return await chatbotService.processQuery(query)

  }

  const initialize = async () => {
    const manager = new NlpManager(config)
    chatbotService = ChatbotService(manager)
    try {
      const result = await modelRepository.getModalData();

      if (!result || !result.model) throw new Error('Model Data not found')
      await chatbotService.loadModel(result.model);

      console.log("Model loaded successfully!");
    } catch (error) {
      console.error("Model does not exist, training a new one...");
      await train()
    }
  }

  const train = async () => {
    const manager = new NlpManager(config)
    chatbotService = ChatbotService(manager)

    try {
      const knowledgeCollection = await knowledgeRepository.getKnowledgeCollection();

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

      console.log('Model Training Successful');
      
      // Save model data to model dir
      // const modelData = await chatbotService.saveModel();
      // await modelRepository.updateModelData(modelData)
    } catch (error) {
      console.log("Training error:", error.message || error);
    }
  };

  return {initialize, processQuery, train}
}

export default chatbotClient