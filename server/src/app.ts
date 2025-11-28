// src/app.ts
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import todoRoutes from "./routes/todo.routes";
import authRoutes from "./routes/auth.routes";
import { errorHandler } from "./middleware/error.middleware";

const app = express();

// Middleware
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/todos", todoRoutes);

// Global Error Handler
app.use(errorHandler);

app.get("/", (_, res) => {
  res.send("API working (TypeScript + pnpm)");
});

export default app;
