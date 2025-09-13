import express from "express";
import { getCandle } from "../controllers/stockController.js";
const router = express.Router();

router.get("/:id/:time", getCandle);

export default router;
