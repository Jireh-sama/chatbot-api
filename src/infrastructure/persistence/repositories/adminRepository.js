function adminRepository(db) {

  const findOneAdmin = async (filter) => {
    return await db.readCollection(filter, null, true)
  }

  const findAllAdmin = async () => {
    const projection = { refreshToken: 0 }
    return await db.readCollection({}, projection)
  }
  const createAdmin = async (email, password, role) => {
    const document = { email, password, role }
    await db.addDocument(document)
  }
  const deleteAdmin = async (id) => {
    const filter = { _id: id }
    return await db.deleteDocument(filter)
  }
  const updateAdminRefreshToken = async (adminId, query) => {
    await db.updateDocument({ _id: adminId }, query)
  } 

  const updateAdminPassword = async (id, newPassword) => {
    const query = { _id: id };
    const updateDocument = { $set: { password: newPassword } }
    await db.updateDocument(query, updateDocument)
  }

  const updateAdminRole = async (id, newRole) => {
    const query = { _id: id };
    const updateDocument = { $set: { role: newRole } }
    await db.updateDocument(query, updateDocument)
  };
  return {
    findOneAdmin,
    findAllAdmin,
    createAdmin,
    deleteAdmin,
    updateAdminPassword,
    updateAdminRole,
    updateAdminRefreshToken,
  }
}

export default adminRepository
