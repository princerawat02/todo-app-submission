import { Request, Response } from "express";
import { Todo } from "../models/todo.model";

export const createTodo = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;

    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    
    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Title is required",
      });
    }

    const todo = await Todo.create({
      userId,
      title,
      description,
    });

    return res.json({
      success: true,
      message: "Todo created",
      todo,
    });
  } catch (error) {
    console.error("Create Todo Error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to create todo" });
  }
};

export const getTodos = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;

    const todos = await Todo.find({ userId }).sort({ createdAt: -1 });

    return res.json({
      success: true,
      todos,
    });
  } catch (error) {
    console.error("Get Todos Error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to load todos" });
  }
};

export const updateTodo = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const { id } = req.params;
    const { title, description } = req.body;

    const todo = await Todo.findOneAndUpdate(
      { _id: id, userId },
      { title, description },
      { new: true }
    );

    if (!todo) {
      return res
        .status(404)
        .json({ success: false, message: "Todo not found" });
    }

    return res.json({
      success: true,
      message: "Todo updated",
      todo,
    });
  } catch (error) {
    console.error("Update Todo Error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to update todo" });
  }
};

export const deleteTodo = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const { id } = req.params;

    const todo = await Todo.findOneAndDelete({ _id: id, userId });

    if (!todo) {
      return res
        .status(404)
        .json({ success: false, message: "Todo not found" });
    }

    return res.json({
      success: true,
      message: "Todo deleted",
    });
  } catch (error) {
    console.error("Delete Todo Error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to delete todo" });
  }
};

export const toggleTodo = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const { id } = req.params;

    const todo = await Todo.findOne({ _id: id, userId });

    if (!todo) {
      return res
        .status(404)
        .json({ success: false, message: "Todo not found" });
    }

    todo.completed = !todo.completed;
    await todo.save();

    return res.json({
      success: true,
      message: "Todo toggled",
      todo,
    });
  } catch (error) {
    console.error("Toggle Todo Error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to toggle todo" });
  }
};
