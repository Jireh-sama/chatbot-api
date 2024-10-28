function deleteKnowledgeEntry(knowledgeRepository) {

  const execute = async (knowledgeBase, knowledgeEntryIntent) => {
  
    const existingKnowledge = await knowledgeRepository.getKnowledgeBase(
      knowledgeBase
    );

    if (!existingKnowledge) throw new CustomError(`Knowledge base ${knowledgeBase} does not exist`, 404)

    const intentExist = existingKnowledge.knowledgeEntry.some((entry => entry.intent === knowledgeEntryIntent))

    if (!intentExist) throw new CustomError(`Knowledge entry with intent ${knowledgeEntryIntent} does not exist`, 404)
      
    await knowledgeRepository.deleteKnowledgeEntry(knowledgeBase, knowledgeEntryIntent)
  }

  return { execute }
}
export default deleteKnowledgeEntry