const startServer = require('./src/server');
const { loadOrCreateModel } = require('./src/node_nlp/nlp');

const initialize = async () => {
    await loadOrCreateModel();
    startServer();
}

initialize().catch(error => {
    console.error('Initialization failed:', error);
});


