// routes/portfolioRoutes.js
import express from "express";
import { requireAuth } from "../controllers/authControlller.js";
import {
  getPortfolio,
  getPortfolioByName,
} from "../controllers/portfolioController.js";

const router = express.Router();

router.get("/", requireAuth, getPortfolio);
router.get("/:name", requireAuth, getPortfolioByName);
export default router;
