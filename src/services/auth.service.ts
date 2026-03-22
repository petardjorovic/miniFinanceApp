import { prisma } from "../lib/prisma.js";
import type { UserDTO } from "../types/index.js";
import bcrypt from "bcrypt";

export const registerUserService = async (userData: UserDTO) => {
  const { name, email, password } = userData;

  const saltRounds = 10;
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    return await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: "USER",
      },
    });
  } catch (error: any) {
    if (error.code === "P2002") {
      throw new Error("User already exists");
    }
    throw error;
  }
};
