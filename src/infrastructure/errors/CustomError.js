class CustomError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name; // Set the name of the error to the class name
  }
}

export default CustomError;