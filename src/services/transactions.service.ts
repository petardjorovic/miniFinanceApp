import { prisma } from "../lib/prisma.js";
import type {
  CreateTransactionDTO,
  GetTransactionsParams,
} from "../types/index.js";

export const getTransactionsService = async (params: GetTransactionsParams) => {
  const { userId, page = 1, limit = 10, filter, sort, search } = params;

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
