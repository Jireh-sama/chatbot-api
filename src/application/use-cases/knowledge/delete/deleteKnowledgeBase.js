import { extractFileNameFromUrl } from "#src/infrastructure/utils/formatUtils.js";
import { deleteFile } from "../../../../infrastructure/persistence/database/firebase/client.js";
import { ObjectId } from "mongodb";

const DEFAULT_KNOWLEDGE_FILE_DIRECTORY = 'knowledge-files'

const deleteFilesFromStorage = async (knowledgeEntries) => {
  const filteredEntries = [];

  // Remove all knowledge files associated with entries
  await Promise.all(
    knowledgeEntries.map(async ({ fileUrl, ...rest }) => {
      const fileName = extractFileNameFromUrl(fileUrl);

      if (fileName) {
        try {
          await deleteFile(`${DEFAULT_KNOWLEDGE_FILE_DIRECTORY}/${fileName}`);
          console.log(`File ${fileName} deleted successfully.`);
        } catch (err) {
          console.error(`Failed to delete file ${fileName}:`, err);
        }
      }
      filteredEntries.push(rest); 
    })
  );

  return filteredEntries;
};

function deleteKnowledgeBase(archiveRepository, knowledgeRepository) {
  const execute = async (knowledgeBase) => {
    const targetKnowledgeBase = await knowledgeRepository.getKnowledgeBase(
      knowledgeBase
    );

    if (!targetKnowledgeBase) {
      throw new CustomError(`Knowledge Base ${knowledgeBase} not found`, 404);
    }

    await deleteFilesFromStorage(targetKnowledgeBase.knowledgeEntry) 
    
    const knowledgeBaseDocument = {
      _id: new ObjectId(),
      archivedAt: new Date(),
      knowledgeBase: targetKnowledgeBase.knowledgeBase,
      knowledgeEntry: [...targetKnowledgeBase.knowledgeEntry],
    };

    await Promise.all([
      knowledgeRepository.deleteKnowledgeBase(
        knowledgeBaseDocument.knowledgeBase
      ),
      archiveRepository.archiveData('knowledgeBases', knowledgeBaseDocument),
    ]);
  }
  return { execute }
}
export default deleteKnowledgeBase
