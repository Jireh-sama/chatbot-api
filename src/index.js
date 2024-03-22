const startServer = require('./server');
const { loadOrCreateModel } = require('./node_nlp/nlp');

const initialize = async () => {
    await loadOrCreateModel();
    startServer();
}

initialize().catch(error => {
    console.error('Initialization failed:', error);
});


