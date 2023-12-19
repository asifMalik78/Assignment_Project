const asyncHandler = (requestHandler) => {
  return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((err) => {
      return res.status(500).json({ status : false,  message: err.message });
    });
  };
};

module.exports = { asyncHandler };
