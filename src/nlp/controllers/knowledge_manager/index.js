const fs = require("fs").promises;
const {
  checkKnowledgeBaseExists,
  extractKnowledgeBaseNameFromPath,
  overwriteKnowledgeBaseFile,
  getKnowldgePathList,
  getKnowledgeBasePath,
} = require("./utils");
const { red, green } = require("colorette");

const createKnowledgeBase = async (knowledgeBaseName, defaultDataEntry) => {
  const knowledgePath = getKnowledgeBasePath(knowledgeBaseName)
  const knowledgeData = JSON.stringify(defaultDataEntry, null, 2);
  await fs.writeFile(knowledgePath, knowledgeData);
};

const readKnowledgeBase = async (knowledgeBasePath) => {
    const data = await fs.readFile(knowledgeBasePath, "utf8");
    const jsonData = JSON.parse(data);
    return jsonData;
};

const updateKnowledgeBaseName = async (oldName, newName) => {
    await fs.rename(
      getKnowledgeBasePath(oldName),
      getKnowledgeBasePath(newName)
    );
};

const deleteKnowledgeBase = async (knowledgeName) => {
  try {
    await fs.unlink(getKnowledgeBasePath(knowledgeName));
    console.log(green(`Successfully deleted knowledge base at: ${knowledgeName}`));
  } catch (error) {
    console.error(red(`Error deleting knowledge base: ${error}`));
  }
};

const readAllKnowledgeBase = async () => {
  const allKnowledgeData = {};
  const readedKnowledgeData = [];
  const knowledgePathList = await getKnowldgePathList();
  for (const knowledgePath of knowledgePathList) {
    const knowledgeData = await readKnowledgeBase(knowledgePath);
    if (knowledgeData.length === 0) {
      continue;
    }
    const knowledgeName = extractKnowledgeBaseNameFromPath(knowledgePath);
    allKnowledgeData[knowledgeName] = knowledgeData;
    readedKnowledgeData.push(knowledgePath);
  }
  console.log(
    `Total items found: ${knowledgePathList.length}, Total items read: ${readedKnowledgeData.length}`
  );
  return allKnowledgeData
};

const addKnowledgeEntry = async (knowledgeName, newData) => {
    const knowledgePath = getKnowledgeBasePath(knowledgeName)
    const doesExists = checkKnowledgeBaseExists(knowledgePath);
    if (!doesExists) 
      return new Error("Knowledge base does not exist. Operation is cancelled");
    
    const currentData = await readKnowledgeBase(knowledgePath);
    currentData.push(newData);
    await fs.writeFile(knowledgePath, JSON.stringify(currentData, null, 2));
};

const updateKnowledgeEntry = async (knowledgeName, index, newKnowledgeEntry) => {
  try {
    const knowledgeBasePath = getKnowledgeBasePath(knowledgeName)
    const knowledgeBaseData = await readKnowledgeBase(knowledgeBasePath)
    if (index > knowledgeBaseData.length - 1 || index < 0) {
      throw new Error('Index is out of bounds')
    }
    knowledgeBaseData[index] = newKnowledgeEntry
    await overwriteKnowledgeBaseFile(knowledgeBasePath, knowledgeBaseData)
  } catch (error) {
    console.error(`Error updating knowledge entry: ${error}`);
  }
}

const deleteKnowledgeEntry = async (knowledgeName, trainingDataIndex) => {
  try {
    const knowledgeBasePath = getKnowledgeBasePath(knowledgeName)
    const knowledgeEntryList = await readKnowledgeBase(knowledgeBasePath);
    if (
      trainingDataIndex < 0 ||
      trainingDataIndex >= knowledgeEntryList.length
    ) {
      throw new Error("Index out of bounds");
    }
    knowledgeEntryList.splice(trainingDataIndex, 1);
    await overwriteKnowledgeBaseFile(knowledgeBasePath, knowledgeEntryList)
    console.log(`Successfully deleted entry data at: ${knowledgeBasePath} index: ${trainingDataIndex}`);
  } catch (error) {
    console.log(error);
  }
};


// async function main() {
//   try {
//     await createKnowledgeBase("sample", [{key: 'data'}]);
//     await updateKnowledgeBaseName('sample', 'newSample')
//     const sampleKnowledgeBase = await readKnowledgeBase(getKnowledgeBasePath('newSample'))
//     console.log('knowledge base data: ', sampleKnowledgeBase);
//     await addKnowledgeEntry("newSample", {
//       intent: "intent.sample",
//       documents: [
//         "Sample document one",
//         "Sample document two",
//         "Sample document three"
//       ],
//       answer: "this is a sample answer",
//     });
//     const newData = {
//       intent: "intent.newSample",
//       documents: [
//         "New Sample document zone",
//         "New Sample document ztwo",
//         "New Sample document zthree"
//       ],
//       answer: "this is a sample zanswer",
//     }
   
//     await updateKnowledgeEntry('newSample', 1, newData)
//     const knowledgePathList = await getKnowldgePathList()
//     console.log(knowledgePathList);
//     await readAllKnowledgeBase();
//     await deleteKnowledgeEntry('newSample', 0);
//     await deleteKnowledgeBase('newSample');
//     console.log(green('Everything seems to work'));
//   } catch (error) {
//     console.log(red(error));
//   }
// }
// main();

module.exports = {
  createKnowledgeBase,
  readKnowledgeBase,
  updateKnowledgeBaseName,
  deleteKnowledgeBase,
  readAllKnowledgeBase,
  addKnowledgeEntry,
  updateKnowledgeEntry,
  deleteKnowledgeEntry,

  getKnowldgePathList,
};
