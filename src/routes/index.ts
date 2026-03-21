import express from "express";
import { authRouter } from "./auth.routes.js";
import { usersRouter } from "./users.routes.js";
import { transactionsRouter } from "./transactions.routes.js";
import { categoriesRouter } from "./categories.routes.js";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/users", usersRouter);
router.use("/transactions", transactionsRouter);
router.use("/categories", categoriesRouter);

export default router;
