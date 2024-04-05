const { green, yellow } = require('colorette');
const { NlpManager, Language } = require("node-nlp");
const path = require("path");
const { insertData } = require("../firebase/firebase-config");
const modelPath = path.join(__dirname, "model");
const trainDataToModel = require('./feats/trainDataToModel');
const { updateFrequency } = require('./feats/manageFAQs');

const manager = new NlpManager({
  languages: ["en"],
  nlu: { log: true, useNoneFeature: true },
  forceNER: true,
  modelFileName: modelPath,
});


// Load existing model if available, otherwise train a new one
const loadOrCreateModel = async () => {
  try {
    await manager.load();
    console.log(green("Model loaded successfully!"));
  } catch (err) {
    console.log(yellow("No existing model found, training a new one..."));
    await trainModel();
  }
};

const trainModel = async () => {
  trainDataToModel(manager);
  await manager.train();
  console.log(green("✅ Model trained successfully!"));
  await manager.save();
  console.log(green("✅ Model saved successfully!"));
};
// This fn finds and returns the matching
// search value object from the knowledge base
const matchQuestionToObject = (searchValue) => {
  try {
    const knowledgesFilePathArray = [
      "./knowledge/greetings_data.json",
      "./knowledge/questions_data.json",
    ];
    for (let filePath of knowledgesFilePathArray) {
      const foundObject = getObjectFromMatchingValue(filePath, searchValue);
      if (foundObject) {
        return foundObject;
      }
    }
  } catch (error) {
    console.error("Error occured when Matching value", error);
  }
};

const getBaseIntent = (fullIntent) => {
  const baseIntent = fullIntent.split(".")[0];
  return baseIntent;
};
// Process a message using the NLP manager
const processMessage = async (message) => {
  const response = await manager.process("en", message);

  // ! Fallback Responses
  utteranceLanguage = guessLanguage(response.utterance);
  if (utteranceLanguage !== 'english' && utteranceLanguage !== 'tagalog') {
    const fallbackResponses = [
      "I'm sorry, I currently only support English. Can you please ask your question in English?",
      "Apologies, my language skills are limited to English at the moment. Could you rephrase your question in English?",
      "Unfortunately, I can only understand English right now. Could you please translate your query into English?",
    ];
    response.answer = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
    return response;
  } else if (utteranceLanguage === 'tagalog') {
    // Do something specific for Tagalog language
    response.answer = "Pasensya na, ngunit sa ngayon ay hindi ko pa kayang maunawaan ang Tagalog. Maaari mo bang itanong ang iyong katanungan sa Ingles?";
    return response;
  }
  // ! Fallback Responses
  responseIntent = response.intent.toLowerCase();
  if (!response.answer || responseIntent === 'none') {
    const fallbackResponses = [
      "Oh, it seems I haven't quite gotten to that part in my learning journey yet! Is there something else I can help you with instead?",
      "I'm sorry, I'm still learning and may not have the answer to that question just yet. Is there anything else I can assist you with?",
      "Interesting! It seems I haven't learned about that just yet. What else can I assist you with?"
    ]
    response.answer = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
    return response;
  }

  const searchValue = response.answer;

  updateFrequency(searchValue);
 

  // Fallback Answer
  if (!response.answer) {
    response.answer =
      "I'm sorry, I'm still learning and may not have the answer to that question just yet. Is there anything else I can assist you with?";
  }
  // console.log(response);

  const intent = getBaseIntent(response.intent);
  const template = getResponseTemplate(intent);
  const data = {
    answer: response.answer,
  };
  const dynamicResponse = generateDynamicResponse(response.intent, responseData);
  response.answer = dynamicResponse;

  return response;
  };

const guessLanguage = (text) => {
  const language = new Language();
  languageGuessLimit = 3;
  const guess = language.guess(text, null, languageGuessLimit);
  const guessedLanguage = guess[0].language.toLowerCase();
  return guessedLanguage;
}

module.exports = {
  getFrequentlyAskedQuestion,
  loadOrCreateModel,
  processMessage,
};
