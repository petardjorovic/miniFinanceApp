export interface UserDTO {
  name: string;
  email: string;
  password: string;
}

export interface GetTransactionsParams {
  userId: number;
  page: number;
  limit: number;
  filter: string | undefined;
  sort: "Latest" | "Oldest" | "A-Z" | "Z-A" | "Highest" | "Lowest" | undefined;
  search: string | undefined;
}
export interface CreateTransactionDTO {
  userId: number;
  amount: number;
  type: "INCOME" | "EXPENSE";
  description: string;
  date: Date;
  categoryId: number;
}
