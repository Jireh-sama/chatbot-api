function authController(
  createAdminUseCase,
  loginAdminUseCase,
  logoutAdminUseCase,
  issueAdminNewAccessTokenUseCase,
) {
  const handleAdminLogin = async (req, res) => {
    const { email, password } = req.body;
    const { accessToken, refreshToken } = await loginAdminUseCase.execute(
      email,
      password
    );
    res.cookie("jwt", refreshToken, {
      httpOnly: true,   // Important for security
      secure: true,     // Must be secure (HTTPS) when using SameSite=None
      sameSite: 'Lax', // Required for cross-site usage
    });
    res.status(200).json({ success: true, accessToken });
  };

  const handleAdminRegister = async (req, res) => {
    const { email, password } = req.body;
    await createAdminUseCase.execute(email, password);
    res.status(201).json({ message: "User created successfully" });
  };

  const handleAdminLogout = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) throw new CustomError("JWT cookie not found", 404);

    await logoutAdminUseCase.execute(cookies.jwt);
    res.status(200).json({ message: "Logout success" });
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
    handleAdminRefreshToken,
  };
}

export default authController;
