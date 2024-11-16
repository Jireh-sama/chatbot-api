import { ObjectId } from "mongodb"
import { hashPassword, verifyPassword } from "#src/infrastructure/utils/passwordUtils.js"

function resetAdminPassword(adminRepository) {
  const execute = async (adminInfo) => {
    const { _id, password, newPassword } = adminInfo
    
    const hashedPassword = await hashPassword(newPassword)
    const id = ObjectId.createFromHexString(_id)

    const foundAdmin = await adminRepository.findOneAdmin({ _id: id})
    if (!foundAdmin) throw new CustomError('No admin found with the given credentials', 404)
    
    // Check if the current password matches
    const isPasswordValid = await verifyPassword(password, foundAdmin.password)
    if (!isPasswordValid) throw new CustomError('Admin password is incorrect', 400)

    // Prevent same password from before
    const isNewPasswordSameAsBefore = await verifyPassword(newPassword, foundAdmin.password)
    if (isNewPasswordSameAsBefore) throw new CustomError('New password must be different from the old one', 400)
      
    await adminRepository.updateAdminPassword(id, hashedPassword)
  }
  return { execute }
}

export default resetAdminPassword