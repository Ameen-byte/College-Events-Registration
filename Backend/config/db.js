// import mongoose from "mongoose";
// import dns from "node:dns";

// dns.setDefaultResultOrder("ipv4first");

import mongoose from "mongoose";
import dns from "node:dns";

dns.setDefaultResultOrder("ipv4first");
dns.setServers(["8.8.8.8", "1.1.1.1"]);

async function connectDB() {
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    throw new Error("MONGO_URI is not configured. Add it to Backend/.env.");
  }

  try {
    await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 10000 });
    console.log("MongoDB connected successfully");
  } catch (error) {
    // throw new Error(`MongoDB connection failed: ${error.message}`);
    console.error("Full MongoDB Error:");
    console.error(error);
    throw error;
  }
}

export default connectDB;
