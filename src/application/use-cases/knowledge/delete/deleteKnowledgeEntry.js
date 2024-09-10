import { defaultKnowledgeDirectory, defaultKnowledgeExtension } from "#infrastructure/config/paths.js"; 
import { getFilePath } from "#infrastructure/utils/pathUtils.js";

function deleteKnowledgeEntry(knowledgeRepository) {

  const execute = async (knowledgeBaseName, knowledgeEntryIndex) => {

    const knowledgeBasePath = getFilePath(defaultKnowledgeDirectory, knowledgeBaseName, defaultKnowledgeExtension)
    const selectedKnowledgeBase = await knowledgeRepository.readKnowledgeBase(knowledgeBasePath)

    if (selectedKnowledgeBase.length === 1 ) {
      throw new Error("Knowledge base only contains 1 entry there you cannot delete this");
    }

    if (knowledgeEntryIndex < 0 || knowledgeEntryIndex >= selectedKnowledgeBase.length) {
      throw new Error("Index out of bounds");
    }

    // Logic to delete the target knowledge entry
    selectedKnowledgeBase.splice(knowledgeEntryIndex, 1)

    await knowledgeRepository.updateKnowledgeBase(knowledgeBasePath, selectedKnowledgeBase)
  }

  return { execute }
}
export default deleteKnowledgeEntry