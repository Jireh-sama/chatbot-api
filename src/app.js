import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import { knowledgeRoutes, authRoutes, chatbotRoutes } from './interface/routes/index.js';
import { globalErrorHandler } from './interface/middleware/errorHandler.js';
import cookieParser from 'cookie-parser';
import { rateLimit } from 'express-rate-limit'
import { verifyToken } from './interface/middleware/authMiddleware.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicPath = path.join(__dirname, '..', 'public');
const port = process.env.PORT || 3001;
const app = express();

const WHITELIST_URL = ["https://chatbot-api-0zup.onrender.com", "http://localhost:5173"]

app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    connectSrc: [
      "'self'",
      "https://firestore.googleapis.com",
      "https://firebase.googleapis.com",
      "https://firebaseinstallations.googleapis.com",
    ],
    scriptSrc: [
      "'self'",
      "https://www.gstatic.com",
      "https://www.googleapis.com",
      "https://www.googleapis.com/auth",
      "https://*.firebaseio.com",
    ],
    styleSrc: [
      "'self'",
      "https://fonts.googleapis.com",
    ],
    imgSrc: [
      "'self'",
      "https://*.firebaseio.com",
      "https://firebasestorage.googleapis.com",
    ],
    fontSrc: [
      "'self'",
      "https://fonts.gstatic.com",
    ],
  },
}));

app.use(cors({
  origin: ['http://localhost:5173', 'https://cob-chatbot.vercel.app', 'http://localhost:3001', 'https://chatbot-adminpanel.vercel.app'],
  credentials: true,
}));

app.use(bodyParser.json());
app.use(cookieParser())
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100,
  message: 'Too many requests, please try again later.'
})
app.use((req, res, next) => {
  if (WHITELIST_URL.includes(req.headers.origin)) {
    return next()
  }
  limiter(req, res, next)
})
app.use('/user', express.static(path.join(publicPath, 'user')));
app.get('/user/*', (req, res) => {
  res.sendFile(path.join(publicPath, 'user', 'index.html'));
});
app.use('/admin', express.static(path.join(publicPath, 'admin')));
app.get('/admin/*', (req, res) => {
  res.sendFile(path.join(publicPath, 'admin', 'index.html'));
});

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