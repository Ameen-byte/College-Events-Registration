import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, minlength: 3, maxlength: 100 },
    description: { type: String, required: true, trim: true, minlength: 20, maxlength: 500 },
    category: { type: String, required: true, enum: ["technology", "cultural", "sports", "science", "business", "creative"] },
    imageKey: { type: String, required: true, trim: true },
    hostCollege: { type: String, required: true, trim: true, maxlength: 120 },
    city: { type: String, required: true, trim: true, maxlength: 80 },
    venue: { type: String, required: true, trim: true, maxlength: 120 },
    startsAt: { type: Date, required: true },
    registrationDeadline: { type: Date, required: true },
    capacity: { type: Number, required: true, min: 1, max: 10000 },
    registeredCount: { type: Number, default: 0, min: 0 },
    registrationFee: { type: Number, required: true, min: 0, max: 100000 },
    studentDiscountFee: { type: Number, required: true, min: 0, max: 100000 },
    status: { type: String, enum: ["upcoming", "open", "closed", "completed"], default: "open" },
  },
  { timestamps: true }
);

eventSchema.index({ title: "text", description: "text", hostCollege: "text", city: "text" });

export default mongoose.model("Event", eventSchema);
