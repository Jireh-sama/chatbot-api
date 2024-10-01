
function deleteKnowledgeBase(knowledgeRepository) {
  const execute = async (knowledgeBase) => {
    const existingKnowledge = await knowledgeRepository.getKnowledgeBase(
      knowledgeBase
    );

    if (!existingKnowledge) {
      throw new Error('Cannot delete knowledge base, It does not exist')
    }
    
    return await knowledgeRepository.deleteKnowledgeBase(knowledgeBase)
  }

  return { execute }
}
export default deleteKnowledgeBase