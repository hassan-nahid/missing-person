import express from 'express';
import { createMessage, getMessagesByEmail } from '../controllers/messageController.js';
import { verifyJWT } from '../middleware/Auth.js';

const router = express.Router();

// Route to create a new message
router.post('/', verifyJWT ,createMessage);

// Route to get messages by email
router.get('/:email',verifyJWT ,getMessagesByEmail);

export default router;
