import mongoose from "mongoose";

const logSchema = new mongoose.Schema(
  {
    level: { type: String, default: "error" },
    message: String,
    stack: String,
    meta: Object,
  },
  { timestamps: true }
);

export const Log = mongoose.model("Log", logSchema);
