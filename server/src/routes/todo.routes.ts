import { Router } from "express";
import {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo,
  toggleTodo,
} from "../controllers/todo.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.use(authMiddleware);

router.get("/error-test", () => {
  throw new Error("Manual test error");
});


router.get("/", getTodos);
router.post("/", createTodo);
router.put("/:id", updateTodo);
router.delete("/:id", deleteTodo);
router.patch("/:id/toggle", toggleTodo);

export default router;
