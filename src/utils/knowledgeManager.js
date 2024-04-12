const { green } = require("colorette");
const { createJSONFile, readJSONFile, updateJSONFile, deleteJSONFile } = require("./jsonReader");

// fn to create a new knowledge base
const createKnowledgeBase = (knowledgeDirectory, data) => {
  createJSONFile(knowledgeDirectory, data);
}
// fn to insert data into provided Knowledge Base.
const insertKnowledgeTrainingData = ( knowledgePath, newData) => {
  try {
    if (!newData) {
      console.error('Cannot insert an empty data to knowledge');
      return false;
    }
    const knowledgeBase = readJSONFile(knowledgePath);
    knowledgeBase.push(newData);
    updateJSONFile(knowledgePath, knowledgeBase)
    console.log(green(`Successfully inserted data:${newData}, to filepath: ${knowledgePath}`));
    return true;
  } catch (error) {
    console.error('Error inserting training data to knowledge: ', error);
    return false;
  }
  
}
const deleteKnowledgeBase = (knowledgeDirectory) => {
  deleteJSONFile(knowledgeDirectory);
}
const deleteTrainingData = (knowledgeDirectory, dataIndex) => {
  try {
    const knowledge = readJSONFile(knowledgeDirectory);
    if (dataIndex < 0 || dataIndex >= knowledge.length) {
      throw new Error('Index out of bounds')
    }
    knowledge.splice(dataIndex, 1)
    updateJSONFile(knowledgeDirectory, knowledge);
    console.log('Training has been deleted');
  } catch (error) {
    console.log('Error deleting training data: ', error);
  }
}
module.exports = {
  createKnowledgeBase,
  insertKnowledgeTrainingData,
  deleteKnowledgeBase,
  deleteTrainingData,
}