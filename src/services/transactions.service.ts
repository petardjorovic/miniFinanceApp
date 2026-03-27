import { prisma } from "../lib/prisma.js";
import type { UpdateTransactionBody } from "../schemas/transactions.schema.js";
import type {
  CreateTransactionDTO,
  GetTransactionsParams,
} from "../types/index.js";

export const getTransactionsService = async (data: GetTransactionsParams) => {
  const { userId, page = 1, limit = 10, filter, sort, search } = data;

  const safePage = Math.max(page, 1);
  const skip = (safePage - 1) * limit;

  const where: Record<string, any> = {
    userId,
  };

  if (filter && filter !== "all") {
    where.category = { name: filter };
  }
  if (search?.trim()) {
    const q = search.trim();
    where.description = { contains: q, mode: "insensitive" };
  }

  const sortMap: Record<string, Record<string, "asc" | "desc">> = {
    Latest: { date: "desc" },
    Oldest: { date: "asc" },
    "A-Z": { description: "asc" },
    "Z-A": { description: "desc" },
    Highest: { amount: "desc" },
    Lowest: { amount: "asc" },
  };

  const orderBy = sortMap[sort as string] || { date: "desc" };

  const [transactions, total] = await Promise.all([
    prisma.transaction.findMany({
      where,
      skip,
      take: limit,
      orderBy,
      include: { category: true },
    }),
    prisma.transaction.count({ where }),
  ]);

  return { transactions, total, page: safePage, limit };
};

export const getTransactionService = async (transactionId: number) => {
  try {
    const transaction = await prisma.transaction.findUniqueOrThrow({
      where: { id: transactionId },
      include: { category: true },
    });

    return transaction;
  } catch (error: any) {
    if (error.code === "P2025") {
      throw new Error("Transaction not found");
    }
    throw error;
  }
};

export const createTransactionService = async (data: CreateTransactionDTO) => {
  const { userId, amount, date, description, categoryId } = data;

  try {
    const newTransaction = await prisma.transaction.create({
      data: {
        userId,
        amount,
        date,
        description,
        categoryId,
      },
      include: { category: true },
    });

    return newTransaction;
  } catch (error: any) {
    if (error.code === "P2003") {
      throw new Error("Category not found");
    }
    throw error;
  }
};

export const updateTransactionService = async (
  userId: number,
  transactionId: number,
  data: UpdateTransactionBody,
) => {
  const { amount, description, date, categoryId } = data;

  const dataForUpdate: Record<string, number | string> = {};
  if (amount !== undefined) dataForUpdate.amount = amount;
  if (description !== undefined) dataForUpdate.description = description;
  if (date !== undefined) dataForUpdate.date = date;
  if (categoryId !== undefined) dataForUpdate.categoryId = categoryId;

  if (Object.keys(dataForUpdate).length === 0) {
    throw new Error("No valid fields provided for update");
  }
  try {
    const existingTransaction = await prisma.transaction.findFirst({
      where: { id: transactionId, userId },
    });

    if (!existingTransaction) {
      throw new Error("Transaction not found");
    }

    const updatedTransaction = await prisma.transaction.update({
      where: {
        id: existingTransaction.id,
      },
      data: dataForUpdate,
      include: {
        category: true,
      },
    });
    return updatedTransaction;
  } catch (error: any) {
    if (error.code === "P2003") {
      throw new Error("Category not found");
    }
    throw error;
  }
};

export const deleteTransactionService = async (
  userId: number,
  transactionId: number,
) => {
  try {
    const deletedTransaction = await prisma.transaction.delete({
      where: { id: transactionId, userId },
      include: { category: true },
    });

    return deletedTransaction;
  } catch (error: any) {
    if (error.code === "P2025") {
      throw new Error("Transaction not found");
    }
    throw error;
  }
};
