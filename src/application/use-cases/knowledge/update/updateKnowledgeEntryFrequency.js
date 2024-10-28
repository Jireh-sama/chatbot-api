
function updateKnowledgeEntryFrequency(knowledgeRepository) {
  const execute = async (intent) => {
    const result = await knowledgeRepository.getKnowledgeEntry(intent)
    if(!result) return console.log(`No knowledge entry found with the given intent: ${intent}`)
      
    await knowledgeRepository.incrementKnowledgeEntryFrequency(intent)

  }

  return { execute }
}

export default updateKnowledgeEntryFrequency