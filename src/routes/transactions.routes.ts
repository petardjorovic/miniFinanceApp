import express from "express";
import {
  createTransaction,
  deleteTransaction,
  getTotals,
  getTransaction,
  getTransactions,
  updateTransaction,
} from "../controllers/transactions.controller.js";

export const transactionsRouter = express.Router();

// prefix /api/transactions

transactionsRouter.get("/", getTransactions);
transactionsRouter.get("/totals", getTotals);
transactionsRouter.get("/:id", getTransaction);
transactionsRouter.post("/", createTransaction);
transactionsRouter.patch("/:id", updateTransaction);
transactionsRouter.delete("/:id", deleteTransaction);
