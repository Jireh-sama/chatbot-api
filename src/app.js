import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import knowledgeRoutes from './interface/routes/knowledgeRoutes.js'
import chatbotRoutes from './interface/routes/chatbotRoutes.js'
const port = process.env.PORT || 3001;
const app = express();

app.use(bodyParser.json());
app.use(cors({ origin: '*' }));

app.use('/api', knowledgeRoutes)
app.use('/api', chatbotRoutes)

const startServer = () => {
  app.listen(port, () => {
    console.log(`🚀 Server is listening at http://localhost:${port}`);
  });
}

export default startServer;