import { Router } from "express";
import { signup, login, logout, getMe, forgotPassword, resetPassword } from "../controllers/auth.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

// Signup route
router.post("/signup", signup);

// Login route
router.post("/login", login);

// Logout route
router.post("/logout", logout);

router.post("/forgot", forgotPassword);
router.post("/reset/:token", resetPassword);

router.get("/me", authMiddleware, getMe);

export default router;
