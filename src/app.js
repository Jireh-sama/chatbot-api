import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import {
  knowledgeRoutes,
  authRoutes,
  chatbotRoutes,
  archiveRoutes,
} from "./interface/routes/index.js";
import { globalErrorHandler } from "./interface/middleware/errorHandler.js";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import { verifyToken } from "./interface/middleware/authMiddleware.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicPath = path.join(__dirname, "..", "public");
const port = process.env.PORT || 3001;
const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://cob-chatbot.vercel.app",
      "http://localhost:3001",
      "https://chatbot-adminpanel.vercel.app",
      "https://www.bacoorchatbot.com",
      "https://cob-chatbot.onrender.com",
    ],
    credentials: true,
  })
);

app.use(bodyParser.json());
app.use(cookieParser());

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/knowledge", verifyToken, knowledgeRoutes);
app.use("/api/chatbot", chatbotRoutes);
app.use("/api/archive", archiveRoutes);
app.get("/", (_, res) => {
  res.redirect(301, "/user");
});

// Static File routes
app.use("/user", express.static(path.join(publicPath, "user")));
app.get("/user/*", (req, res) => {
  res.sendFile(path.join(publicPath, "user", "index.html"));
});

app.use("/admin", express.static(path.join(publicPath, "admin")));
app.get("/admin/*", (req, res) => {
  res.sendFile(path.join(publicPath, "admin", "index.html"));
});

app.use(globalErrorHandler);

const startServer = () => {
  app.listen(port, () => {
    if (process.env.NODE_ENV === "development") {
      console.log(`Server is running at http://localhost:${port}`);
      return;
    }
    console.log(`Server is running on port: ${port}`);
  });
};

export default startServer;
