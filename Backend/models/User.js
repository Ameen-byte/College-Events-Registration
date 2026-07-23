import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true, minlength: 2, maxlength: 80 },
    username: { type: String, required: true, trim: true, lowercase: true, unique: true, minlength: 3, maxlength: 40 },
    email: { type: String, required: true, trim: true, lowercase: true, unique: true, match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
    password: { type: String, required: true, select: false },
    mobile: { type: String, required: true, match: /^\d{10}$/ },
    gender: { type: String, enum: ["female", "male", "other", "prefer-not-to-say"] },
    dob: { type: Date },
    college: { type: String, required: true, trim: true, maxlength: 120 },
    branch: { type: String, required: true, trim: true, maxlength: 80 },
    graduationYear: { type: Number, required: true, min: 2020, max: 2100 },
    skills: { type: String, trim: true, maxlength: 300 },
    profileImage: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);