import type { Request, Response } from "express";
import {
  createTransactionService,
  deleteTransactionService,
  getTransactionsService,
} from "../services/transactions.service.js";
import { getTransactionsQuerySchema } from "../schemas/transactions.schema.js";

export const getTransactions = async (req: Request, res: Response) => {
  const { page, limit, filter, sort, search } =
    getTransactionsQuerySchema.parse(req.query);
  const userId = 1;

  try {
    const {
      transactions: tx,
      page: pg,
      limit: lm,
      total: ttl,
    } = await getTransactionsService({
      userId,
      page,
      limit,
      search,
      filter,
      sort,
    });

    return res.json({
      success: "ok",
      transactions: tx,
      total: ttl,
      page: pg,
      limit: lm,
    });
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

export const deleteTransaction = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = 1;

    const deletedTransaction = await deleteTransactionService(
      userId,
      Number(id),
    );

    return res.json({ success: "ok", deletedTransaction });
  } catch (error) {
    throw error;
  }
};
