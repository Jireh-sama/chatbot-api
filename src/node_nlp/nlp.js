const { NlpManager } = require("node-nlp");
const path = require("path");

const modelPath = path.join(__dirname, "model");

const manager = new NlpManager({
  languages: ["en"],
  nlu: { log: true, useNoneFeature: true },
  forceNER: true,
  modelFileName: modelPath,
});

// Load existing model if available, otherwise train a new one
async function loadOrCreateModel() {
  try {
    await manager.load();
    console.log("Model loaded successfully!");
  } catch (err) {
    console.log("No existing model found, training a new one...");
    await trainModel();
  }
}

// Load training data from JSON file
const trainingData = require("../knowledge/greetings_data.json");

// Add training data to the manager
trainingData.forEach((data) => {
  data.documents.forEach((document) => {
    manager.addDocument("en", document, data.intent);
  });
  manager.addAnswer("en", data.intent, data.answer);
});

async function trainModel() {
  await manager.train();
  console.log("Model trained successfully!");
  await manager.save();
  console.log("Model saved successfully!");
}

// Process a message using the NLP manager
async function processMessage(message) {
  const result = await manager.process("en", message);
  if (!result.answer) {
    result.answer = "mah nigga";
  }
  return result;
}

module.exports = {
  loadOrCreateModel,
  processMessage,
};
