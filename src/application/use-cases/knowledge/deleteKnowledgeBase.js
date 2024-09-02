import { defaultKnowledgeDirectory, defaultKnowledgeExtension } from "#infrastructure/config/paths.js"; 
import { getFilePath } from "#infrastructure/utils/getFilePath.js";



function deleteKnowledgeBase(knowledgeRepository) {
  const execute = async (knowledgeBaseName) => {
    const knowledgeBasePath = getFilePath(defaultKnowledgeDirectory, knowledgeBaseName, defaultKnowledgeExtension)
    const existingKnowledge = await knowledgeRepository.readKnowledgeBase(knowledgeBasePath)
    if (!existingKnowledge) {
      throw new Error('Cannot delete knowledge base, It does not exist')
    }
    
    await knowledgeRepository.deleteKnowledgeBase(knowledgeBasePath)
  }

  return { execute }
}
export default deleteKnowledgeBase