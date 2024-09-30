import express from "express";
import { userRepository } from "#infrastructure/service/index.js";
import AuthController from "../controllers/authController.js";

import AuthenticateUser from "#application/use-cases/auth/authenticateUser.js";

const authenticateUser = AuthenticateUser(userRepository)
const authController = AuthController(authenticateUser);


const router = express.Router();

router.post('/login', (req, res) => authController.loginUser(req, res))

export default router