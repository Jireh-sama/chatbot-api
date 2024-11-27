import express from "express";
import ArchiveController from "../controllers/archiveController.js";
import { archiveRepository, knowledgeRepository } from "../../infrastructure/service/index.js";
import { asyncHandler } from "../middleware/errorHandler.js";

import GetArchiveData from "../../application/use-cases/archive/getArchiveData.js";
import RemoveKnowledgeBase from "../../application/use-cases/archive/removeKnowledgeBase.js";
import RemoveKnowledgeEntry from "../../application/use-cases/archive/removeKnowledgeEntry.js";
import RestoreKnowledgeBase from "../../application/use-cases/archive/restoreKnowledgeBase.js";
import RestoreKnowledgeEntry from "../../application/use-cases/archive/restoreKnowledgeEntry.js";

const getArchiveData = GetArchiveData(archiveRepository)
const removeKnowledgeBase = RemoveKnowledgeBase(archiveRepository)
const removeKnowledgeEntry = RemoveKnowledgeEntry(archiveRepository)
const restoreKnowledgeBase = RestoreKnowledgeBase(archiveRepository, knowledgeRepository)
const restoreKnowledgeEntry = RestoreKnowledgeEntry(archiveRepository, knowledgeRepository)

const archiveController = ArchiveController(
  getArchiveData,
  removeKnowledgeBase,
  removeKnowledgeEntry,
  restoreKnowledgeBase,
  restoreKnowledgeEntry,
);

const router = express.Router()

router.post('/restore/knowledge-base', asyncHandler(archiveController.handleRestoreKnowledgeBase))
router.post('/restore/knowledge-entry', asyncHandler(archiveController.handleRestoreKnowledgeEntry))
router.get('/data/:archiveType', asyncHandler(archiveController.handleGetArchiveData))
router.delete('/knowledge-base/:knowledgeBaseId', asyncHandler(archiveController.handleRemoveKnowledgeBase))
router.delete('/knowledge-entry/:knowledgeEntryId', asyncHandler(archiveController.handleRemoveKnowledgeEntry))

export default router