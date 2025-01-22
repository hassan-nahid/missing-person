import express from "express";
import {
  createFoundPost,
  deleteFoundPostById,
  getAllFoundPosts,
  getFoundPostById,
  getFoundPostsByEmail,
  updateFoundPersonStatus,
} from "../controllers/foundController.js";
import { verifyJWT } from "../middleware/Auth.js";

const router = express.Router();

router.post("/", createFoundPost);
router.get("/", getAllFoundPosts);
router.get("/:id", getFoundPostById);
router.get("/found/email/:email", verifyJWT ,getFoundPostsByEmail);
router.delete("/found/delete/:id", verifyJWT ,deleteFoundPostById);
router.put("/found/status/:id",verifyJWT, updateFoundPersonStatus);




export default router;
