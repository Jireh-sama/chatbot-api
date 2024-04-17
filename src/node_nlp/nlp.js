const { green, yellow } = require('colorette');
const { NlpManager, Language } = require("node-nlp");
const path = require("path");
const modelPath = path.join(__dirname, "model");
const trainDataToModel = require('./feats/trainDataToModel');
const { updateFrequency } = require('./feats/manageFAQs');
const generateDynamicResponse = require('./feats/responseGenerator');
const { notEnglishAndTagalog, isTagalog, noAnswer, utteranceToShort } = require('./feats/fallbackResponse');
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
  try {
    trainDataToModel(manager);
    await manager.train();
    console.log(green("✅ Model trained successfully!"));
    await manager.save();
    console.log(green("✅ Model saved successfully!"));
    return 'Model Trained Succesfully';
  } catch (error) {
    console.log('Error occured during training ', error);
    return 'Unable To Train Model';
  }
};

// Process a message using the NLP manager
const processMessage = async (message) => {
  let response = await manager.process("en", message);

  console.log(response);

  // ! Fallback Response
  const utteranceLanguage = guessLanguage(response.utterance);
  const responseIntent = response.intent.toLowerCase();
  if (notEnglishAndTagalog(response, utteranceLanguage)) {
    return response;
  }
  if (isTagalog(response, utteranceLanguage)) {
    return response;
  }
  if (noAnswer(response, responseIntent)) {
    return response;
  }
  if (utteranceToShort(response, responseIntent)) {
    return response;
  }
  
  const searchValue = response.answer;
  updateFrequency(searchValue);
  const responseData = {
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
  loadOrCreateModel,
  processMessage,
  trainModel,
};
