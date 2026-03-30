import express, { type Request, type Response } from "express";
import router from "./routes/index.js";
import { errorHandler } from "./middleware/errorHandler.js";
import promClient from "prom-client";

export const app = express();

app.use(express.json());

const register = new promClient.Registry();
promClient.collectDefaultMetrics({ register });

// total requests
const httpRequestCounter = new promClient.Counter({
  name: "http_requests_total",
  help: "Total number of HTTP requests",
  labelNames: ["method", "route", "status"],
});

// response time
const httpRequestDuration = new promClient.Histogram({
  name: "http_request_duration_seconds",
  help: "Duration of HTTP requests in seconds",
  labelNames: ["method", "route", "status"],
});

// active requests
const activeRequests = new promClient.Gauge({
  name: "http_active_requests",
  help: "Number of active HTTP requests",
});

register.registerMetric(httpRequestCounter);
register.registerMetric(httpRequestDuration);
register.registerMetric(activeRequests);

// Middleware to track API requests
app.use((req: Request, res: Response, next) => {
  activeRequests.inc();

  const start = Date.now();

  res.on("finish", () => {
    const duration = (Date.now() - start) / 1000;

    const labels = {
      method: req.method,
      route: req.route?.path || req.path,
      status: String(res.statusCode),
    };

    httpRequestCounter.inc(labels);
    httpRequestDuration.observe(labels, duration);

    activeRequests.dec();
  });
  next();
});

// Expose the /metrics endpoint for Prometheus
app.get("/metrics", async (req: Request, res: Response) => {
  res.set("Content-Type", register.contentType);
  res.end(await register.metrics());
});

app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({ status: "ok", message: "API is healthy" });
});

app.use("/api", router);

app.use(errorHandler);
