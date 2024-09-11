import express from "express";
import KnowledgeBaseRepository from '#infrastructure/persistence/repositories/knowledgeBaseRepository.js'
import KnowledgeController from "#interface/controllers/knowledgeController.js"; 
import MongoDbClient from "#infrastructure/persistence/database/mongodb/client.js";
import { uri, defaultMongoDbConfig, dbName, collectionName } from "#infrastructure/config/db.js";
// import FileSystemStorage from "#infrastructure/persistence/database/storage/fileSystemStorage.js";

// Use-Cases
import CreateKnowledgeBase from "#application/use-cases/knowledge/create/createKnowledgeBase.js";
import DeleteKnowledgeBase from "#application/use-cases/knowledge/delete/deleteKnowledgeBase.js";
import GetKnowledgeCollection from "#application/use-cases/knowledge/read/getKnowledgeCollection.js";
import GetKnowledgeEntry from "#application/use-cases/knowledge/read/getKnowledgeEntry.js";
import UpdateKnowledgeEntry from "#application/use-cases/knowledge/update/updateKnowledgeEntry.js";
import DeleteKnowledgeEntry from "#application/use-cases/knowledge/delete/deleteKnowledgeEntry.js";
import AddKnowledgeEntry from "#application/use-cases/knowledge/create/addKnowledgeEntry.js";
import DeleteKnowledgeEntryDocument from "#application/use-cases/knowledge/delete/deleteKnowledgeEntryDocument.js";
import GetKnowledgeBase from "#application/use-cases/knowledge/read/getKnowledgeBase.js";

// const fileSystemStorage = FileSystemStorage()
const mongoDbClient = MongoDbClient(uri, dbName, collectionName, defaultMongoDbConfig)
const knowledgeBaseRepository = KnowledgeBaseRepository(mongoDbClient)

const getKnowledgeCollection = GetKnowledgeCollection(knowledgeBaseRepository)
const getKnowledgeEntry = GetKnowledgeEntry(knowledgeBaseRepository)
const getKnowledgeBase = GetKnowledgeBase(knowledgeBaseRepository)
const createKnowledgeBase = CreateKnowledgeBase(knowledgeBaseRepository)
const deleteKnowledgeBase = DeleteKnowledgeBase(knowledgeBaseRepository)
const updateKnowledgeEntry = UpdateKnowledgeEntry(knowledgeBaseRepository)
const deleteKnowledgeEntry = DeleteKnowledgeEntry(knowledgeBaseRepository)
const addKnowledgeEntry = AddKnowledgeEntry(knowledgeBaseRepository)
const deleteKnowledgeEntryDocument = DeleteKnowledgeEntryDocument(knowledgeBaseRepository)

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

router.post('/knowledge', (req, res) => knowledgeController.createKnowledgeBase(req, res))
router.post('/knowledge/entry', (req, res) => knowledgeController.addKnowledgeEntry(req, res))

router.put('/knowledge/entry', (req, res) => knowledgeController.updateKnowledgeEntry(req, res))

router.get('/knowledge', (req, res) => knowledgeController.getKnowledgeBase(req, res))
router.get('/knowledge/:knowledgeBase', (req, res) => knowledgeController.getKnowledgeEntry(req, res))


router.delete('/knowledge/entry', (req, res) => knowledgeController.deleteKnowledgeEntry(req, res))
router.delete('/knowledge/entry/document', (req, res) => knowledgeController.deleteKnowledgeEntryDocument(req, res))
router.delete('/knowledge/:knowledgeBaseName', (req, res) => knowledgeController.deleteKnowledgeBase(req, res))

export default router