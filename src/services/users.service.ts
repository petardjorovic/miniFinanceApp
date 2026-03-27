import { prisma } from "../lib/prisma.js";

export const getUserService = async (userId: number) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, name: true, email: true },
    });

    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error: any) {
    if (error.code === "P2025") {
      throw new Error("User not found");
    }
    throw error;
  }
};

export const deleteUserService = async (userId: number) => {
  try {
    const deletedUser = await prisma.user.delete({
      where: { id: userId },
      include: { transactions: true },
    });

    return deletedUser;
  } catch (error: any) {
    if (error.code === "P2025") {
      throw new Error("User not found");
    }
    throw error;
  }
};
