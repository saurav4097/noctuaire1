import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  // Only throw error on server, not client
  if (typeof window === "undefined") {
    throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
  }
}

let isConnected = false;

export async function connectDB() {
  if (isConnected) return;

  if (!MONGODB_URI) return; // gracefully exit if client side

  try {
    await mongoose.connect(MONGODB_URI);
    isConnected = true;
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
  }
}