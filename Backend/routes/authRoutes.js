import express from "express"
import asyncHandler from "../middleware/asyncHandler.js";
import { getCurrentUser, loginUser, registerUser, updateProfile } from "../controllers/authController.js/authController.js";
import { protect } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.post("/register", asyncHandler(registerUser));
router.post("/login", asyncHandler(loginUser));
router.get("/me", protect, asyncHandler(getCurrentUser));
router.put("/profile", protect, upload.single("profileImage"), asyncHandler(updateProfile));

export default router;