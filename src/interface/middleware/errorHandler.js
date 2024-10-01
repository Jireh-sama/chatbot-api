export const globalErrorHandler = (err, req, res, next) => {
  console.error(err); // Log the error for debugging

  const statusCode = err.status || 500; // Set a default status code
  const message = err.message || 'Internal Server Error'; // Set a default message

  // Send a standardized error response
  res.status(statusCode).json({
    success: false,
    message: message,
  });
}

export const asyncHandler = (fn) => {
  return async function (req, res, next) {
      try {
          await fn(req, res, next);
      } catch (error) {
          next(error);
      }
  };
}