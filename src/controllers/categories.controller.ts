import type { Request, Response } from "express";
import { getCategoriesService } from "../services/categories.services.js";

export const getCategories = async (req: Request, res: Response) => {
  const categories = await getCategoriesService();

  return res.status(200).json({ status: "ok", data: categories });
};
