function userRepository(db) {

  const findByEmail = async (email) => {
    // logic to find user
  }
  const createUser = async (user) => {
    // logic to create user
  }
  
  return {
    findByEmail,
    createUser,
  }
}

export default userRepository
