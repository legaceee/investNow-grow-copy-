import express from "express";
import { requireAuth } from "../controllers/authControlller.js";
import { addCash, withdrawCash } from "../controllers/walletController.js";
const router = express.Router();

router.post("/deposit", requireAuth, addCash);
router.post("/withdraw", requireAuth, withdrawCash);

export default router;
