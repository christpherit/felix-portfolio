// Centralized Error Handling Middleware
export const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  
  console.error(`[Express Error Handler] Error captured: ${err.message}`);
  if (err.stack) {
    console.error(err.stack);
  }

  res.json({
    success: false,
    message: err.message || 'Internal Server Error',
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};
