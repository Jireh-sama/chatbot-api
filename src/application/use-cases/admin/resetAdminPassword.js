import { ObjectId } from "mongodb"
import { hashPassword, verifyPassword } from "#src/infrastructure/utils/passwordUtils.js"

function resetAdminPassword(adminRepository) {
  const execute = async (adminInfo) => {
    const { _id, password } = adminInfo
    const hashedPassword = await hashPassword(password)
    const id = ObjectId.createFromHexString(_id)

    const foundAdmin = await adminRepository.findOneAdmin({ _id: id})
    if (!foundAdmin) throw new CustomError('No admin found with the given credentials', 404)

    // console.log(foundAdmin);
    const isPasswordTheSame = await verifyPassword(password, foundAdmin.password)
    if (isPasswordTheSame) throw new CustomError('The new password cannot be the same as the current password. Please choose a different password.', 400)
      
    await adminRepository.updateAdminPassword(id, hashedPassword)
  }
  return { execute }
}

export default resetAdminPassword