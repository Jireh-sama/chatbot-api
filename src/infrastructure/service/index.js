// This is the file to initialize all our services like repositories, client etc

import MongoDbClient from "#infrastructure/persistence/database/mongodb/client.js";
import KnowledgeRepository from "#infrastructure/persistence/repositories/knowledgeRepository.js";
import ChatbotClient from "#infrastructure/persistence/chatbot/client.js";
import { uri, defaultMongoDbConfig, dbName, collectionName } from "#infrastructure/config/db.js";
import { nlpManagerConfig } from "#infrastructure/config/nlpManagerConfig.js";
import { modelFilePath } from "../config/paths.js";

const mongoDbClient = MongoDbClient(uri, dbName, collectionName, defaultMongoDbConfig);
const knowledgeRepository = KnowledgeRepository(mongoDbClient);
const chatbotClient = ChatbotClient(nlpManagerConfig, knowledgeRepository, modelFilePath)

export { mongoDbClient, knowledgeRepository, chatbotClient };