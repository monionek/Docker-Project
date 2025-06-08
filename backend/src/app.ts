import express from "express";
import helmet from "helmet";
import cors from 'cors';
import { json } from "body-parser";
import { errorHandler } from "./middlewares/errorHandler";
import { connectPostgres } from "./db/postgres";
import config from "./config/config";
import userRoutes from "./routes/userRoutes";
import healthRoutes from "./routes/healthRoutes";
const app = express();
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
}));
app.use(helmet());
app.use(json());

//DB Connection
connectPostgres();

// Routes
app.use("/api/user", userRoutes);
app.use("/api/health", healthRoutes);
// Error handling
app.use(errorHandler);

// Start server
app.listen(config.port, () => {
  console.log(`Server running on http://localhost:${config.port}`);
});