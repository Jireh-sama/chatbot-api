import express from "express";
import KnowledgeController from "../controllers/knowledgeController.js";
import { knowledgeRepository } from "#src/infrastructure/service/index.js";

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

router.post('/', (req, res) => knowledgeController.createKnowledgeBase(req, res))
router.post('/entry', (req, res) => knowledgeController.addKnowledgeEntry(req, res))

router.put('/entry', (req, res) => knowledgeController.updateKnowledgeEntry(req, res))

router.get('/', (req, res) => knowledgeController.getKnowledgeCollection(req, res))
router.get('/base', (req, res) => knowledgeController.getKnowledgeBase(req, res))
router.get('/:knowledgeBase', (req, res) => knowledgeController.getKnowledgeEntry(req, res))


router.delete('/entry', (req, res) => knowledgeController.deleteKnowledgeEntry(req, res))
router.delete('/entry/document', (req, res) => knowledgeController.deleteKnowledgeEntryDocument(req, res))
router.delete('/:knowledgeBaseName', (req, res) => knowledgeController.deleteKnowledgeBase(req, res))

export default router