import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import verifyAPIKey from './interface/middleware/validateRequestMiddleware.js';
import helmet from 'helmet';

const port = process.env.PORT || 3001;
const app = express();


app.use(bodyParser.json());
app.use(cors({ origin: '*' }));

app.use('/api', verifyAPIKey, knowledgeRoutes)
app.use('/api', verifyAPIKey, chatbotRoutes)
app.use('/api', verifyAPIKey, authRoutes)

const startServer = () => {
  app.listen(port, () => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`Server is running at http://localhost:${port}`);
    }
  });
}

export default startServer;