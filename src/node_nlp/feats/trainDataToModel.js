const { yellow } = require('colorette');
const greetingsData = require("../../knowledge/greetings_data.json");
const questionData = require("../../knowledge/questions_data.json");
let incrementingId = 1;

const trainDataToModel = (manager) => {

  const loadDataIntoModel = (manager, data, incrementingId) => {
    data.forEach((datum) => {
      datum.documents.forEach((document) => {
        manager.addDocument("en", document, datum.intent);
      });
      manager.addAnswer("en", datum.intent, datum.answer, {
        id: incrementingId++,
      });
    });
  };

  if (greetingsData && questionData) {
    console.log(yellow('Loading data into the model...'));
    loadDataIntoModel(manager, greetingsData, incrementingId);
    loadDataIntoModel(manager, questionData, incrementingId);
  } else {
    console.error("Failed adding knowledge data to model");
  }
}
module.exports = trainDataToModel;