const { red, yellow } = require('colorette');

const loadDataIntoModel = (manager, data) => {
  try {

    for (const datum of data){
      if (!(datum.documents instanceof Array)) {
        throw new Error(`Expecting an array from documents instead got a ${typeof(datum.documents)}`);
      }
      datum.documents.forEach((document) => {
        manager.addDocument("en", document, datum.intent);
      });
      manager.addAnswer("en", datum.intent, datum.answer);
    }
  } catch (error) {
    console.error(red(`An error occured while loading data into the Model: ${error.message}`));
  }
};

const trainDataToModel = async (manager, dataPaths, readData) => {  
  for (const path of dataPaths){
    const data = await readData(path)
    if (data.length === 0) {
      console.log(yellow(`The path: ${path} contains an empty list skipping to the next one`));
      continue;
    }
    loadDataIntoModel(manager, data)
    console.log(`Finished training: ${path}`);
  }
}



module.exports = trainDataToModel;

