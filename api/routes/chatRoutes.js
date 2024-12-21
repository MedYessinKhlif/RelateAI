import express from 'express';
import { createChat, getChats, getChatById } from '../controllers/chatController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.post('/', authenticate, createChat);
router.get('/', authenticate, getChats);
router.get('/:id', authenticate, getChatById);

export default router;