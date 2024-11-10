import { ACCESS_TOKEN_EXPIRATION_TIME } from "#src/infrastructure/config/token.js";
import { generateAccessToken } from "#src/infrastructure/utils/tokenUtils.js"

function issueAdminNewAccessToken(adminRepository) {
  const execute = async (refreshToken) => {
  
    const foundAdmin = await adminRepository.findOneAdmin({ refreshToken })

    if (!foundAdmin) {
      console.log('No admin found with this refresh token: ', refreshToken);
      throw new CustomError('No admin found with the given credentials', 404)
    }
    console.log('generating new access token for admin');
    return await generateAccessToken(foundAdmin, process.env.ACCESS_TOKEN_SECRET, ACCESS_TOKEN_EXPIRATION_TIME)
  }
  return { execute }
}

export default issueAdminNewAccessToken