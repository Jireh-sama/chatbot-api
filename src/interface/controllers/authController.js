function authController(authenticateUserUseCase) {
  const loginUser = async (req, res) => {
    try {
      console.log('works');
      const { email, password } = req.body
      await authenticateUserUseCase.execute(email, password)
      res.status(200).json({ message: 'Successfully logged in' })
    } catch (error) {
      res.status(500).json({ message: 'something went wrong' })
      console.log(error);      
    }
  }

  return {
    loginUser
  }
}

export default authController