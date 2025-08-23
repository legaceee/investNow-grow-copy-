// routes/userRoutes.js

import express from "express";
import { getAllUsers, updateProfile } from "../controllers/userController.js";
import {
  signup,
  login,
  requireAuth,
  updatePassword,
} from "../controllers/authControlller.js";

import { getPortfolio } from "../controllers/portfolioController.js";
import { requireAdmin } from "../controllers/adminController.js";

const router = express.Router();

router.post("/register", signup);
router.post("/login", login);
router.patch("/updatePassword", requireAuth, updatePassword);
router.patch("/updateME", requireAuth, updateProfile);
router.get("/", requireAdmin, getAllUsers);

export default router;
