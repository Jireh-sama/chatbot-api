import { verifyPassword } from "#src/infrastructure/utils/passwordUtils.js";
import { generateAccessToken } from "#src/infrastructure/utils/tokenUtils.js";
import { ACCESS_TOKEN_EXPIRATION_TIME, REFRESH_TOKEN_EXPIRATION_TIME } from "#src/infrastructure/config/token.js";

function loginAdmin(adminRepository) {
  const execute = async (email, password) => {

    const adminRecord = await adminRepository.findOneAdmin({ email })
    
    if (!adminRecord) {
      throw new CustomError('Invalid credentials', 404)
    }
    const isPasswordValid = await verifyPassword(password, adminRecord.password)
    
    if (!isPasswordValid) {
      throw new CustomError('Invalid credentials', 404)
    }

    const accessToken = generateAccessToken({ id: adminRecord._id}, process.env.ACCESS_TOKEN_SECRET, ACCESS_TOKEN_EXPIRATION_TIME)
    const refreshToken = generateAccessToken({ id: adminRecord._id}, process.env.REFRESH_TOKEN_SECRET, REFRESH_TOKEN_EXPIRATION_TIME)
    
    await adminRepository.updateAdminRefreshToken(adminRecord._id, { $set: { refreshToken } } )

    if (process.env.NODE_ENV === 'development') {
      console.log('Successfully logged in admin:', adminRecord);
    }
    const adminInfo = { email: adminRecord.email, role: adminRecord.role, id: adminRecord._id  }
    return {accessToken, refreshToken, adminInfo}
  }
  return {execute}
}

export default loginAdmin