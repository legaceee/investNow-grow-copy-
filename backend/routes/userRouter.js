// routes/userRoutes.js

import express from "express";
import {
  getAllUsers,
  getUser,
  updateProfile,
} from "../controllers/userController.js";
import {
  signup,
  login,
  requireAuth,
  updatePassword,
  sendOtp,
  verifyOtp,
} from "../controllers/authControlller.js";

import { getPortfolio } from "../controllers/portfolioController.js";
import { requireAdmin } from "../controllers/adminController.js";
import { watchList } from "../controllers/watchlistController.js";

const router = express.Router();

router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);
router.post("/register", signup);
router.post("/login", login);

router.post("/watchlist", requireAuth, watchList);
router.patch("/updatePassword", requireAuth, updatePassword);
router.patch("/updateME", requireAuth, updateProfile);
router.get("/getMe", requireAuth, getUser);
router.get("/", requireAdmin, getAllUsers);

export default router;
