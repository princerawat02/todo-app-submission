import { Log } from "../models/log.model";

export const logError = async (error: any, details?: any) => {
  try {
    await Log.create({
      level: "error",
      message: error?.message || "Unknown error",
      stack: error?.stack || "",
      meta: details || {},
    });
  } catch (err) {
    console.error("Failed to record log:", err);
  }
};
