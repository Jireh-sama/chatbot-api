import createKnowledgeEntry from "#domain/entities/KnowledgeEntry.js"
import { defaultKnowledgeDirectory, defaultKnowledgeExtension } from "#infrastructure/config/paths.js"; 
import { getFilePath } from "#infrastructure/utils/getFilePath.js";

/**
 * The objective of this use-case is to create a data which would require
 * some form of object to interact with our target data.That is why this 
 * use-case requires a repository which is for knowledge in this case in order 
 * for this use-case to achieve its particular goal. Which is to create a Knowledge
 */
function createKnowledgeBase(knowledgeRepository) {
  const execute = async (knowledgeBaseName, knowledgeEntries) => {

    const knowledgeBasePath = getFilePath(defaultKnowledgeDirectory, knowledgeBaseName, defaultKnowledgeExtension)
    const existingKnowledge = await knowledgeRepository.readKnowledgeBase(knowledgeBasePath)
    if (existingKnowledge) {
      throw new Error('Knowledge base already exist')
    }
    const knowledgeEntryList = []
    for (const knowledgeEntry of knowledgeEntries){
      const {intent, documents, answer} = knowledgeEntry
      const newKnowledgeEntry = createKnowledgeEntry(intent, documents, answer)
      newKnowledgeEntry.validate()
      knowledgeEntryList.push(newKnowledgeEntry)
    }
    
    await knowledgeRepository.createKnowledgeBase(knowledgeBasePath, knowledgeEntryList)
  }
  return {execute}
}

export default createKnowledgeBase