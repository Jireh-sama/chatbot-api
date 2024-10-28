function updateQuestionFrequency(knowledgeRepository) {
  const execute = async () => {
    const topFiveKnowledgeEntry = await knowledgeRepository.getTop5KnowledgeEntry();
    topFiveKnowledgeEntry.forEach(entry => {
      console.log(entry.document);
    });
  }
  return { execute }
}

export default updateQuestionFrequency