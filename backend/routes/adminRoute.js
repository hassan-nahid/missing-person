import express from "express";
import { loginAdmin, registerAdmin } from "../controllers/adminController.js";
import { verifyAdmin } from "../middleware/AdminVerify.js";

const router = express.Router();

// Admin registration route
router.post("/register", verifyAdmin , registerAdmin);

// Admin login route
router.post("/login", loginAdmin);

export default router;
