import { verifyPassword } from "#src/infrastructure/utils/passwordUtils.js";
import { generateAccessToken } from "#src/infrastructure/utils/tokenUtils.js";

function loginAdmin(adminRepository) {
  const execute = async (email, password) => {

    const foundAdmin = await adminRepository.findOneAdmin({ email })
    
    if (!foundAdmin) {
      throw new CustomError('Invalid credentials', 404)
    }

    const isPasswordValid = await verifyPassword(password, foundAdmin.password)
    
    if (!isPasswordValid) {
      throw new CustomError('Invalid credentials', 404)
    }

    const accessToken = generateAccessToken({ id: foundAdmin._id}, process.env.ACCESS_TOKEN_SECRET, '15m')
    const refreshToken = generateAccessToken({ id: foundAdmin._id}, process.env.REFRESH_TOKEN_SECRET, '1d')
    
    await adminRepository.updateAdminRefreshToken(foundAdmin._id, { $set: { refreshToken } } )
    if (process.env.NODE_ENV === 'development') {
      console.log('Successfully logged in admin:', foundAdmin);
    }

    return {accessToken, refreshToken}
  }
  return {execute}
}

export default loginAdmin