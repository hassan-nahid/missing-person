import express from "express";
import { createMissingPost, deleteMissingPost, getAllMissingPosts, getMissingPostById, updateMissingPost } from "../controllers/missingController.js";
import { verifyJWT } from "../middleware/Auth.js";


const router = express.Router();

router.post("/", verifyJWT ,createMissingPost);
router.get("/", getAllMissingPosts);
router.get("/:id", getMissingPostById);
// router.put("/:id", updateMissingPost);
// router.delete("/:id", deleteMissingPost);

export default router;
