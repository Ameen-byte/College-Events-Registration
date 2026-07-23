import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../models/User.js";

const createToken = (userId) => jwt.sign({ userId }, process.env.JWT_SECRET || "development-secret", { expiresIn: "7d" });

const publicUser = (user) => ({
  id: user.id,
  fullName: user.fullName,
  username: user.username,
  email: user.email,
  mobile: user.mobile,
  gender: user.gender,
  dob: user.dob,
  college: user.college,
  branch: user.branch,
  graduationYear: user.graduationYear,
  skills: user.skills,
  profileImage: user.profileImage,
});

export const registerUser = async (req, res) => {
  const { password, confirmPassword, ...userData } = req.body;
  if (!password || password.length < 8) return res.status(400).json({ success: false, message: "Password must contain at least 8 characters" });
  if (password !== confirmPassword) return res.status(400).json({ success: false, message: "Passwords must match" });
  const username = userData.username || userData.fullName.trim().toLowerCase().replace(/\s+/g, "_");
  const hashedPassword = await bcrypt.hash(password, 12);
  const user = await User.create({ ...userData, username, password: hashedPassword });
  res.status(201).json({ success: true, message: "Account created", token: createToken(user.id), user: publicUser(user) });
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ $or: [{ email: email?.toLowerCase() }, { username: email?.toLowerCase() }] }).select("+password");
  if (!user || !(await bcrypt.compare(password || "", user.password))) return res.status(401).json({ success: false, message: "Invalid email or password" });
  res.json({ success: true, message: "Login successful", token: createToken(user.id), user: publicUser(user) });
};

export const getCurrentUser = async (req, res) => {
  res.json({ success: true, user: publicUser(req.user) });
};

export const updateProfile = async (req, res) => {
  const updates = { ...req.body };
  delete updates.password;
  delete updates.username;
  if (req.file) updates.profileImage = `/uploads/${req.file.filename}`;
  const user = await User.findByIdAndUpdate(req.user.id, updates, { new: true, runValidators: true });
  res.json({ success: true, message: "Profile updated", user: publicUser(user) });
};