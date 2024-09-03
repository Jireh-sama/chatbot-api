import { defaultKnowledgeDirectory, defaultKnowledgeExtension } from "#infrastructure/config/paths.js"; 
import { getFilePath } from "#infrastructure/utils/getFilePath.js";
import createKnowledgeEntry from "#domain/entities/knowledgeEntry.js"

function updateKnowledgeEntry(knowledgeRepository) {

  const execute = async (knowledgeBaseName, knowledgeEntryIndex, updatedKnowledgeEntry) => {

    const knowledgeBasePath = getFilePath(defaultKnowledgeDirectory, knowledgeBaseName, defaultKnowledgeExtension)
    const selectedKnowledgeBase = await knowledgeRepository.readKnowledgeBase(knowledgeBasePath)

    if (!selectedKnowledgeBase) {
      throw new Error('Cannot update knowledge entry the selected knowledge base does not exist')
    }

    const {intent, documents, answer} = updatedKnowledgeEntry;
    const newKnowledgeEntry = createKnowledgeEntry(intent, documents, answer)

    // Validate the updated knowledge entry
    newKnowledgeEntry.validate()

    // update the selected knowledge base
    selectedKnowledgeBase.splice(knowledgeEntryIndex, 1, newKnowledgeEntry.toObject())

    await knowledgeRepository.updateKnowledgeBase(knowledgeBasePath, selectedKnowledgeBase)
  }

  return { execute }
}

export default updateKnowledgeEntry