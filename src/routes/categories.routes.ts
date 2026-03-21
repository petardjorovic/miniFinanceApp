import express from "express";
import { getCategories } from "../controllers/categories.controller.js";

export const categoriesRouter = express.Router();

// prefix /api/categories
categoriesRouter.get("/", getCategories);
