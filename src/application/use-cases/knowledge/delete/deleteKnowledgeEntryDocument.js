function deleteKnowledgeEntryDocument(knowledgeRepository) {
  const execute = async ( knowledgeEntryIntent, documentValue ) => {
    await knowledgeRepository.deleteKnowledgeEntryDocument(knowledgeEntryIntent, documentValue)
  }
  return { execute }
}
export default deleteKnowledgeEntryDocument