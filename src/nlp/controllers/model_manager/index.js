const path = require("path");
const fs = require("fs").promises;
const { green, red } = require("colorette");
const trainDataToModel = require('./trainDataToModel')
const saveFolder = path.join(__dirname, "../../data/");
const filename = path.join(saveFolder, "model.nlp");

function modelManager(manager) {

  const trainModel = async () => {
    try {
      await manager.train();
      console.log(green("✅ Model trained successfully!"));
      await manager.save(filename);
      console.log(green("✅ Model saved successfully!"));
    } catch (error) {
      console.log(red(`Error occurred during model training phase: ${error}`));
    }
  };

  const loadModel = async () => {
    // Ensure the model file exists
    await fs.access(filename);
    await manager.load(filename);
    console.log(green("Model data loaded successfully!"));
  };

  return {trainModel, loadModel};
}

module.exports = { modelManager, trainDataToModel};
