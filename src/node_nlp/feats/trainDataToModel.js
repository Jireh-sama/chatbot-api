const { yellow, red } = require('colorette');
const salutationData = require('../../knowledge/salutation_data.json');
const navigationData = require('../../knowledge/navigation_data.json');
const questionData = require('../../knowledge/questions_data.json');
const requestData = require('../../knowledge/request_data.json');
const aboutBotData = require('../../knowledge/about_bot_data.json');


let incrementingId = 1;

const trainDataToModel = (manager) => {

  const loadDataIntoModel = (manager, data, incrementingId) => {
    try {
      data.forEach((datum) => {
        datum.documents.forEach((document) => {
          manager.addDocument("en", document, datum.intent);
        });
        manager.addAnswer("en", datum.intent, datum.answer, {
          id: incrementingId++,
        });
      });
    } catch (error) {
      console.error('An error occured while loading data into the Model: ', error.message);
    }
  };
  const allData = [salutationData, questionData, navigationData, requestData, aboutBotData];
  if (allData.every(data => data)) {
    console.log(yellow('Loading data into the model...'));
    loadDataIntoModel(manager, salutationData, incrementingId);
    loadDataIntoModel(manager, questionData, incrementingId);
    loadDataIntoModel(manager, navigationData, incrementingId);
    loadDataIntoModel(manager, requestData, incrementingId);
    loadDataIntoModel(manager, aboutBotData, incrementingId);
  } else {
    console.error(red("One or more Knowledge data does not exist"));
  }
}
module.exports = trainDataToModel;