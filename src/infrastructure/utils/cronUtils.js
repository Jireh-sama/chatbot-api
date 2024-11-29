import cron from "node-cron";
import { archiveRepository } from "../service/index.js";
import { logMessage } from "./loggingUtils.js";

export const initializeCronTasks = () => {
  // Schedule to run daily at 12:00 AM
  cron.schedule("0 0 * * *", removeOldKnowledgeArchives);
  console.log("Cron tasks initialized.");
};

const removeOldKnowledgeArchives = async () => {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const deletedBaseCount = await archiveRepository.removeOldArchives('knowledgeBases', thirtyDaysAgo)
  const deletedEntryCount = await archiveRepository.removeOldArchives('knowledgeEntries', thirtyDaysAgo)

  logMessage(`Deleted total of "${deletedBaseCount}" for base and "${deletedEntryCount}" for entry.`)
};
