class User {
  constructor(email, password) {
    this.email = email;
    this.password = password;
  }

  validate() {
    const errors = [];

    if (!this.isValidEmail(this.email)) {
      errors.push("Invalid email format");
    }

    if (!this.isValidPassword(this.password)) {
      errors.push("Invalid password");
    }

    return errors;
  }

  isValidEmail(email) {
    // Basic email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  isValidPassword(password) {
    // Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  }

  toObject() {
    return { email: this.email, password: this.password };
  }
}

export default User