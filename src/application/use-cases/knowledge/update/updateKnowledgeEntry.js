import createKnowledgeEntry from "#src/domain/entities/knowledgeEntry.js"

function updateKnowledgeEntry(knowledgeRepository) {

  const execute = async (knowledgeEntryIntent, updatedKnowledgeEntry) => {
    const result = await knowledgeRepository.getKnowledgeEntry(knowledgeEntryIntent);
    if (!result) {
      throw new CustomError(`No knowledge entry found with the intent: ${knowledgeEntryIntent}`, 404)
    }

    const { intent, documents, answer, fileUrl } = updatedKnowledgeEntry;
    let intentAlreadyExist = null

    if (knowledgeEntryIntent !== intent) {
      intentAlreadyExist = await knowledgeRepository.getKnowledgeEntry(intent);
    }

    if (intentAlreadyExist) {
      throw new CustomError(`A knowledge entry with intent ${intent} is already in use`, 400)
    }

    const newKnowledgeEntry = createKnowledgeEntry(intent, documents, answer, fileUrl)
    newKnowledgeEntry.validate()
    console.log(newKnowledgeEntry.toObject());

    await knowledgeRepository.updateKnowledgeEntry(knowledgeEntryIntent, newKnowledgeEntry.toObject())
  }

  return { execute }
}

export default updateKnowledgeEntry
