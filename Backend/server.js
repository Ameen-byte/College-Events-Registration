import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import eventRoutes from "./routes/eventRoutes.js";
import registrationRoutes from "./routes/registrationRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import errorHandler from "./middleware/errorHandler.js";

// Load environment variables
dotenv.config();

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173" }));
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use((req, res, next) => {
  const startedAt = Date.now();
  res.on("finish", () => {
    console.log(`${req.method} ${req.originalUrl} ${res.statusCode} ${Date.now() - startedAt}ms`);
  });
  next();
});

app.get("/", (req, res) => {
  res.json({ success: true, message: "College Events Registration API is running", docs: "/api/health" });
});

app.get("/api/health", (req, res) => {
  res.json({ success: true, service: "college-events-registration-api" });
});

app.use("/api/events", eventRoutes);
app.use("/api/registrations", registrationRoutes);
app.use("/api/auth", authRoutes);
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});
app.use(errorHandler);

const PORT = Number(process.env.PORT) || 8000;

if (process.env.NODE_ENV !== "test") {
  connectDB()
    .then(() => app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`)))
    .catch((error) => {
      console.error(error.message);
      process.exitCode = 1;
    });
}

export default app;
