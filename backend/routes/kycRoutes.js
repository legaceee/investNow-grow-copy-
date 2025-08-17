import express from "express";
import { protect, adminOnly } from "../middlewares/auth.js";
import {
  uploadKyc,
  reviewKyc,
  getMyKyc,
} from "../controllers/kycController.js";
// import upload from "../middlewares/upload.js" // e.g., multer

const router = express.Router();

// router.post("/upload", protect, upload.single("kycDocument"), uploadKyc);
router.post("/upload", protect, uploadKyc); // using URL-based for now
router.get("/me", protect, getMyKyc);
router.patch("/:userId/review", protect, adminOnly, reviewKyc);

export default router;
