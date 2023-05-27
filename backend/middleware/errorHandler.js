const errorHandler = (req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  return res.status(err.status).json({
    message: err.message,
    error: err,
  });
};

module.exports = errorHandler;
