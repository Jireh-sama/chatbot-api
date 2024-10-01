import express from "express";
import { adminRepository } from "#src/infrastructure/service/index.js";
import AuthController from "../controllers/authController.js";

import AuthenticateAdmin from "#src/application/use-cases/auth/authenticateAdmin.js";
import { asyncHandler } from "../middleware/errorHandler.js";

const authenticateAdmin = AuthenticateAdmin(adminRepository)
const authController = AuthController(authenticateAdmin);

const router = express.Router();

router.post('/login', asyncHandler(authController.loginUser))
router.post('/register', asyncHandler(authController.registerUser))

export default router