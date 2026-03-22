import express, { type Request, type Response } from "express";
import router from "./routes/index.js";
import { errorHandler } from "./middleware/errorHandler.js";

export const app = express();

app.use(express.json());

app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({ status: "ok", message: "API is healthy" });
});

app.use("/api", router);

app.use(errorHandler);
