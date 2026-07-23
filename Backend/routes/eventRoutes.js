import express from "express";
import asyncHandler from "../middleware/asyncHandler.js";
import { createEvent, deleteEvent, getEventById, getEvents, updateEvent } from "../controllers/eventController.js";

const router = express.Router();

router.route("/").get(asyncHandler(getEvents)).post(asyncHandler(createEvent));
router.route("/:id").get(asyncHandler(getEventById)).put(asyncHandler(updateEvent)).delete(asyncHandler(deleteEvent));

export default router;
