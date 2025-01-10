import { Language } from "node-nlp";
import { getLanguageFallBackResponse, SUPPORTED_LANGUAGES } from "#src/infrastructure/config/nlpManagerConfig.js";
import { removeStopWords } from "#src/infrastructure/utils/formatUtils.js";
import { logMessage } from "#src/infrastructure/utils/loggingUtils.js";
import { generateDynamicFallbackResponse } from "../../../infrastructure/utils/nlpUtils.js";

const detectLanguage = (sentence) => {
  const language = new Language()
  const guess = language.guess(sentence);
  return guess[0].language.toLowerCase()
}

function processUserQuery(chatbot) {
  const execute = async (query) => {
    if (!query) {
      throw new Error('A query cannot be empty')
    }

    const filteredQuery = removeStopWords(query.trim())
    logMessage(`Filtered query: ${filteredQuery}`);
    const response = await chatbot.processQuery(filteredQuery)

    // Handle None intent
    if (response.intent === 'None') {
      response.answer = generateDynamicFallbackResponse(query);
    }
    
    // Handle if query is not english UnsupportedLanguage
    const detectedQueryLanguage = detectLanguage(query)
    logMessage(`Detected query language: ${detectedQueryLanguage}`);
    if (!SUPPORTED_LANGUAGES.includes(detectedQueryLanguage)) {
      response.answer = getLanguageFallBackResponse();
      response.intent = 'UnsupportedLanguage';
    }

    return response;
  }

  return {execute}
}
export default processUserQuery