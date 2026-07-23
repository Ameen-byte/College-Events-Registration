import jwt from "jsonwebtoken";
import User from "../models/User.js";

export async function protect(req, res, next) {
  try {
    const token = req.headers.authorization?.startsWith("Bearer ")
      ? req.headers.authorization.split(" ")[1]
      : null;
    if (!token) return res.status(401).json({ success: false, message: "Authentication required" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "development-secret");
    req.user = await User.findById(decoded.userId);
    if (!req.user) return res.status(401).json({ success: false, message: "User account not found" });
    next();
  } catch {
    res.status(401).json({ success: false, message: "Invalid or expired authentication token" });
  }
}