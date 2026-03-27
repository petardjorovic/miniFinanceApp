import type { Request, Response } from "express";
import {
  createTransactionService,
  deleteTransactionService,
  getTotalsService,
  getTransactionService,
  getTransactionsService,
  updateTransactionService,
} from "../services/transactions.service.js";
import {
  createTransactionBodySchema,
  getTotalsQuerySchema,
  getTransactionsQuerySchema,
  updateTransactionBodySchema,
} from "../schemas/transactions.schema.js";

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

export const getTransaction = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const transaction = await getTransactionService(Number(id));
    return res.json({ success: "ok", transaction });
  } catch (error) {
    throw error;
  }
};

export const createTransaction = async (req: Request, res: Response) => {
  const userId = 1;
  const { amount, date, description, categoryId, type } =
    createTransactionBodySchema.parse(req.body);

  try {
    const newTransaction = await createTransactionService({
      userId,
      amount,
      type,
      description,
      date: new Date(date),
      categoryId,
    });

    return res.status(201).json({ success: "ok", transaction: newTransaction });
  } catch (error) {
    throw error;
  }
};

export const updateTransaction = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = 1;
    const data = updateTransactionBodySchema.parse(req.body);

    const updatedTransaction = await updateTransactionService(
      userId,
      Number(id),
      data,
    );

    return res.status(200).json({
      success: "ok",
      message: "Transaction has been updated successfully",
      updatedTransaction,
    });
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

export const getTotals = async (req: Request, res: Response) => {
  const userId = 1;
  const { start, end } = getTotalsQuerySchema.parse(req.query);
  let startDate: Date | undefined;
  let endDate: Date | undefined;
  if (start) startDate = new Date(start);
  if (end) endDate = new Date(end);

  const { totalIncome, totalExpense } = await getTotalsService(
    userId,
    startDate,
    endDate,
  );

  return res.status(200).json({ success: "ok", totalIncome, totalExpense });
};
