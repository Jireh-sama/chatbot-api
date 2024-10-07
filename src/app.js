import express from 'express';
import path from 'path'
import cors from 'cors';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import verifyAPIKey from './interface/middleware/validateRequestMiddleware.js';
import { knowledgeRoutes, authRoutes, chatbotRoutes } from './interface/routes/index.js';
import { getDirName } from './infrastructure/utils/pathUtils.js';
import { globalErrorHandler } from './interface/middleware/errorHandler.js';
import { verifyToken } from './interface/middleware/authMiddleware.js';
const port = process.env.PORT || 3001;
const app = express();

app.use(bodyParser.json());
app.use(cors({ origin: '*' }));
app.use(helmet())

app.use('/static/', express.static(path.join(getDirName(), 'static')));
app.use('/api/auth', authRoutes)
app.use('/api/knowledge', verifyToken, knowledgeRoutes)
app.use('/api/chatbot', chatbotRoutes)

app.use(globalErrorHandler)

const startServer = () => {
  app.listen(port, () => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`Server is running at http://localhost:${port}`);
      return;
    }
    console.log(`Server is running on port: ${port}`);
  });
}

export default startServer;