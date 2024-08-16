require('module-alias/register');
const startServer = require('../core/server.js');
const { startModel } = require('./nlp/index.js');


const initialize = async () => {
    await startModel();
    startServer();
}

initialize().catch(error => {
    console.error('Initialization failed:', error);
});


