import createKnowledgeEntry from "#domain/entities/knowledgeEntry.js"
import { isArrayEmpty } from "#infrastructure/utils/objectUtils.js";

function updateKnowledgeEntry(knowledgeRepository) {

  const execute = async (knowledgeEntryIntent, updatedKnowledgeEntry) => {

    // const targetKnowledgeBase = await knowledgeRepository.readKnowledgeBase(
    //   knowledgeBase
    // );
    
    // if (isArrayEmpty(targetKnowledgeBase)) {
    //   throw new Error('Cannot update knowledge entry the selected knowledge base does not exist')
    // }


    const {intent, documents, answer} = updatedKnowledgeEntry;

    const newKnowledgeEntry = createKnowledgeEntry(intent, documents, answer)
    newKnowledgeEntry.validate()

    await knowledgeRepository.updateKnowledgeEntry(knowledgeEntryIntent, newKnowledgeEntry.toObject())
  }

  return { execute }
}

export default updateKnowledgeEntry