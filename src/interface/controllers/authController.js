function authController(
  createAdminUseCase,
  loginAdminUseCase,
  logoutAdminUseCase,
  deleteAdminUseCase,
  getAllAdminUseCase,
  resetAdminPasswordUseCase,
  updateAdminRoleUseCase,
  issueAdminNewAccessTokenUseCase,
) {
  const handleAdminLogin = async (req, res) => {
    const { email, password } = req.body;
    const { accessToken, refreshToken, adminInfo } = await loginAdminUseCase.execute(
      email,
      password
    );
    res.cookie("jwt", refreshToken, {
      httpOnly: true,   // Important for security
      secure: true,     // Must be secure (HTTPS) when using SameSite=None
      sameSite: 'None', // Required for cross-site usage
    });
    res.status(200).json({ success: true, accessToken, admin: adminInfo });
  };

  const handleAdminRegister = async (req, res) => {
    const { email, password, role } = req.body;
    await createAdminUseCase.execute(email, password, role);
    res.status(201).json({ message: "Admin created successfully" });
  };

  const handleAdminLogout = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) throw new CustomError("JWT cookie not found", 404);

    await logoutAdminUseCase.execute(cookies.jwt);
    res.status(200).json({ message: "Logout success" });
  };

  const handleDeleteAdmin = async (req, res) => {
    const id = req.params
    await deleteAdminUseCase.execute(id)
    res.status(200).json({ message: "Admin deleted successfully" });
  }

  const handleGetAllAdmin = async (req, res) => {
    const adminList = await getAllAdminUseCase.execute()
    res.status(200).json({ message: "Admin list retrieved successfully", admins: adminList });
  }
  
  const handleResetAdminPassword = async (req, res) => {
    const adminInfo = req.body
    await resetAdminPasswordUseCase.execute(adminInfo)
    res.status(200).json({ message: "Admin password has been reset" })
  }

  const handleUpdateAdminRole = async (req, res) => {
    const adminInfo = req.body
    await updateAdminRoleUseCase.execute(adminInfo)

    res.status(200).json({ message: "Admin role has been updated" })
  };

  const handleAdminRefreshToken = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) throw new CustomError("JWT cookie not found", 404);

    const newAccessToken = await issueAdminNewAccessTokenUseCase.execute(cookies.jwt);
    res.status(201).json({ accessToken: newAccessToken })
  };


  return {
    handleAdminLogin,
    handleAdminRegister,
    handleAdminLogout,
    handleDeleteAdmin,
    handleGetAllAdmin,
    handleResetAdminPassword,
    handleUpdateAdminRole,
    handleAdminRefreshToken,
  };
}

export default authController;
