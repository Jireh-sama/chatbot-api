import { ObjectId } from "mongodb";
import createKnowledgeEntry from "../../../domain/entities/knowledgeEntry.js";

function restoreKnowledgeBase(archiveRepository, knowledgeRepository) {
  const ARCHIVE_TYPE = "knowledgeBases";

  const execute = async (knowledgeBaseId) => {
    const knowledgeBaseArchive = await archiveRepository.getArchiveDocument(
      ARCHIVE_TYPE
    );
    const selectedKnowledgeBase = knowledgeBaseArchive.items.find((item) =>
      item._id.equals(ObjectId.createFromHexString(knowledgeBaseId))
    );
    if (!selectedKnowledgeBase) {
      throw new CustomError(`Error restoring knowledge base`, 400);
    }

    const newKnowledgeEntries = [];

    const { knowledgeBase, knowledgeEntry } = selectedKnowledgeBase;

    // Update knowledge base if one already exist
    const existingKnowledgeBase = await knowledgeRepository.getKnowledgeBase(
      knowledgeBase
    );
    const newKnowledgeBaseName = existingKnowledgeBase ? `${knowledgeBase}-${Date.now()}` : knowledgeBase

    await Promise.all(
      knowledgeEntry.map(async (entry) => {
        try {
          const { intent, documents, answer, fileUrl } = entry;

          // Update intent if one already exist
          const existingIntent = await knowledgeRepository.getKnowledgeEntry(intent);
          const newIntent = existingIntent ? `${intent}_${Date.now()}` : intent

          const newKnowledgeEntry = createKnowledgeEntry(
            newIntent,
            documents,
            answer,
            fileUrl
          );
          newKnowledgeEntry.validate();
          newKnowledgeEntries.push(newKnowledgeEntry.toObject());
        } catch (error) {
          console.error('Error processing entry:', error);
        }
      })
    );
    

    await Promise.all([
      archiveRepository.removeKnowledgeArchive(
        ARCHIVE_TYPE,
        selectedKnowledgeBase._id
      ),
      knowledgeRepository.createKnowledgeBase(
        newKnowledgeBaseName,
        newKnowledgeEntries
      ),
    ]);
    

    return knowledgeBase === newKnowledgeBaseName
      ? `Knowledge base "${newKnowledgeBaseName}" restored.`
      : `Knowledge base "${knowledgeBase}" renamed to "${newKnowledgeBaseName}" and restored.`;

  };

  return { execute };
}

export default restoreKnowledgeBase;
