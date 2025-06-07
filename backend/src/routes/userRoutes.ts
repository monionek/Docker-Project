import express from "express";
import { requireAuth } from "../middlewares/auth";
import {
  registerUser,
  getUser,
  login,
  deleteUser,
  getAllUsers
} from "../controllers/userControllers";
import { isAdmin } from "../middlewares/isAdmin";

const router = express.Router();

router.post("/register", registerUser);
router.get("/:id", getUser);
router.post("/login", login);
router.delete("delete/:id", requireAuth, isAdmin,deleteUser);
router.get("/users",requireAuth, isAdmin,getAllUsers);

export default router;