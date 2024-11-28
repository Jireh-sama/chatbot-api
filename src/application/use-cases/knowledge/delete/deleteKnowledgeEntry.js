import { ObjectId } from "mongodb";

function deleteKnowledgeEntry(archiveRepository, knowledgeRepository) {

  const execute = async (knowledgeBase, knowledgeEntryIntent) => {
  
    const targetKnowledgeBase = await knowledgeRepository.getKnowledgeBase(
      knowledgeBase
    );
    if (!targetKnowledgeBase) {
      throw new CustomError(`Knowledge Base ${knowledgeBase} not found`, 404);
    }

    if (targetKnowledgeBase.knowledgeEntry.length === 1) {
      throw new CustomError(`Unable to archive knowledge entry, because the associated knowledge base cannot be empty`, 400)
    }

    const targetKnowledgeEntry = targetKnowledgeBase.knowledgeEntry.filter((entry => entry.intent === knowledgeEntryIntent))
    console.log(targetKnowledgeEntry);
    if (!targetKnowledgeEntry || targetKnowledgeEntry.length === 0) {
      throw new CustomError(`Knowledge entry with intent ${knowledgeEntryIntent} does not exist on ${knowledgeBase}`, 404)
    }
    

    const knowledgeEntryDocument = {
      _id: new ObjectId(),
      archivedAt: new Date(),
      knowledgeBase: targetKnowledgeBase.knowledgeBase,
      knowledgeEntry: targetKnowledgeEntry[0],
    };

    await Promise.all([
      knowledgeRepository.deleteKnowledgeEntry(
        knowledgeBase,
        knowledgeEntryIntent
      ),
      archiveRepository.archiveData("knowledgeEntries", knowledgeEntryDocument),
    ]);
    // await 
  }

  return { execute }
}
export default deleteKnowledgeEntry