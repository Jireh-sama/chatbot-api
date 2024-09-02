import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { nlpModelFileName } from './nlpManagerConfig.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const defaultKnowledgeDirectory = path.join(__dirname, '../persistence/database/storage/knowledge-files/');
export const defaultModelDirectory = path.join(__dirname, '../persistence/database/storage/model-files/');
export const modelFilePath = path.join(defaultModelDirectory, nlpModelFileName)
export const defaultKnowledgeExtension = '.json'

