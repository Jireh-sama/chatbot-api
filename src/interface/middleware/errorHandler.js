import { extractQuotedText } from "../../infrastructure/utils/loggingUtils.js";

export const globalErrorHandler = (err, req, res, next) => {
  if (err instanceof CustomError) {
    const statusCode = err.statusCode;
    const message = err.message;

    return res.status(statusCode).json({
      success: false,
      message: message,
    });
  }
  if (process.env.NODE_ENV === 'development') {
    console.error('Error here: ', err.message); // Log the error for debugging
  }
  const statusCode = err.status || 500; // Set a default status code
  const message = err.message || 'Internal Server Error'; // Set a default message
  
  // Handle duplication error in MongoDb
  if (err.message.includes('E11000')) {
    const duplicateIntent = extractQuotedText(err.message)
    res.status(statusCode).json({
      success: false,
      message: `A knowledge entry with intent ${duplicateIntent} already exist`,
    });
    return;
  }
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