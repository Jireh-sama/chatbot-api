const startServer = require('./server');
const { loadOrCreateModel } = require('./node_nlp/nlp');

async function initialize() {
    await loadOrCreateModel();
    startServer();
}

initialize().catch(error => {
    console.error('Initialization failed:', error);
});


