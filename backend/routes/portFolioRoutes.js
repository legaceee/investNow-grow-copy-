// routes/portfolioRoutes.js
import express from "express";
import { requireAuth } from "../controllers/authControlller.js";
import {
  buyStock,
  getPortfolio,
  sellStock,
} from "../controllers/portfolioController.js";

const router = express.Router();

router.get("/portfolio", requireAuth, getPortfolio);
export default router;
