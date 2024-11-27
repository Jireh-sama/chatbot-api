import { ObjectId } from "mongodb";

function removeKnowledgeBase(archiveRepository) {
  const ARCHIVE_TYPE = 'knowledgeBases'

  const execute = async (knowledgeBaseId) => {
    const knowledgeBaseArchive = await archiveRepository.getArchiveDocument(ARCHIVE_TYPE)
    const selectedKnowledgeBase = knowledgeBaseArchive.items.find(
      item => item._id.equals(ObjectId.createFromHexString(knowledgeBaseId))
    );
    if (!selectedKnowledgeBase) {
      throw new CustomError(`Error deleting knowledge base`, 400)
    }

    await archiveRepository.removeKnowledgeArchive(ARCHIVE_TYPE, selectedKnowledgeBase._id)
  };
  return { execute }
}

export default removeKnowledgeBase