import z from "zod";

export const getTransactionsQuerySchema = z.object({
  page: z
    .string()
    .default("1")
    .transform((val) => Number(val))
    .refine((val) => Number.isInteger(val) && val > 0, {
      message: "Invalid page number",
    }),
  limit: z
    .string()
    .default("10")
    .transform((val) => Number(val))
    .refine((val) => Number.isInteger(val) && val > 0, {
      message: "Invalid limit number",
    }),
  filter: z.string().min(3).optional(),
  sort: z
    .enum(["Latest", "Oldest", "A-Z", "Z-A", "Highest", "Lowest"])
    .optional(),
  search: z.string().min(1).optional(),
});
