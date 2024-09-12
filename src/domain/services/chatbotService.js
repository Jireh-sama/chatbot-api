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
    const { intent, documents, answer } = knowledgeEntry
    documents.forEach((document) => {
      chatbot.addDocument("en", document, intent);
    });
    chatbot.addAnswer("en", intent, answer);
  };
  
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