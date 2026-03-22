import type { Request, Response } from "express";
import {
  createCategoryService,
  deleteCategoryService,
  getCategoriesService,
  getCategoryService,
  updateCategoryService,
} from "../services/categories.services.js";

export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await getCategoriesService();

    return res.status(200).json({ success: "ok", categories });
  } catch (error) {
    throw error;
  }
};

export const getCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const category = await getCategoryService(Number(id));

    return res.status(200).json({ success: "ok", category });
  } catch (error) {
    throw error;
  }
};

export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    const createdCategory = await createCategoryService(name);

    return res.status(201).json({ success: "ok", createdCategory });
  } catch (error) {
    throw error;
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const updatedCategory = await updateCategoryService(Number(id), name);

    return res.status(200).json({ success: "ok", updatedCategory });
  } catch (error) {
    throw error;
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deletedCategory = await deleteCategoryService(Number(id));

    return res.status(200).json({ success: "ok", deletedCategory });
  } catch (error) {
    throw error;
  }
};
