import express from "express";
import { requireAuth } from "../middlewares/auth";
import {
  registerUser,
  getUser,
  login,
  deleteUser,
  getAllUsers,
  registerAdmin
} from "../controllers/userControllers";
import { isAdmin } from "../middlewares/isAdmin";

const router = express.Router();

router.post("/register", registerUser);
router.get("/:id", getUser);
router.post("/login", login);
router.delete("/delete/:id", requireAuth, isAdmin, deleteUser);
router.get("/list/users",requireAuth, isAdmin, getAllUsers);
router.post("/register-admin", registerAdmin);

export default router;