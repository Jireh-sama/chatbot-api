import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import { adminRepository } from "#src/infrastructure/service/index.js";
import { asyncHandler } from "../middleware/errorHandler.js";
import AuthController from "../controllers/authController.js";

//Use-cases
import CreateAdmin from "#src/application/use-cases/admin/createAdmin.js";
import LoginAdmin from "#src/application/use-cases/admin/loginAdmin.js";
import LogoutAdmin from "#src/application/use-cases/admin/logoutAdmin.js";
import IssueAdminNewAccessToken from "#src/application/use-cases/admin/issueAdminNewAccessToken.js";
import DeleteAdmin from "#src/application/use-cases/admin/deleteAdmin.js";
import GetAllAdmin from "../../application/use-cases/admin/getAllAdmin.js";
import ResetAdminPassword from "../../application/use-cases/admin/resetAdminPassword.js";
import UpdateAdminRole from "../../application/use-cases/admin/updateAdminRole.js";

const createAdmin = CreateAdmin(adminRepository);
const loginAdmin = LoginAdmin(adminRepository);
const logoutAdmin = LogoutAdmin(adminRepository);
const deleteAdmin = DeleteAdmin(adminRepository);
const getAllAdmin = GetAllAdmin(adminRepository)
const resetAdminPassword = ResetAdminPassword(adminRepository)
const updateAdminRole = UpdateAdminRole(adminRepository)

const issueAdminNewAccessToken = IssueAdminNewAccessToken(adminRepository);

const authController = AuthController(
  createAdmin,
  loginAdmin,
  logoutAdmin,
  deleteAdmin,
  getAllAdmin,
  resetAdminPassword,
  updateAdminRole,
  issueAdminNewAccessToken
);

const router = express.Router();

router.put("/reset", verifyToken, asyncHandler(authController.handleResetAdminPassword))
router.put("/role", verifyToken, asyncHandler(authController.handleUpdateAdminRole))

router.get("/admins", verifyToken, asyncHandler(authController.handleGetAllAdmin))
router.post("/logout", verifyToken, asyncHandler(authController.handleAdminLogout));
router.post("/register", verifyToken, asyncHandler(authController.handleAdminRegister));
router.post("/login", asyncHandler(authController.handleAdminLogin));
router.post("/refresh-token", asyncHandler(authController.handleAdminRefreshToken));

router.delete("/:id", verifyToken, asyncHandler(authController.handleDeleteAdmin));

export default router;
