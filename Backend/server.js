import express from "express";
import dotenv from "dotenv";
// import studentsRoutes from "./routes/studentsRoutes.js";
// import companyRoutes from "./routes/companyRoutes.js";
import connectDB from "./config/db.js";

// Load environment variables
dotenv.config();

const app = express();

app.use(express.json());

// Connect Database
connectDB();

// // Student Routes
// app.use("/students", studentsRoutes);

// // Company Routes
// app.use("/companies", companyRoutes);



app.get("/", (req, res) => {
  res.send("Hello, Backend is Running!");
});

const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
