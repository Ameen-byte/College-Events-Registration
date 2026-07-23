export default function errorHandler(error, req, res, next) {
  if (res.headersSent) return next(error);

  if (error.name === "ValidationError") {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: Object.values(error.errors).map(({ path, message }) => ({ path, message })),
    });
  }

  if (error.name === "CastError" || (error.name === "MongoServerError" && error.code === 11000)) {
    const message = error.code === 11000 ? "A record with these unique values already exists" : "Invalid record ID";
    return res.status(400).json({ success: false, message });
  }

  if (error.name === "MulterError" || error.message === "Only image files are allowed") {
    return res.status(400).json({ success: false, message: error.message });
  }

  console.error(error);
  res.status(error.statusCode || 500).json({ success: false, message: error.message || "Internal server error" });
}
