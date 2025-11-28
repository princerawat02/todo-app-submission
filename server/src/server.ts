// src/server.ts
import "dotenv/config";
import mongoose from "mongoose";
import app from "./app";

const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI || "";

if (!MONGO_URI) {
  throw new Error("MONGO_URI not found in environment variables");
}

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    );
  })
  .catch((err) => console.error("DB error:", err));
