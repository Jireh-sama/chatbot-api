function authenticateUser(userRepository) {
  const execute = (email, password) => {
    console.log(`${email} ${password}`);
  }
  return { execute }
}

export default authenticateUser