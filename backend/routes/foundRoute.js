import express from "express";
import {
  createFoundPost,
  getAllFoundPosts,
  getFoundPostById,
  getFoundPostsByEmail,
  updateFoundPost,
  deleteFoundPost,
} from "../controllers/foundController.js";

const router = express.Router();

router.post("/", createFoundPost);
router.get("/", getAllFoundPosts);
router.get("/:id", getFoundPostById);
// router.get("/found/email/:email", getFoundPostsByEmail);
// router.put("/found/:id", updateFoundPost);
// router.delete("/found/:id", deleteFoundPost);

export default router;
