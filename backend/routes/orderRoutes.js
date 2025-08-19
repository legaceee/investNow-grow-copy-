import express from "express";
import {
  getAllStocks,
  getStockBySymbol,
  searchStocks,
  stockPriceHistory,
} from "../controllers/stockController.js";
import { requireAuth } from "../controllers/authControlller.js";
import { buyStock, sellStock } from "../controllers/stockController.js";
const router = express.Router();

router.get("/", getAllStocks);
router.get("/prices", stockPriceHistory);
router.get("/:search", searchStocks);
router.get("/:symbol", requireAuth, getStockBySymbol);
router.post("/buy/:symbol", requireAuth, buyStock);
router.post("/buy/:symbol", requireAuth, sellStock);
export default router;
