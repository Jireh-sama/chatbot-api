
export const nlpManagerConfig = {
  languages: ["en"],
  nlu: { log: false, useNoneFeature: true },
  forceNER: true,
  autoSave: false
};

export const nlpModelFileName = 'model.nlp'

const nlpFallBackResponses = [
  "I’m sorry, I didn’t catch that. Could you be more specific or clarify your question? 😊",
  "Hmm, I’m not sure what you mean. Could you provide more details or ask in a clearer way? I’m here to help!",
  "Apologies, I’m having trouble understanding. Could you try asking more specifically?",
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