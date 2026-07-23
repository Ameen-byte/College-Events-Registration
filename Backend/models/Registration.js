import mongoose from "mongoose";

const registrationSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    event: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },
    fullName: { type: String, required: true, trim: true, minlength: 2, maxlength: 80 },
    email: { type: String, required: true, trim: true, lowercase: true, match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
    mobile: { type: String, required: true, match: /^\d{10}$/ },
    college: { type: String, required: true, trim: true, minlength: 2, maxlength: 120 },
    branch: { type: String, required: true, trim: true, maxlength: 80 },
    graduationYear: { type: Number, required: true, min: 2020, max: 2100 },
    skills: { type: String, trim: true, maxlength: 300 },
    gender: { type: String, enum: ["female", "male", "other", "prefer-not-to-say"] },
    paymentMethod: { type: String, required: true, enum: ["upi", "card", "netbanking", "cash"] },
    paymentAmount: { type: Number, required: true, min: 0 },
    paymentStatus: { type: String, enum: ["paid", "pending", "refunded"], default: "paid" },
    status: { type: String, enum: ["confirmed", "waitlisted", "cancelled"], default: "confirmed" },
  },
  { timestamps: true }
);

registrationSchema.index({ event: 1, email: 1 }, { unique: true });

export default mongoose.model("Registration", registrationSchema);
