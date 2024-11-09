/**
 * Encapsulates the logic for handling NLP-related tasks. 
 * It abstracts away the complexities of the node-nlp 
 * library and exposes a clean API to the rest of the application
 */

function chatbotService(chatbot) {

  const processQuery = async (query) => {
    const response = await chatbot.process('en', query)
    return response;
  }

  const loadModel = async (modelData) => {
    chatbot.import(modelData);
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

    chatbot.addAnswer("en", intent, `${answer} [=${fileUrl}=]`);
  };
  
  const saveModel = async () => {
    await chatbot.train()
    const isMinified = true
    const modelData = chatbot.export(isMinified)
    return modelData
  }

  return { processQuery, loadModel, saveModel, loadEntry}
}

export default chatbotService