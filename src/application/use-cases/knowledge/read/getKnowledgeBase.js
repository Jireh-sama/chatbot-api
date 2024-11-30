function getKnowledgeBase(knowledgeRepository) {
  const execute = async () => {
    const knowledgeBase = await knowledgeRepository.getKnowledgeBaseList();
    const knowledgeBaseList = [];
    for (const base of knowledgeBase) {
      knowledgeBaseList.push({name: base["knowledgeBase"], totalEntries: base.knowledgeEntry.length});
    }
    return knowledgeBaseList;
  };
  return { execute };
}
export default getKnowledgeBase;
