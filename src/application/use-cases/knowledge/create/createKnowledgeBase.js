import createKnowledgeEntry from "#domain/entities/knowledgeEntry.js";

function createKnowledgeBase(knowledgeRepository) {
  const execute = async (knowledgeBase, knowledgeEntry) => {
    const existingKnowledge = await knowledgeRepository.getKnowledgeBase(
      knowledgeBase
    );
    if (existingKnowledge) {
      throw new Error("Knowledge base already exist");
    }
    const { intent, documents, answer } = knowledgeEntry;
    const newKnowledgeEntry = createKnowledgeEntry(intent, documents, answer);
    newKnowledgeEntry.validate();
    
    await knowledgeRepository.createKnowledgeBase(knowledgeBase, newKnowledgeEntry.toObject());
  };
  return { execute };
}

export default createKnowledgeBase;
