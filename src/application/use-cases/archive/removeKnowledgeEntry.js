import { ObjectId } from "mongodb";

function removeKnowledgeEntry(archiveRepository) {
  const ARCHIVE_TYPE = 'knowledgeEntries'

  const execute = async (knowledgeEntryId) => {

    const knowledgeEntryArchive = await archiveRepository.getArchiveDocument(ARCHIVE_TYPE)
    const selectedKnowledgeEntry = knowledgeEntryArchive.items.find(
      item => item._id.equals(ObjectId.createFromHexString(knowledgeEntryId))
    );

    if (!selectedKnowledgeEntry) {
      throw new CustomError(`Error deleting knowledge entry`, 400)
    }

    await archiveRepository.removeKnowledgeArchive(ARCHIVE_TYPE, selectedKnowledgeEntry._id)
  };

  return { execute }
}

export default removeKnowledgeEntry