function adminRepository(db) {

  const findOneAdmin = async (filter) => {
    return await db.readCollection(filter, null, true)
  }

  const findAllAdmin = async (email) => {
    const query = { email }
    const isSingle = true
    return await db.readCollection(query, null, isSingle)
  }
  const createAdmin = async (email, password) => {
    const document = { email, password }
    await db.addDocument(document)
  }
  const updateAdminRefreshToken = async (adminId, query) => {
    await db.updateDocument({ _id: adminId }, query)
  } 
  
  return {
    findOneAdmin,
    findAllAdmin,
    createAdmin,
    updateAdminRefreshToken,
  }
}

export default adminRepository
