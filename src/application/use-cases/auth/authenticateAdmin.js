function authenticateAdmin(adminRepository) {
  const execute = (email, password) => {
    console.log(`${email} ${password}`);
  }
  return { execute }
}

export default authenticateAdmin