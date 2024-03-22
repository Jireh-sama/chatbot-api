const { NlpManager } = require("node-nlp");
const {
  readJSONFile,
  updateJSONFile,
  getObjectFromMatchingValue,
} = require("../jsonReader");
const path = require("path");

const modelPath = path.join(__dirname, "model");

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
    console.log("Model loaded successfully!");
  } catch (err) {
    console.log("No existing model found, training a new one...");
    await trainModel();
  }
}

// Load training data from JSON file
// add more if needed...
const greetingsData = require("../knowledge/greetings_data.json");
const questionData = require("../knowledge/questions_data.json");
let incrementingId = 1;

// Add Greetings Data to Model
greetingsData.forEach((data) => {
  data.documents.forEach((document) => {
    manager.addDocument("en", document, data.intent);
  });
  manager.addAnswer("en", data.intent, data.answer, { id: incrementingId });
  incrementingId++;
});

// Add Question Data to Model
questionData.forEach((data) => {
  data.documents.forEach((document) => {
    manager.addDocument("en", document, data.intent);
  });
  manager.addAnswer("en", data.intent, data.answer, { id: incrementingId });
  incrementingId++;
});


const trainModel = async () => {
  await manager.train();
  console.log("Model trained successfully!");
  await manager.save();
  console.log("Model saved successfully!");
}

const matchQuestionToObject = (searchValue) => {
  const knowledgesFilePathArray = ["./knowledge/greetings_data.json", "./knowledge/questions_data.json"];
  for (let filePath of knowledgesFilePathArray){
    const foundObject = getObjectFromMatchingValue(
      filePath,
      searchValue
    );
    if (foundObject) {
      return foundObject;
    }
  }
}

// Process a message using the NLP manager
const processMessage = async (message) => {
  const response = await manager.process("en", message);
  const searchValue = response.answer;
  const foundObject = matchQuestionToObject(searchValue);
  const jsonFAQFilePath = "question_frequency.json";
  let newData = {};
  if (foundObject) {
    newData = {
      questions: [...foundObject.documents],
      answer: foundObject.answer,
      frequency: 1,
    };
    updateJSONFile(jsonFAQFilePath, newData);
  }
  
  // Fallback Answer
  if (!response.answer) {
    response.answer =
      "I'm sorry, I'm still learning and may not have the answer to that question just yet. Is there anything else I can assist you with?";
  }
  return response.answer;
}

const getFrequentlyAskedQuestion = () => {
  const questionsFrequencyList = readJSONFile('./question_frequency.json');

  // Sort the array in descending order
  questionsFrequencyList.sort((a, b) => b.frequency - a.frequency);
  // Get the top 5 questions in the array
  const top5Questions = questionsFrequencyList.slice(0, 5);
  
  return top5Questions;
}

module.exports = {
  getFrequentlyAskedQuestion,
  loadOrCreateModel,
  processMessage,
};
