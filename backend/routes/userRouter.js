// routes/userRoutes.js

import express from "express";
import { getAllUsers } from "../controllers/userController.js";
import { signup, login, requireAuth } from "../controllers/authControlller.js";
import { addCash, withdrawCash } from "../controllers/walletController.js";
import { getPortfolio } from "../controllers/portfolioController.js";

const router = express.Router();

router.post("/register", signup);
router.post("/login", login);
router.get("/", getAllUsers);
router.post("/deposit", requireAuth, addCash);
router.post("/withdraw", requireAuth, withdrawCash);
router.get("/portfolio", requireAuth, getPortfolio);

export default router;
