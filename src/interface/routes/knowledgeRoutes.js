import express from "express";
import KnowledgeController from "../controllers/knowledgeController.js";
import { knowledgeRepository } from "#src/infrastructure/service/index.js";
import { asyncHandler } from "../middleware/errorHandler.js";

// Use-Cases
import CreateKnowledgeBase from "#src/application/use-cases/knowledge/create/createKnowledgeBase.js";
import DeleteKnowledgeBase from "#src/application/use-cases/knowledge/delete/deleteKnowledgeBase.js";
import GetKnowledgeCollection from "#src/application/use-cases/knowledge/read/getKnowledgeCollection.js";
import GetKnowledgeEntry from "#src/application/use-cases/knowledge/read/getKnowledgeEntry.js";
import UpdateKnowledgeEntry from "#src/application/use-cases/knowledge/update/updateKnowledgeEntry.js";
import DeleteKnowledgeEntry from "#src/application/use-cases/knowledge/delete/deleteKnowledgeEntry.js";
import AddKnowledgeEntry from "#src/application/use-cases/knowledge/create/addKnowledgeEntry.js";
import DeleteKnowledgeEntryDocument from "#src/application/use-cases/knowledge/delete/deleteKnowledgeEntryDocument.js";
import GetKnowledgeBase from "#src/application/use-cases/knowledge/read/getKnowledgeBase.js";

const getKnowledgeCollection = GetKnowledgeCollection(knowledgeRepository)
const getKnowledgeEntry = GetKnowledgeEntry(knowledgeRepository)
const getKnowledgeBase = GetKnowledgeBase(knowledgeRepository)
const createKnowledgeBase = CreateKnowledgeBase(knowledgeRepository)
const deleteKnowledgeBase = DeleteKnowledgeBase(knowledgeRepository)
const updateKnowledgeEntry = UpdateKnowledgeEntry(knowledgeRepository)
const deleteKnowledgeEntry = DeleteKnowledgeEntry(knowledgeRepository)
const addKnowledgeEntry = AddKnowledgeEntry(knowledgeRepository)
const deleteKnowledgeEntryDocument = DeleteKnowledgeEntryDocument(knowledgeRepository)

const knowledgeController = KnowledgeController(
  getKnowledgeCollection,
  getKnowledgeEntry,
  getKnowledgeBase,
  createKnowledgeBase,
  deleteKnowledgeBase,
  updateKnowledgeEntry,
  deleteKnowledgeEntry,
  deleteKnowledgeEntryDocument,
  addKnowledgeEntry
);

const router = express.Router();

router.post('/',  asyncHandler(knowledgeController.createKnowledgeBase))
router.post('/entry',  asyncHandler(knowledgeController.addKnowledgeEntry))

router.put('/entry',  asyncHandler(knowledgeController.updateKnowledgeEntry))

router.get('/',  asyncHandler(knowledgeController.getKnowledgeCollection))
router.get('/base',  asyncHandler(knowledgeController.getKnowledgeBase))
router.get('/:knowledgeBase',  asyncHandler(knowledgeController.getKnowledgeEntry))


router.delete('/entry',  asyncHandler(knowledgeController.deleteKnowledgeEntry))
router.delete('/entry/document',  asyncHandler(knowledgeController.deleteKnowledgeEntryDocument))
router.delete('/:knowledgeBaseName',  asyncHandler(knowledgeController.deleteKnowledgeBase))

export default router