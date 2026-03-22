import express from "express";
import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategory,
  updateCategory,
} from "../controllers/categories.controller.js";

export const categoriesRouter = express.Router();

// prefix /api/categories
categoriesRouter.get("/", getCategories);
categoriesRouter.get("/:id", getCategory);
categoriesRouter.post("/", createCategory);
categoriesRouter.post("/:id", updateCategory);
categoriesRouter.delete("/:id", deleteCategory);
