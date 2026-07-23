import express from "express";
import asyncHandler from "../middleware/asyncHandler.js";
import { createRegistration, deleteRegistration, getRegistrationById, getRegistrations, updateRegistration } from "../controllers/registrationController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(protect, asyncHandler(getRegistrations)).post(protect, asyncHandler(createRegistration));
router.route("/:id").get(protect, asyncHandler(getRegistrationById)).put(protect, asyncHandler(updateRegistration)).delete(protect, asyncHandler(deleteRegistration));

export default router;
