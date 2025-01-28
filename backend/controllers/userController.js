
import User from "../models/userModel.js";
// Create a new user
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET;


// Get a user by email
export const getUserByEmail = async (req, res) => {
    try {
        // Find user by email and exclude identification data
        const user = await User.findOne({ email: req.params.email })
            .select("-identificationType -identificationNumber -documentPhoto"); // Exclude these fields

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user); // Return the user data
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


// Create a new user or login existing user
export const registerOrLoginWithGoogle = async (req, res) => {
    try {
        const { email, name } = req.body;

        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        let user = await User.findOne({ email });

        if (!user) {
            // Create a new user with email and name
            user = await User.create({ email, name });
        }

        // Generate JWT token
        const token = jwt.sign(
            { email: user.email }, // Payload
            SECRET_KEY, // Secret key
            { expiresIn: "7d" } // Token expiration time
        );

        res.status(200).json({
            message: "User logged in successfully",
            token,
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


// Complete Profile
export const completeProfile = async (req, res) => {
    try {
        const { email, phone, address, identificationType, identificationNumber, documentPhoto, userPhoto } = req.body;

        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        const user = await User.findOneAndUpdate(
            { email },
            {
                phone,
                address,
                identificationType,
                identificationNumber,
                documentPhoto,
                userPhoto,
                isProfileComplete: true,  // Update isProfileComplete to true
            },
            { new: true, runValidators: true }
        );

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "Profile updated successfully", user });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


// Get all users
export const getAllUsers = async (req, res) => {
    try {
        // Fetch all users and exclude sensitive fields
        const users = await User.find()
            .select("-identificationType -identificationNumber -documentPhoto");

        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// get user by id

export const getUserById = async (req, res) => {

    const { id } = req.params;

    try {
        const user = await User.findById(id)

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user); // Return the user data
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


// Delete user by ID
export const deleteUserById = async (req, res) => {
    try {
        const { id } = req.params;

        // Find user by ID and delete
        const user = await User.findByIdAndDelete(id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User deleted successfully", user });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// verify user 

// Verify user by ID
export const verifyUserById = async (req, res) => {
    const { id } = req.params; // Get user ID from request params

    try {
        // Find the user by ID and update the isVerified field
        const user = await User.findByIdAndUpdate(
            id,
            { isVerified: true },
            { new: true } // Return the updated user
        );

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User verified successfully", user });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
