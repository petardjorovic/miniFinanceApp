export interface UserDTO {
  name: string;
  email: string;
  password: string;
}

export interface GetTransactionsParams {
  userId: number;
  page: number;
  limit: number;
  filter?: string;
  sort?: "Latest" | "Oldest" | "A-Z" | "Z-A" | "Highest" | "Lowest";
  search?: string;
}
export interface CreateTransactionDTO {
  userId: number;
  amount: number;
  description: string;
  date: Date;
  categoryId: number;
}
