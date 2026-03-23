import express from "express";
import {
  createTransaction,
  deleteTransaction,
  getTransactions,
} from "../controllers/transactions.controller.js";

export const transactionsRouter = express.Router();

// prefix /api/transactions

transactionsRouter.get("/", getTransactions);
transactionsRouter.post("/", createTransaction);
transactionsRouter.delete("/:id", deleteTransaction);
