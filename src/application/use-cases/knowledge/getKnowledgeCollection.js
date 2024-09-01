import { defaultKnowledgeDirectory } from "#infrastructure/config/paths.js"; 
import path from 'path'

function getKnowledgeCollection(knowledgeRepository) {

  const execute = async () => {
    const knowledgeCollection = {}
    
    const knowledgeBaseFileNames = await knowledgeRepository.getKnowledgeBaseFileNames(defaultKnowledgeDirectory)
    const knowledgeBaseNames = knowledgeBaseFileNames.map(fileName => (fileName.split('.')[0]))
    
    const knowledgeBasePaths = knowledgeBaseFileNames.map(filename => path.join(defaultKnowledgeDirectory, filename))
    for (const [index, knowledgeBasePath] of knowledgeBasePaths.entries()) {
      const knowledgeBase = await knowledgeRepository.readKnowledgeBase(knowledgeBasePath);
      knowledgeCollection[knowledgeBaseNames[index]] = knowledgeBase;
    }

    return knowledgeCollection;
  }

  return { execute }

}

export default getKnowledgeCollection