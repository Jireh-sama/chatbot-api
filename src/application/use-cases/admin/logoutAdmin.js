function logoutAdmin(adminRepository) {
  const execute = async (refreshToken) => {

    const foundAdmin = await adminRepository.findOneAdmin({ refreshToken })

    if (!foundAdmin) {
      throw new CustomError('No admin found with the given credentials', 404)
    }

    // remove refresh token on logout
    await adminRepository.updateAdminRefreshToken(foundAdmin._id, { $unset: { refreshToken: '' } })
  }
  return { execute } 
}

export default logoutAdmin