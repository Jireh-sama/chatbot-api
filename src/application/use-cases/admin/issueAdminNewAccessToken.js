import { generateAccessToken } from "../../../infrastructure/utils/tokenUtils.js"

function issueAdminNewAccessToken(adminRepository) {
  const execute = async (refreshToken) => {

    const foundAdmin = await adminRepository.findOneAdmin({ refreshToken })

    if (!foundAdmin) {
      throw new CustomError('No admin found with the given credentials', 404)
    }

    return await generateAccessToken(foundAdmin, process.env.ACCESS_TOKEN_SECRET, '15m')
  }
  return { execute }
}

export default issueAdminNewAccessToken