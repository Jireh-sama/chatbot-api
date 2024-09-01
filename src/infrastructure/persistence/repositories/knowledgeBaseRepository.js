/*
  Repositories serve as a bridge between the use cases and the data storage system. 
  They encapsulate the logic for retrieving and persisting data, ensuring that the 
  rest of the application is not tied to the details of the data storage.
*/
function knowledgeBaseRepository(database) {
  
    const createKnowledgeBase = async (knowledgeBasePath, knowledgeEntryList) => {
      await database.writeFile(knowledgeBasePath, knowledgeEntryList);
    }

    const readKnowledgeBase = async (knowledgeBasePath) => {
      const knowledgeBaseData = await database.readFile(knowledgeBasePath)
      return knowledgeBaseData;
    }

    const updateKnowledgeBase = async (knowledgeBasePath, updatedKnowledgeBase) => {
      await database.updateFile(knowledgeBasePath, updatedKnowledgeBase)
    }

    const deleteKnowledgeBase = async (knowledgeBasePath) => {
      await database.deleteFile(knowledgeBasePath)
    }

    const getKnowledgeBaseFileNames  = async (defaultKnowledgeDirectory) => {
      const knowledgeBaseFileNames = await database.readDirectory(defaultKnowledgeDirectory)
      return knowledgeBaseFileNames;
    }

    return {readKnowledgeBase, createKnowledgeBase, updateKnowledgeBase, deleteKnowledgeBase, getKnowledgeBaseFileNames}
}

export default knowledgeBaseRepository


