// userRoutes.js
import express from "express";
import { completeProfile, deleteUser, getUser, registerOrLoginWithGoogle, updateUser } from "../controllers/userController.js";

const router = express.Router();

// Get user by ID
router.get("/:id", getUser);

// Create a new user
router.post("/user", registerOrLoginWithGoogle);

// Route for completing profile (protected route)
router.put("/complete-profile", completeProfile);
// Update an existing user
router.put("/:id", updateUser);

// Delete a user
router.delete("/:id", deleteUser);

export default router;