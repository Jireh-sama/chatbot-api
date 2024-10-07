import { verifyToken, verifyAPIKey } from "../middleware/authMiddleware.js";
import { asyncHandler } from "../middleware/errorHandler.js";

import express from "express";
import ChatbotController from "../controllers/chatbotController.js";
import { chatbotClient } from "#src/infrastructure/service/index.js";

import ProcessUserQuery from "#src/application/use-cases/chatbot/processUserQuery.js";
import TrainChatbot from "#src/application/use-cases/chatbot/trainChatbot.js";

const router = express.Router()

const processUserQuery = ProcessUserQuery(chatbotClient);
const trainChatbot = TrainChatbot(chatbotClient);

const chatBotController = ChatbotController(processUserQuery, trainChatbot);
  
router.post('/query', verifyAPIKey, asyncHandler(chatBotController.processUserQuery))
router.post('/query-admin', verifyToken, asyncHandler(chatBotController.processUserQuery))
router.post('/train', verifyToken, asyncHandler(chatBotController.trainChatbot))

export default router