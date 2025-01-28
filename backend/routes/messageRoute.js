import express from 'express';
import { createMessage, getAdminMessage, getMessagesByEmail } from '../controllers/messageController.js';
import { verifyJWT } from '../middleware/Auth.js';
import { verifyAdmin } from '../middleware/AdminVerify.js';

const router = express.Router();

// Route to create a new message
router.post('/', verifyJWT ,createMessage);

// Route to get messages by email
router.get('/:email',verifyJWT ,getMessagesByEmail);
router.get('/:email',verifyAdmin ,getAdminMessage);

export default router;
