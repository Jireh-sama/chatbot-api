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
    // Refactor this later
    for (const knowledgeBasePath of knowledgeBasePathList) {
      try {
        const knowledgeBase = await reader(knowledgeBasePath)
        console.log('Validating knowledge base: ',knowledgeBasePath);
    
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