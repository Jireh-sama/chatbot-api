import 'dotenv/config'
import startServer from'./app.js';
import { chatbotClient } from './infrastructure/service/index.js';
import CustomError from './infrastructure/errors/CustomError.js';
import { initializeCronTasks } from './infrastructure/utils/cronUtils.js';

global.CustomError = CustomError;

const initialize = async () => {
    await chatbotClient.train()
    startServer();
    initializeCronTasks();
}

initialize().catch(error => {
    console.error('Initialization failed:', error);
});


