// routes/userRoutes.js

import express from "express";
import { getAllUsers } from "../controllers/userController.js";
import { signup, login, requireAuth } from "../controllers/authControlller.js";

import { getPortfolio } from "../controllers/portfolioController.js";
import { requireAdmin } from "../controllers/adminController.js";

const router = express.Router();

router.post("/register", signup);
router.post("/login", login);
router.get("/", requireAdmin, getAllUsers);

export default router;
