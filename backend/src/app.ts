import express from "express";
import helmet from "helmet";
import cors from "cors";
import { json } from "body-parser";
import { errorHandler } from "./middlewares/errorHandler";
import { connectPostgres } from "./db/postgres";
import config from "./config/config";
import userRoutes from "./routes/userRoutes";
const app = express();
app.use(helmet());
app.use(cors());
app.use(json());

//DB Connection
connectPostgres();

// Routes
app.use("/api/user", userRoutes);

// Error handling
app.use(errorHandler);

// Start server
app.listen(config.port, () => {
  console.log(`Server running on http://localhost:${config.port}`);
});