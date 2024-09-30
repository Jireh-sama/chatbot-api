import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import knowledgeRoutes from './interface/routes/knowledgeRoutes.js'
import chatbotRoutes from './interface/routes/chatbotRoutes.js'
import authRoutes from './interface/routes/authRoutes.js';
import path from 'path'
import { fileURLToPath } from 'url';
import validateRequestMiddleware from './interface/middleware/validateRequestMiddleware.js';

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const port = process.env.PORT || 3001;
const app = express();


app.use(bodyParser.json());
app.use(cors({ origin: '*' }));

app.use('/static/', express.static(path.join(__dirname, 'static')));

app.use('/api', validateRequestMiddleware,knowledgeRoutes)
app.use('/api', validateRequestMiddleware, chatbotRoutes)
app.use('/api', validateRequestMiddleware, authRoutes)


const startServer = () => {
  app.listen(port, () => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`Server is running at http://localhost:${port}`);
    }
  });
}

export default startServer;