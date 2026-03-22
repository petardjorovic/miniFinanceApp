import type { Request, Response } from "express";
import { registerUserService } from "../services/auth.service.js";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const newUser = await registerUserService({ name, email, password });

    return res
      .status(201)
      .json({ success: "ok", message: "User registered successfully" });
  } catch (error: any) {
    return res.status(400).json({ success: "error", message: error.message });
  }
};
