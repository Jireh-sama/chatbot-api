import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import { knowledgeRoutes, authRoutes, chatbotRoutes } from './interface/routes/index.js';
import { globalErrorHandler } from './interface/middleware/errorHandler.js';
import cookieParser from 'cookie-parser';
import { rateLimit } from 'express-rate-limit';
import { verifyToken } from './interface/middleware/authMiddleware.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const port = process.env.PORT || 3001;
const app = express();
const publicPath = path.join(__dirname, '..', 'public');

const WHITELIST_URL = ["https://chatbot-api-0zup.onrender.com", "http://localhost:5173"];

app.use(helmet());
app.use(cors({
  origin: ['http://localhost:5173', 'https://cob-chatbot.vercel.app', 'http://localhost:3001', 'https://chatbot-adminpanel.vercel.app'],
  credentials: true,
}));

const setCacheControl = (req, res, next) => {
  res.setHeader('Surrogate-Control', 'no-store');
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  next();
};

app.use(setCacheControl);
app.use(bodyParser.json());
app.use(cookieParser());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100,
  message: 'Too many requests, please try again later.'
});

app.use((req, res, next) => {
  if (WHITELIST_URL.includes(req.headers.origin)) {
    return next();
  }
  limiter(req, res, next);
});

// Serve admin static files before other routes
app.use('/admin', express.static(path.join(publicPath, 'admin')));
app.get('/admin/*', (req, res) => {
  res.sendFile(path.join(publicPath, 'admin', 'index.html'));
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/knowledge', verifyToken, knowledgeRoutes);
app.use('/api/chatbot', chatbotRoutes);

// Serve main static files only when path doesn't start with /admin or /api
app.use('/', (req, res, next) => {
  if (req.path.startsWith('/admin') || req.path.startsWith('/api')) {
    return next('route'); // Skip to the next route handler if path starts with /admin or /api
  }
  next(); // Continue to static file middleware
}, express.static(path.join(publicPath, 'main')));

// Catch-all route to serve main app for all other routes (except /admin and /api)
app.get('*', (req, res) => {
  if (!req.path.startsWith('/admin') && !req.path.startsWith('/api')) {
    res.sendFile(path.join(publicPath, 'main', 'index.html'));
  }
});

// Global error handler
app.use(globalErrorHandler);

const startServer = () => {
  app.listen(port, () => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`Server is running at http://localhost:${port}`);
      return;
    }
    console.log(`Server is running on port: ${port}`);
  });
};

export default startServer;
