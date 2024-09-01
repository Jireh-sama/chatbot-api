import express from "express";
import KnowledgeBaseRepository from '#infrastructure/persistence/repositories/knowledgeBaseRepository.js'
import KnowledgeController from "#interface/controllers/knowledgeController.js"; 
import FileSystemStorage from "#infrastructure/persistence/database/storage/fileSystemStorage.js";

// Use-Cases
import CreateKnowledgeBase from "#application/use-cases/knowledge/createKnowledgeBase.js";
import DeleteKnowledgeBase from "#application/use-cases/knowledge/deleteKnowledgeBase.js";
import GetKnowledgeCollection from "#application/use-cases/knowledge/getKnowledgeCollection.js";
import UpdateKnowledgeEntry from "#application/use-cases/knowledge/updateKnowledgeEntry.js";
import DeleteKnowledgeEntry from "#application/use-cases/knowledge/deleteKnowledgeEntry.js";
import AddKnowledgeEntry from "#application/use-cases/knowledge/addKnowledgeEntry.js";

const fileSystemStorage = FileSystemStorage()
const knowledgeBaseRepository = KnowledgeBaseRepository(fileSystemStorage)

const getKnowledgeCollection = GetKnowledgeCollection(knowledgeBaseRepository)
const createKnowledgeBase = CreateKnowledgeBase(knowledgeBaseRepository)
const deleteKnowledgeBase = DeleteKnowledgeBase(knowledgeBaseRepository)
const updateKnowledgeEntry = UpdateKnowledgeEntry(knowledgeBaseRepository)
const deleteKnowledgeEntry = DeleteKnowledgeEntry(knowledgeBaseRepository)
const addKnowledgeEntry = AddKnowledgeEntry(knowledgeBaseRepository)


const knowledgeController = KnowledgeController(
  getKnowledgeCollection,
  createKnowledgeBase,
  deleteKnowledgeBase,
  updateKnowledgeEntry,
  deleteKnowledgeEntry,
  addKnowledgeEntry
);


const router = express.Router();

router.post('/knowledge', (req, res) => knowledgeController.createKnowledgeBase(req, res))
router.post('/knowledge/entry', (req, res) => knowledgeController.addKnowledgeEntry(req, res))

router.put('/knowledge/entry', (req, res) => knowledgeController.updateKnowledgeEntry(req, res))

router.get('/knowledge', (req, res) => knowledgeController.getKnowledgeCollection(req, res))

router.delete('/knowledge/entry', (req, res) => knowledgeController.deleteKnowledgeEntry(req, res))
router.delete('/knowledge/:knowledgeBaseName', (req, res) => knowledgeController.deleteKnowledgeBase(req, res))


export default router