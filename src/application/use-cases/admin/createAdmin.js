import { hashPassword } from "#src/infrastructure/utils/passwordUtils.js"

function createAdmin(adminRepository) {
  const execute = async (email, password) => {
    const hashedPassword = await hashPassword(password)
    await adminRepository.createAdmin(email, hashedPassword)
  }
  return { execute }
}
export default createAdmin