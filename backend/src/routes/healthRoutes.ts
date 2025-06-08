import express from "express";
import { healthCheck } from "../controllers/healthController";

const router = express.Router();

router.get("/healthCheck", healthCheck);


export default router;