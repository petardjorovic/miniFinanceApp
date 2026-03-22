import { prisma } from "../lib/prisma.js";

export const getCategoriesService = async () => {
  return prisma.category.findMany();
};

export const getCategoryService = async (categoryId: number) => {
  try {
    const category = await prisma.category.findUniqueOrThrow({
      where: { id: categoryId },
    });

    return category;
  } catch (error: any) {
    if (error.code === "P2025") {
      throw new Error("Category not found");
    }
    throw error;
  }
};

export const createCategoryService = async (name: string) => {
  try {
    const createdCategory = await prisma.category.create({
      data: { name },
    });

    return createdCategory;
  } catch (error: any) {
    if (error.code === "P2002") {
      throw new Error("Category with this name already exists");
    }
    throw error;
  }
};

export const updateCategoryService = async (id: number, newName: string) => {
  try {
    const updatedCategory = await prisma.category.update({
      where: { id },
      data: { name: newName },
    });
    return updatedCategory;
  } catch (error: any) {
    if (error.code === "P2025") {
      throw new Error("Category not found");
    } else if (error.code === "P2002") {
      throw new Error("Category with this name already exists");
    }
    throw error;
  }
};

export const deleteCategoryService = async (id: number) => {
  try {
    const deletedCategory = await prisma.category.delete({
      where: { id },
    });
    return deletedCategory;
  } catch (error: any) {
    if (error.code === "P2025") {
      throw new Error("Category not found");
    }
    throw error;
  }
};
