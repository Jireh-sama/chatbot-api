import { defaultKnowledgeDirectory } from "#infrastructure/config/paths.js"; 
import { getFilePath } from "#infrastructure/utils/getFilePath.js";
import createKnowledgeEntry from "#domain/entities/KnowledgeEntry.js"

function updateKnowledgeEntry(knowledgeRepository) {

  const execute = async (knowledgeBaseName, knowledgeEntryIndex, updatedKnowledgeEntry) => {
    const knowledgeBasePath = getFilePath(defaultKnowledgeDirectory, knowledgeBaseName, defaultKnowledgeExtension)
    const selectedKnowledgeBase = await knowledgeRepository.readKnowledgeBase(knowledgeBasePath)

    const {intent, documents, answer} = updatedKnowledgeEntry;
    const newKnowledgeEntry = createKnowledgeEntry(intent, documents, answer)

    // Validate the updated knowledge entry
    newKnowledgeEntry.validate()

    // read and update the target knowledge base
    const knowledgeBasePath = getFilePath(defaultKnowledgeDirectory, knowledgeBaseName)
    const selectedKnowledgeBase = await knowledgeRepository.readKnowledgeBase(knowledgeBasePath)

    selectedKnowledgeBase.splice(knowledgeEntryIndex, 1, newKnowledgeEntry.toObject())

    await knowledgeRepository.updateKnowledgeBase(knowledgeBasePath, selectedKnowledgeBase)
  }

  return { execute }
}

export default updateKnowledgeEntry