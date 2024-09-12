import createKnowledgeEntry from "#domain/entities/knowledgeEntry.js"

function updateKnowledgeEntry(knowledgeRepository) {

  const execute = async (knowledgeEntryIntent, updatedKnowledgeEntry) => {

    const {intent, documents, answer} = updatedKnowledgeEntry;
    const newKnowledgeEntry = createKnowledgeEntry(intent, documents, answer)
    newKnowledgeEntry.validate()

    await knowledgeRepository.updateKnowledgeEntry(knowledgeEntryIntent, newKnowledgeEntry.toObject())
  }

  return { execute }
}

export default updateKnowledgeEntry
