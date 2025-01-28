// userRoutes.js
import express from "express";
import { completeProfile, deleteUserById, getAllUsers, getUserByEmail, getUserById, registerOrLoginWithGoogle, verifyUserById } from "../controllers/userController.js";
import { verifyJWT } from "../middleware/Auth.js";
import { verifyAdmin } from "../middleware/AdminVerify.js";

const router = express.Router();

// Get user by email
router.get("/single/:email",verifyJWT ,getUserByEmail);


// Create a new user
router.post("/user", registerOrLoginWithGoogle);

// Route for completing profile (protected route)
router.put("/complete-profile",verifyJWT ,completeProfile);

;

// get all user
router.get('/users', verifyAdmin ,getAllUsers);

// get user by id
router.get('/singleDetails/:id',verifyAdmin,getUserById);

// Delete user by ID
router.delete('/deleteUser/:id', verifyAdmin, deleteUserById);

// verify user
router.patch("/verify/:id", verifyUserById);



export default router;