import type { Request, Response } from "express";
import {
  createTransactionService,
  getTransactionsService,
} from "../services/transactions.service.js";

export const getTransactions = async (req: Request, res: Response) => {
  const userId = 1;

  try {
    const { transactions, page, limit, total } = await getTransactionsService({
      userId,
      page: Number(req.query.page ?? 1),
      limit: Number(req.query.limit ?? 10),
      search: req.query.search,
      filter: req.query.filter,
      sort: req.query.sort,
    });

    return res.json({ success: "ok", transactions, total, page, limit });
  } catch (error) {
    throw error;
  }
};

export const createTransaction = async (req: Request, res: Response) => {
  const { userId, amount, date, description, categoryId } = req.body;

  try {
    const newTransaction = await createTransactionService({
      userId: Number(userId),
      amount,
      description,
      date: new Date(date),
      categoryId: Number(categoryId),
    });

    return res.status(201).json({ success: "ok", transaction: newTransaction });
  } catch (error) {
    throw error;
  }
};
