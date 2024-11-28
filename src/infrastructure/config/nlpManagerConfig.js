
export const nlpManagerConfig = {
  languages: ["en"],
  nlu: { log: false, useNoneFeature: true },
  forceNER: true,
  autoSave: false
};

export const nlpModelFileName = 'model.nlp'

const nlpFallBackResponses = [
  "I'm sorry, I didn't quite understand that. Could you rephrase your question or try asking in a different way? 😊",
  "Sorry, I'm a bit confused. Can you try asking differently? I'll do my best to assist!",
  "Apologies, but I didn't understand your request. Could you try saying it differently?",
];


const languageFallBackResponses = [
  "Unfortunately, I can only understand English. If it's okay with you, could you please rephrase your question in English so I can better assist you?",
  "I'm sorry, but I can only understand English right now. Would you mind asking your question in English so I can help you out?",
  "At the moment, I can only understand English. If you could rephrase your question in English, I’ll do my best to assist you!",
  "I’m afraid I can only understand English for now. Could you kindly rephrase your question in English so I can assist you properly?",
];





export const getFallBackResponse = () => {
  const index = Math.floor(Math.random() * nlpFallBackResponses.length)
  return nlpFallBackResponses[index]
}


export const getLanguageFallBackResponse = () => {
  const index = Math.floor(Math.random() * languageFallBackResponses.length)
  return languageFallBackResponses[index]
}

export const SUPPORTED_LANGUAGES = ['english']