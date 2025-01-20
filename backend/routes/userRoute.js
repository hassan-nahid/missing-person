// userRoutes.js
import express from "express";
import { completeProfile, deleteUser, getUserByEmail, registerOrLoginWithGoogle, updateUser } from "../controllers/userController.js";
import { verifyJWT } from "../middleware/Auth.js";

const router = express.Router();

// Get user by email
router.get("/single/:email",verifyJWT ,getUserByEmail);


// Create a new user
router.post("/user", registerOrLoginWithGoogle);

// Route for completing profile (protected route)
router.put("/complete-profile",verifyJWT ,completeProfile);
// Update an existing user
// router.put("/:id", updateUser);

// // Delete a user
// router.delete("/:id", deleteUser);

export default router;