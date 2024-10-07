import 'dotenv/config'
import startServer from'./app.js';
import { chatbotClient } from './infrastructure/service/index.js';
import CustomError from './infrastructure/errors/CustomError.js';

global.CustomError = CustomError;

const initialize = async () => {
    await chatbotClient.initialize()
    startServer();
}

initialize().catch(error => {
    console.error('Initialization failed:', error);
});


