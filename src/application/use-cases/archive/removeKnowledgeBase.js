import { ObjectId } from "mongodb";

function removeKnowledgeBase(archiveRepository) {
  const ARCHIVE_TYPE = 'knowledgeBases'

  const execute = async (knowledgeBaseId) => {
    const knowledgeBaseArchive = await archiveRepository.getArchiveDocument(ARCHIVE_TYPE)
    const selectedKnowledgeBase = knowledgeBaseArchive.items.find(
      item => item._id.equals(ObjectId.createFromHexString(knowledgeBaseId))
    );
    if (!selectedKnowledgeBase || !selectedKnowledgeBase._id || !selectedKnowledgeBase.knowledgeBase) {
      throw new CustomError(`Knowledge base not found or invalid`, 404)
    }

    await archiveRepository.removeKnowledgeArchive(ARCHIVE_TYPE, selectedKnowledgeBase._id)

    return selectedKnowledgeBase.knowledgeBase
  };
  return { execute }
}

export default removeKnowledgeBase