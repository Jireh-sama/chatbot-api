function adminRepository(db) {

  const findByEmail = async (email) => {
    // logic to find user
  }
  const createAdmin = async (user) => {
    // logic to create admin
  }
  
  return {
    findByEmail,
    createAdmin,
  }
}

export default adminRepository
