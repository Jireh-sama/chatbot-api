
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
]

export const getFallBackResponse = () => {
  const index = Math.floor(Math.random() * nlpFallBackResponses.length)
  return nlpFallBackResponses[index]
}