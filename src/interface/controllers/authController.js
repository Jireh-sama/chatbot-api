import { hashPassword } from "#src/infrastructure/utils/passwordUtils.js"

function authController(authenticateAdminUseCase) {
  const loginAdmin = async (req, res) => {
    const { email, password } = req.body
    await authenticateAdminUseCase.execute(email, password)
    res.status(200).json({ message: 'Successfully logged in' })
  }

  const registerAdmin = async (req, res) => {
    const { email, password } = req.body

    
    if (email) {
      throw new Error('Email exist')
    }
    const hashedPassword = await hashPassword(password)
    res.status(201).json({ message: 'User created successfully' })
  }

  return {
    loginAdmin,
    registerAdmin,
  }
}

export default authController