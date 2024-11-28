import { ObjectId } from "mongodb";

function removeKnowledgeEntry(archiveRepository) {
  const ARCHIVE_TYPE = 'knowledgeEntries'

  const execute = async (knowledgeEntryId) => {

    const knowledgeEntryArchive = await archiveRepository.getArchiveDocument(ARCHIVE_TYPE)
    const selectedKnowledgeEntry = knowledgeEntryArchive.items.find(
      item => item._id.equals(ObjectId.createFromHexString(knowledgeEntryId))
    );

    if (!selectedKnowledgeEntry || !selectedKnowledgeEntry.knowledgeBase || !selectedKnowledgeEntry.knowledgeEntry)  {
      throw new CustomError(`Knowledge entry not found or invalid`, 404)
    }

    await archiveRepository.removeKnowledgeArchive(ARCHIVE_TYPE, selectedKnowledgeEntry._id)

    return selectedKnowledgeEntry.knowledgeEntry.intent
  };

  return { execute }
}

export default removeKnowledgeEntry