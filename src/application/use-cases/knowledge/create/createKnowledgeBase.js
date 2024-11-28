import createKnowledgeEntry from "#src/domain/entities/knowledgeEntry.js";

function createKnowledgeBase(knowledgeRepository) {
  const execute = async (knowledgeBase, knowledgeEntries) => {
    const existingKnowledge = await knowledgeRepository.getKnowledgeBase(
      knowledgeBase
    );
    if (existingKnowledge) {
      throw new Error("Knowledge base already exist");
    }

    if (!(knowledgeEntries instanceof Array)) {
      throw new CustomError('Invalid format for the knowledge entries', 400)
    }

    const newKnowledgeEntries = []

    knowledgeEntries.forEach(entry => {
      const { intent, documents, answer, fileUrl } = entry;
      const newKnowledgeEntry = createKnowledgeEntry(intent, documents, answer, fileUrl);
      newKnowledgeEntry.validate();
      newKnowledgeEntries.push(newKnowledgeEntry.toObject())
    });
    
    await knowledgeRepository.createKnowledgeBase(knowledgeBase, newKnowledgeEntries);
  };
  return { execute };
}

export default createKnowledgeBase;
