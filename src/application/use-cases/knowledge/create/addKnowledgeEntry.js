import createKnowledgeEntry from "#src/domain/entities/knowledgeEntry.js"

function addKnowledgeEntry(knowledgeRepository) {
  const execute = async (knowledgeBase, knowledgeEntry) => {

    const existingKnowledge = await knowledgeRepository.getKnowledgeBase(
      knowledgeBase
    );

    if (!existingKnowledge) {
      throw new Error(`Knowledge base ${knowledgeBase} does not exist`);
    }

    const { intent, documents, answer } = knowledgeEntry 
    const newKnowledgeEntry = createKnowledgeEntry(intent, documents, answer)
    newKnowledgeEntry.validate()

    knowledgeRepository.addKnowledgeEntry(knowledgeBase, newKnowledgeEntry.toObject())
  }

  return { execute }
}

export default addKnowledgeEntry