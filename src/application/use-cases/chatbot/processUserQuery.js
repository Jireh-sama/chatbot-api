import { getFallBackResponse } from "#src/infrastructure/config/nlpManagerConfig.js";
import { removeStopWords } from "../../../infrastructure/utils/formatUtils.js";


function processUserQuery(chatbot) {
  const execute = async (query) => {
    if (!query) {
      throw new Error('A Query is required to process and deliver a response')
    }

    const filteredQuery = removeStopWords(query.trim())
    // console.log('Filtered Query: ', filteredQuery);
    const response = await chatbot.processQuery(filteredQuery)
    
    if (response.intent === 'None') {
      response.answer = getFallBackResponse();
    }
    return response;
  }

  return {execute}
}
export default processUserQuery