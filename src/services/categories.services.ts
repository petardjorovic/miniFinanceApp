import { prisma } from "../lib/prisma.js";

export const getCategoriesService = async () => {
  const categories = await prisma.category.findMany();

  return categories;
};
