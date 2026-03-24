import express from "express";
import { deleteUser, getUser } from "../controllers/users.controller.js";

export const usersRouter = express.Router();

// prefix /api/users

usersRouter.get("/", getUser);
usersRouter.delete("/", deleteUser);
