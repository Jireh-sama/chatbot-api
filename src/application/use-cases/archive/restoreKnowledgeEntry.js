import { ObjectId } from "mongodb";
import createKnowledgeEntry from "../../../domain/entities/knowledgeEntry.js";

function restoreKnowledgeEntry(archiveRepository, knowledgeRepository) {
  const ARCHIVE_TYPE = 'knowledgeEntries'

  const execute = async (knowledgeEntryId) => {
    const knowledgeEntryArchive = await archiveRepository.getArchiveDocument(ARCHIVE_TYPE)
    const selectedKnowledgeEntry = knowledgeEntryArchive.items.find(
      item => item._id.equals(ObjectId.createFromHexString(knowledgeEntryId))
    );

    if (!selectedKnowledgeEntry) {
      throw new CustomError(`Error restoring knowledge entry`, 400);
    }
    const { knowledgeBase, knowledgeEntry } = selectedKnowledgeEntry

    const existingKnowledge = await knowledgeRepository.getKnowledgeBase(
      knowledgeBase
    );

    if (existingKnowledge) {
      const { intent, documents, answer } = knowledgeEntry 
      const existingIntent = await knowledgeRepository.getKnowledgeEntry(intent);
      const newIntent = existingIntent ? `${intent}_${Date.now()}` : intent

      const newKnowledgeEntry = createKnowledgeEntry(newIntent, documents, answer)

      await Promise.all([
        archiveRepository.removeKnowledgeArchive(
          ARCHIVE_TYPE,
          selectedKnowledgeEntry._id
        ),
        knowledgeRepository.addKnowledgeEntry(
          knowledgeBase,
          newKnowledgeEntry.toObject()
        ),
      ]);

    }else {
      // Create a knowledge base for the entry tha is being restored
      const newKnowledgeBaseName = `archive-${Date.now()}`
      const { intent, documents, answer } = knowledgeEntry 
      const existingIntent = await knowledgeRepository.getKnowledgeEntry(intent);
      const newIntent = existingIntent ? `${intent}_${Date.now()}` : intent
      const newKnowledgeEntry = createKnowledgeEntry(newIntent, documents, answer)
      
      await Promise.all([
        archiveRepository.removeKnowledgeArchive(
          ARCHIVE_TYPE,
          selectedKnowledgeEntry._id
        ),
        knowledgeRepository.createKnowledgeBase(newKnowledgeBaseName, [
          newKnowledgeEntry.toObject(),
        ]),
      ]);
    }
  };

  return { execute }
}

export default restoreKnowledgeEntry