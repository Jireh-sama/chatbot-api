import CreateKnowledgeEntry from "../entities/knowledgeEntry.js"
/**
 * Encapsulates the logic for handling NLP-related tasks. 
 * It abstracts away the complexities of the node-nlp 
 * library and exposes a clean API to the rest of the application
 */

function chatbotService(chatbot, reader) {

  const processUserQuery = async (query) => {
    const response = await chatbot.process('en', query)
    return response;
  }
  const loadModel = (modelFilePath) => {
    chatbot.load(modelFilePath)
  }

  const validateKnowledgeBase = (knowledgeBase) => {
    if (!Array.isArray(knowledgeBase)) {
      throw new Error(`Knowledge base must be an Array, received ${typeof knowledgeBase}`)
    }
    if (knowledgeBase.length === 0) {
      throw new Error(`Knowledge base is empty`)
    }
    for (const knowledgeEntry of knowledgeBase) {
      const {intent, documents, answer} = knowledgeEntry;
      const createdEntry = CreateKnowledgeEntry(intent, documents, answer)
      createdEntry.validate()
    }
  }
  const loadDataIntoModel = (knowledgeBase) => {
    try {
      for (const knowledgeEntry of knowledgeBase) {
        knowledgeEntry.documents.forEach((document) => {
          chatbot.addDocument("en", document, knowledgeEntry.intent);
        });
        chatbot.addAnswer("en", knowledgeEntry.intent, knowledgeEntry.answer);
      }
    } catch (error) {
      console.error(`An error occurred while loading data into the Model: ${error.message || error}`);
    }
  }
  const trainModel = async (knowledgeBasePathList, modelFilePath) => {
    for (const knowledgeBasePath of knowledgeBasePathList) {
      try {
        const knowledgeBase = await reader(knowledgeBasePath)
        console.log('Validating knowledge base: ',knowledgeBasePath);
        validateKnowledgeBase(knowledgeBase)
        console.log('Loading data into model: ',knowledgeBasePath);
        loadDataIntoModel(knowledgeBase)
      } catch (error) {
          console.error(`${error.message || error}, skipping this knowledge base ${knowledgeBasePath}`);
        continue;
      }
    }
    await chatbot.train()
    saveModel(modelFilePath);
  }
  const saveModel = (path) => {
    chatbot.save(path)
  }


  return { processUserQuery, loadModel, trainModel }
}

export default chatbotService