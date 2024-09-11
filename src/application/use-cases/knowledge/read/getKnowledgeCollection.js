
function getKnowledgeCollection(knowledgeRepository) {
  const execute = async () => {
    const knowledgeCollection = await knowledgeRepository.getKnowledgeCollection()
    const formattedKnowledgeCollection = {};

    for (const document of knowledgeCollection) {
      const {knowledgeBase, knowledgeEntry} = document
      formattedKnowledgeCollection[knowledgeBase] = knowledgeEntry
    }

    return formattedKnowledgeCollection;
  }
  return { execute }
}
export default getKnowledgeCollection