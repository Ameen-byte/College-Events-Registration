import multer from "multer";
import path from "node:path";
import fs from "node:fs";

const uploadDirectory = path.resolve("uploads");
fs.mkdirSync(uploadDirectory, { recursive: true });

const storage = multer.diskStorage({
  destination: uploadDirectory,
  filename: (req, file, callback) => callback(null, `${Date.now()}-${file.originalname.replace(/[^a-zA-Z0-9.-]/g, "-")}`),
});

const fileFilter = (req, file, callback) => {
  if (file.mimetype.startsWith("image/")) return callback(null, true);
  callback(new Error("Only image files are allowed"));
};

export default multer({ storage, fileFilter, limits: { fileSize: 5 * 1024 * 1024 } });