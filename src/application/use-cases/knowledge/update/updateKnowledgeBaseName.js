
function updateKnowledgeBaseName(knowledgeRepository) {
  const execute = async (knowledgeBaseName, newKnowledgeBaseName) => {
    const existingKnowledge = await knowledgeRepository.getKnowledgeBase(knowledgeBaseName);
    
    if (!existingKnowledge) {
      throw new CustomError(`Cannot update the ${knowledgeBaseName} knowledge base it does not exist`, 400)
    }

    const newKnowledgeExists = await knowledgeRepository.getKnowledgeBase(newKnowledgeBaseName);
    if (newKnowledgeExists) {
      throw new CustomError(`Cannot update to ${newKnowledgeBaseName}, a knowledge base with this name already exists`, 400);
    }

    await knowledgeRepository.updateKnowledgeBaseName(knowledgeBaseName, newKnowledgeBaseName)
  };
  return { execute } 
}

export default updateKnowledgeBaseName
