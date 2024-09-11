
function getKnowledgeBase(knowledgeRepository) {

  const execute = async () => {
    const knowledgeBase = await knowledgeRepository.getKnowledgeBaseList()
    const knowledgeBaseList = []
   for (const base of knowledgeBase) {
    knowledgeBaseList.push(base['knowledgeBase'])
   }
    return knowledgeBaseList
  }
  return { execute }
}
export default getKnowledgeBase