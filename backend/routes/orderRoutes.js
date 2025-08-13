import express from "express";
import {
  getAllStocks,
  getStockBySymbol,
} from "../controllers/stockController.js";
import { protect } from "../controllers/authControlller.js";
const router = express.Router();

router.get("/", getAllStocks);
router.get("/:symbol", protect, getStockBySymbol);

export default router;
