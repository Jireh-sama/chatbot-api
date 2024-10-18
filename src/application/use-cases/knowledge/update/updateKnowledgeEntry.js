import createKnowledgeEntry from "#src/domain/entities/knowledgeEntry.js"

function updateKnowledgeEntry(knowledgeRepository) {

  const execute = async (knowledgeEntryIntent, updatedKnowledgeEntry) => {

    const { intent, documents, answer, fileUrl } = updatedKnowledgeEntry;
    const newKnowledgeEntry = createKnowledgeEntry(intent, documents, answer, fileUrl)
    newKnowledgeEntry.validate()
    console.log(newKnowledgeEntry.toObject());

    await knowledgeRepository.updateKnowledgeEntry(knowledgeEntryIntent, newKnowledgeEntry.toObject())
  }

  return { execute }
}

export default updateKnowledgeEntry
