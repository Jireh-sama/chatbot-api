import createKnowledgeEntry from "#src/domain/entities/knowledgeEntry.js"

function addKnowledgeEntry(knowledgeRepository) {
  const execute = async (knowledgeBase, knowledgeEntry) => {

    const existingKnowledge = await knowledgeRepository.getKnowledgeBase(
      knowledgeBase
    );

    if (!existingKnowledge) {
      throw new CustomError(`Knowledge base ${knowledgeBase} does not exist`, 404)
    }

    const { intent, documents, answer, fileUrl } = knowledgeEntry 
    const newKnowledgeEntry = createKnowledgeEntry(intent, documents, answer, fileUrl)
    newKnowledgeEntry.validate()

    knowledgeRepository.addKnowledgeEntry(knowledgeBase, newKnowledgeEntry.toObject())
  }

  return { execute }
}

export default addKnowledgeEntry