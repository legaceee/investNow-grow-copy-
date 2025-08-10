// routes/userRoutes.js

import express from "express";
import { getAllUsers } from "../controllers/userController.js";
import { signup, login } from "../controllers/authControlller.js";

const router = express.Router();

router.post("/register", signup);
router.post("/login", login);
router.get("/", getAllUsers);

export default router;
