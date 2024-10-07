// This is the file to initialize all our services like repositories, client etc

import MongoDbClient from "../persistence/database/mongodb/client.js";
import KnowledgeRepository from "../persistence/repositories/knowledgeRepository.js";
import ChatbotClient from "../persistence/chatbot/client.js";
import AdminRepository from "../persistence/repositories/adminRepository.js";
import { uri, defaultMongoDbConfig, dbName, collectionName } from "../config/db.js";
import { nlpManagerConfig } from "../config/nlpManagerConfig.js";
import { modelFilePath } from "../config/paths.js";

const adminDB = MongoDbClient(uri, dbName, 'admin', defaultMongoDbConfig)
const knowledgeDB = MongoDbClient(uri, dbName, collectionName, defaultMongoDbConfig);

const knowledgeRepository = KnowledgeRepository(knowledgeDB);
const adminRepository = AdminRepository(adminDB)
const chatbotClient = ChatbotClient(nlpManagerConfig, knowledgeRepository, modelFilePath)

export { knowledgeRepository, chatbotClient, adminRepository };