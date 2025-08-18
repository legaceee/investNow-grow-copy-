import express from "express";

import { requireAuth } from "../controllers/authControlller.js";

import {
  buyTransaction,
  depositTransaction,
  getTransactions,
  sellTransaction,
  withdrawTransaction,
} from "../controllers/transactionController.js";

const router = express.Router();

router.get("/", requireAuth, getTransactions);
router.get("/withdraw", requireAuth, withdrawTransaction);
router.get("/deposit", requireAuth, depositTransaction);
router.get("/buy", requireAuth, buyTransaction);
router.get("/sell", requireAuth, sellTransaction);

export default router;
