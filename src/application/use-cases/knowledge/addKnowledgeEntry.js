import createKnowledgeEntry from "#domain/entities/KnowledgeEntry.js"
import { defaultKnowledgeDirectory } from "#infrastructure/config/paths.js"; 
import { getFilePath } from "#infrastructure/utils/getFilePath.js";

function addKnowledgeEntry(knowledgeRepository) {
  const execute = async (knowledgeBaseName, knowledgeEntry) => {

    const { intent, documents, answer } = knowledgeEntry 
    const newKnowledgeEntry = createKnowledgeEntry(intent, documents, answer)
    newKnowledgeEntry.validate()

    const knowledgeBasePath = getFilePath(defaultKnowledgeDirectory, knowledgeBaseName)
    const selectedKnowledgeBase = await knowledgeRepository.readKnowledgeBase(knowledgeBasePath)

    selectedKnowledgeBase.push(newKnowledgeEntry.toObject())

    knowledgeRepository.updateKnowledgeBase(knowledgeBasePath, selectedKnowledgeBase)
  }

  return { execute }
}

export default addKnowledgeEntry