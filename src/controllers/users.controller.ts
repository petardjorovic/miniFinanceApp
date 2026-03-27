import type { Request, Response } from "express";
import {
  deleteUserService,
  getUserService,
} from "../services/users.service.js";

export const getUser = async (req: Request, res: Response) => {
  const userId = 11;

  try {
    const user = await getUserService(Number(userId));

    return res.status(200).json({
      success: "ok",
      user: { id: user?.id, name: user?.name, email: user?.email },
    });
  } catch (error) {
    throw error;
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const userId = 2;

  try {
    const deletedUser = await deleteUserService(userId);

    return res.status(200).json({
      success: "ok",
      message: `User with id ${deletedUser.id} has been deleted`,
    });
  } catch (error: any) {
    throw error;
  }
};
