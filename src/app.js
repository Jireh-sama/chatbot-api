import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import knowledgeRoutes from './interface/routes/knowledgeRoutes.js'
import chatbotRoutes from './interface/routes/chatbotRoutes.js'
import validateRequestMiddleware from './interface/middleware/validateRequestMiddleware.js';

const port = process.env.PORT || 3001;
const app = express();

app.use(bodyParser.json());
app.use(cors({ origin: '*' }));
app.use(validateRequestMiddleware)

app.use('/api', knowledgeRoutes)
app.use('/api', chatbotRoutes)

const startServer = () => {
  app.listen(port, () => {
    console.log(`🚀 Server is listening on port: ${port}`);
  });
}

export default startServer;