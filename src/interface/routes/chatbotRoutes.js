import { verifyToken, verifyAPIKey } from "../middleware/authMiddleware.js";
import { asyncHandler } from "../middleware/errorHandler.js";
// import cron from 'node-cron'

import express from "express";
import ChatbotController from "../controllers/chatbotController.js";
import { chatbotClient, knowledgeRepository } from "#src/infrastructure/service/index.js";

import ProcessUserQuery from "#src/application/use-cases/chatbot/processUserQuery.js";
import TrainChatbot from "#src/application/use-cases/chatbot/trainChatbot.js";
import UpdateKnowledgeEntryFrequency from "#src/application/use-cases/knowledge/update/updateKnowledgeEntryFrequency.js";
import UpdateQuestionFrequency from "../../application/use-cases/chatbot/updateQuestionFrequency.js";

const router = express.Router()

const processUserQuery = ProcessUserQuery(chatbotClient);
const trainChatbot = TrainChatbot(chatbotClient);
const updateKnowledgeEntryFrequency = UpdateKnowledgeEntryFrequency(knowledgeRepository);
const updateQuestionFrequency = UpdateQuestionFrequency(knowledgeRepository);

const chatBotController = ChatbotController(processUserQuery, trainChatbot, updateKnowledgeEntryFrequency, updateQuestionFrequency);
  
// cron.schedule('*/5 * * * * *', () => {
//   console.log('rawr');
// })

router.post('/query', verifyAPIKey, asyncHandler(chatBotController.processUserQuery))
router.post('/query-admin', verifyToken, asyncHandler(chatBotController.processUserQuery))
router.post('/train', asyncHandler(chatBotController.trainChatbot))
router.post('/frequency', asyncHandler(chatBotController.updateQuestionFrequency))

export default router