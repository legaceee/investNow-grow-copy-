import express from "express";
import {
  getAllStocks,
  getStockBySymbol,
  searchStocks,
} from "../controllers/stockController.js";
import { requireAuth } from "../controllers/authControlller.js";
import { buyStock, sellStock } from "../controllers/portfolioController.js";
const router = express.Router();

router.get("/", getAllStocks);
router.get("/:search", searchStocks);
router.get("/:symbol", requireAuth, getStockBySymbol);
router.post("/buy/:symbol", requireAuth, buyStock);
router.post("/buy/:symbol", requireAuth, sellStock);
export default router;
