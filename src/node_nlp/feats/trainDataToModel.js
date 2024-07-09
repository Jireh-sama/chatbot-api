const { getAllFilePaths, readJSONFile } = require('../../utils/jsonReader');
const { red } = require('colorette');
const trainDataToModel = (manager) => {  
  
  const loadDataIntoModel = (manager, data) => {
    let corruptedData = null;
    try {
      if (!data) {
        console.log('data is null');
      };
      data.forEach((datum) => {
        if (!(datum.documents instanceof Array)) {
          corruptedData = datum.documents;
          throw new Error("Expecting Array from Documents instead got a different data type");
        }
        datum.documents.forEach((document) => {
          manager.addDocument("en", document, datum.intent);
        });
        manager.addAnswer("en", datum.intent, datum.answer);
      });
    } catch (error) {
      console.error(red(`An error occured while loading data into the Model: ${error.message}`));
      console.error(red(`Corrupt data: ${corruptedData}`));
    }
  };

  const knowledgePaths = getAllFilePaths('./src/knowledge')

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

