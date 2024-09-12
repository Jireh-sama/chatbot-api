
function getKnowledgeCollection(knowledgeRepository) {
  const execute = async () => {
    const knowledgeCollection = await knowledgeRepository.getKnowledgeCollection()
    return knowledgeCollection;
  }
  return { execute }
}
export default getKnowledgeCollection