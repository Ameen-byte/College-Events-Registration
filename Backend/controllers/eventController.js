import mongoose from "mongoose";
import Event from "../models/Event.js";

const ensureObjectId = (id) => {
  if (!mongoose.isValidObjectId(id)) {
    const error = new Error("Invalid event ID");
    error.statusCode = 400;
    throw error;
  }
};

export const getEvents = async (req, res) => {
  const { q, search, category, status, page = 1, limit = 8, sort = "startsAt", order = "asc" } = req.query;
  const filter = {};

  if (category) filter.category = category;
  if (status) filter.status = status;
  if (q || search) filter.$text = { $search: q || search };

  const allowedSortFields = ["title", "startsAt", "category", "registrationFee", "createdAt"];
  const sortField = allowedSortFields.includes(sort) ? sort : "startsAt";
  const sortDirection = order === "desc" ? -1 : 1;
  const pageNumber = Math.max(Number(page) || 1, 1);
  const limitNumber = Math.min(Math.max(Number(limit) || 8, 1), 50);
  const [events, total] = await Promise.all([
    Event.find(filter).sort({ [sortField]: sortDirection }).skip((pageNumber - 1) * limitNumber).limit(limitNumber),
    Event.countDocuments(filter),
  ]);
  res.json({ success: true, count: events.length, total, page: pageNumber, pages: Math.ceil(total / limitNumber), data: events });
};

export const getEventById = async (req, res) => {
  ensureObjectId(req.params.id);
  const event = await Event.findById(req.params.id);

  if (!event) return res.status(404).json({ success: false, message: "Event not found" });
  res.json({ success: true, data: event });
};

export const createEvent = async (req, res) => {
  const event = await Event.create(req.body);
  res.status(201).json({ success: true, message: "Event created", data: event });
};

export const updateEvent = async (req, res) => {
  ensureObjectId(req.params.id);
  const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!event) return res.status(404).json({ success: false, message: "Event not found" });
  res.json({ success: true, message: "Event updated", data: event });
};

export const deleteEvent = async (req, res) => {
  ensureObjectId(req.params.id);
  const event = await Event.findByIdAndDelete(req.params.id);

  if (!event) return res.status(404).json({ success: false, message: "Event not found" });
  res.json({ success: true, message: "Event deleted", data: { id: event.id } });
};
