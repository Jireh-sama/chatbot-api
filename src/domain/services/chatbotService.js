/**
 * Encapsulates the logic for handling NLP-related tasks. 
 * It abstracts away the complexities of the node-nlp 
 * library and exposes a clean API to the rest of the application
 */

function chatbotService(chatbot, reader, modelFilePath) {

  const processQuery = async (query) => {
    const response = await chatbot.process('en', query)
    return response;
  }

  const loadModel = async () => {
    const modelData = await reader(modelFilePath)
    if(!modelData) {
      throw new Error('Modal data not found')
    }
    chatbot.load(modelFilePath)
  }

  const loadEntry = (knowledgeEntry) => {
    const { intent, documents, answer, fileUrl } = knowledgeEntry
    documents.forEach((document) => {
      chatbot.addDocument("en", document, intent);
    });

    if (!fileUrl) {
      chatbot.addAnswer("en", intent, answer);
      return;
    }

    chatbot.addAnswer("en", intent, `${answer} [${fileUrl}]`);
  };
  
  const saveModel = async (modelFilePath) => {
    try {
      await chatbot.train()
      chatbot.save(modelFilePath)
      
    } catch (error) {
      console.log(`Error occured while saving model: ${error}`);
    }
  }

  return { processQuery, loadModel, saveModel, loadEntry}
}

export default chatbotService