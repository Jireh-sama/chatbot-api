import express from "express";
import { adminRepository } from "#src/infrastructure/service/index.js";
import { asyncHandler } from "../middleware/errorHandler.js";
import AuthController from "../controllers/authController.js";

//Use-cases
import CreateAdmin from "#src/application/use-cases/admin/createAdmin.js";
import LoginAdmin from "#src/application/use-cases/admin/loginAdmin.js";
import LogoutAdmin from "../../application/use-cases/admin/logoutAdmin.js";
import IssueAdminNewAccessToken from "../../application/use-cases/admin/issueAdminNewAccessToken.js";

const createAdmin = CreateAdmin(adminRepository)
const loginAdmin = LoginAdmin(adminRepository)
const logoutAdmin = LogoutAdmin(adminRepository)
const issueAdminNewAccessToken = IssueAdminNewAccessToken(adminRepository)

const authController = AuthController(createAdmin, loginAdmin, logoutAdmin, issueAdminNewAccessToken);

const router = express.Router();

router.post('/login', asyncHandler(authController.handleAdminLogin))
router.post('/logout', asyncHandler(authController.handleAdminLogout))
router.post('/register', asyncHandler(authController.handleAdminRegister))
router.post('/refresh-token', asyncHandler(authController.handleAdminRefreshToken))

export default router