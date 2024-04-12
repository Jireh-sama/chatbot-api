const { getAllFilePaths, readJSONFile } = require('../../utils/jsonReader');

const trainDataToModel = (manager) => {  
  const loadDataIntoModel = (manager, data) => {
    try {
      data.forEach((datum) => {
        datum.documents.forEach((document) => {
          manager.addDocument("en", document, datum.intent);
        });
        manager.addAnswer("en", datum.intent, datum.answer);
      });
    } catch (error) {
      console.error('An error occured while loading data into the Model: ', error.message);
    }
  };

  const knowledgePaths = getAllFilePaths('./knowledge')

  for (const path of knowledgePaths) {
    const knowledgeData = readJSONFile(path);
    if (!knowledgeData) {
      console.error('A knowledge data is falsy path: ', path);
      continue;
    }
    loadDataIntoModel(manager, knowledgeData);
    console.log('Finished training: ', path);
  }
}
module.exports = trainDataToModel;

