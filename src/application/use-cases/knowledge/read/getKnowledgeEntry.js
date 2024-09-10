
function getKnowledgeEntry(knowledgeRepository) {
  const execute = async (knowledgeBase) => {
    const {knowledgeEntry} = await knowledgeRepository.readKnowledgeEntry(knowledgeBase)

    if (!knowledgeEntry) {
      throw new Error('Knowledge Entry does not exist')
    }
    console.log(knowledgeEntry);
    return knowledgeEntry
  }
  return { execute }
}
export default getKnowledgeEntry