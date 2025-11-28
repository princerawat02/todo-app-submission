import { Request, Response, NextFunction } from "express";
import { logError } from "../utils/logger";

export const errorHandler = async (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("Global Error:", err);

  // Log into MongoDB
  await logError(err, {
    path: req.path,
    body: req.body,
    userId: (req as any).userId || null,
  });

  return res.status(500).json({
    success: false,
    message: err?.message || "Internal Server Error",
  });
};
