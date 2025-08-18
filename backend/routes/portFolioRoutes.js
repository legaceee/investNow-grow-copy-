// routes/portfolioRoutes.js
import express from "express";
import { requireAuth } from "../controllers/authControlller.js";
import { buyStock, sellStock } from "../controllers/portfolioController.js";

const router = express.Router();
router.post("/buy", buyStock);
router.post("/sell/:symbol", requireAuth, sellStock);
export default router;
