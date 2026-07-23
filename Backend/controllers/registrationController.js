import mongoose from "mongoose";
import Event from "../models/Event.js";
import Registration from "../models/Registration.js";

const ensureObjectId = (id, label) => {
  if (!mongoose.isValidObjectId(id)) {
    const error = new Error(`Invalid ${label} ID`);
    error.statusCode = 400;
    throw error;
  }
};

export const getRegistrations = async (req, res) => {
  const { event, search, page = 1, limit = 10, sort = "createdAt", order = "desc" } = req.query;
  const filter = { user: req.user.id, ...(event ? { event } : {}) };
  if (filter.event) ensureObjectId(filter.event, "event");
  if (search) filter.$or = [{ fullName: new RegExp(search, "i") }, { email: new RegExp(search, "i") }, { college: new RegExp(search, "i") }];
  const sortField = ["createdAt", "fullName", "paymentAmount", "status"].includes(sort) ? sort : "createdAt";
  const pageNumber = Math.max(Number(page) || 1, 1);
  const limitNumber = Math.min(Math.max(Number(limit) || 10, 1), 50);
  const [registrations, total] = await Promise.all([
    Registration.find(filter).populate("event", "title startsAt venue hostCollege").sort({ [sortField]: order === "asc" ? 1 : -1 }).skip((pageNumber - 1) * limitNumber).limit(limitNumber),
    Registration.countDocuments(filter),
  ]);
  res.json({ success: true, count: registrations.length, total, page: pageNumber, pages: Math.ceil(total / limitNumber), data: registrations });
};

export const getRegistrationById = async (req, res) => {
  ensureObjectId(req.params.id, "registration");
  const registration = await Registration.findOne({ _id: req.params.id, user: req.user.id }).populate("event", "title startsAt venue");
  if (!registration) return res.status(404).json({ success: false, message: "Registration not found" });
  res.json({ success: true, data: registration });
};

export const createRegistration = async (req, res) => {
  ensureObjectId(req.body.event, "event");
  const event = await Event.findById(req.body.event);
  if (!event) return res.status(404).json({ success: false, message: "Event not found" });
  if (["closed", "completed"].includes(event.status)) return res.status(409).json({ success: false, message: "Registration is closed for this event" });

  const status = event.registeredCount >= event.capacity ? "waitlisted" : "confirmed";
  const registration = await Registration.create({
    ...req.body,
    user: req.user.id,
    paymentAmount: event.studentDiscountFee,
    paymentStatus: req.body.paymentMethod === "cash" ? "pending" : "paid",
    status,
  });
  if (status === "confirmed") await Event.findByIdAndUpdate(event.id, { $inc: { registeredCount: 1 } });

  res.status(201).json({ success: true, message: status === "confirmed" ? "Registration confirmed" : "Added to waitlist", data: registration });
};

export const updateRegistration = async (req, res) => {
  ensureObjectId(req.params.id, "registration");
  const registration = await Registration.findOneAndUpdate({ _id: req.params.id, user: req.user.id }, req.body, { new: true, runValidators: true });
  if (!registration) return res.status(404).json({ success: false, message: "Registration not found" });
  res.json({ success: true, message: "Registration updated", data: registration });
};

export const deleteRegistration = async (req, res) => {
  ensureObjectId(req.params.id, "registration");
  const registration = await Registration.findOneAndDelete({ _id: req.params.id, user: req.user.id });
  if (!registration) return res.status(404).json({ success: false, message: "Registration not found" });
  if (registration.status === "confirmed") await Event.findByIdAndUpdate(registration.event, { $inc: { registeredCount: -1 } });
  res.json({ success: true, message: "Registration cancelled", data: { id: registration.id } });
};
