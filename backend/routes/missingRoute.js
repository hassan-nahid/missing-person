import express from "express";
import {
    createMissingPost,
    deleteMissingPostById,
    getAllMissingPosts,
    getMissingPostById,
    getMissingPostsByEmail,
    updateFoundStatus,
  } from "../controllers/missingController.js";
import { verifyJWT } from "../middleware/Auth.js";
  
  const router = express.Router();
  
  router.post("/", verifyJWT, createMissingPost);
  router.get("/", getAllMissingPosts);
  router.get("/:id", getMissingPostById);
  router.get("/missing/email/:email", verifyJWT ,getMissingPostsByEmail); 
  router.delete("/missing/delete/:id", verifyJWT,deleteMissingPostById);
  router.put("/missing/status/:id/", verifyJWT ,updateFoundStatus);

  
  export default router;
  