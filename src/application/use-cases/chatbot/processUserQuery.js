import { getFallBackResponse } from "#src/infrastructure/config/nlpManagerConfig.js";

function processUserQuery(chatbot) {
  const execute = async (query) => {
    if (!query) {
      throw new Error('A Query is required to process and deliver a response')
    }
    const response = await chatbot.processQuery(query)
    // Do some logic to manipulating response here...
    if (response.intent === 'None') {
      response.answer = getFallBackResponse();
    }
    return response;
  }

  return {execute}
}
export default processUserQuery