import express from "express";
import { adminRepository } from "#src/infrastructure/service/index.js";
import AuthController from "../controllers/authController.js";

import AuthenticateUser from "#application/use-cases/auth/authenticateUser.js";

const authenticateAdmin = AuthenticateAdmin(adminRepository)
const authController = AuthController(authenticateAdmin);


const router = express.Router();

router.post('/login', (req, res) => authController.loginUser(req, res))

export default router