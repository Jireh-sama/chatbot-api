import { hashPassword } from "#src/infrastructure/utils/passwordUtils.js"

function createAdmin(adminRepository) {
  const execute = async (email, password, role) => {
    const hashedPassword = await hashPassword(password)
    await adminRepository.createAdmin(email, hashedPassword, role)
  }
  return { execute }
}
export default createAdmin