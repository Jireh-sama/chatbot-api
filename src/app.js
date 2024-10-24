import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import { knowledgeRoutes, authRoutes, chatbotRoutes } from './interface/routes/index.js';
import { globalErrorHandler } from './interface/middleware/errorHandler.js';
import cookieParser from 'cookie-parser';
import { rateLimit } from 'express-rate-limit'
import { verifyToken } from './interface/middleware/authMiddleware.js';
const port = process.env.PORT || 3001;
const app = express();


const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100,
  message: 'Too many requests, please try again later.'
})

app.use(limiter)
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(cookieParser())

app.use(cors({
  origin: ['http://localhost:5173', 'https://cob-chatbot.vercel.app', 'http://localhost:3001', 'https://chatbot-adminpanel.vercel.app'],
  credentials: true,
}));
app.use(helmet())


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