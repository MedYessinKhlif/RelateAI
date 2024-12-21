import express from 'express';
import { createChat, getChats, getChatById, deleteChat} from '../controllers/chatController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.post('/', authenticate, createChat);
router.get('/', authenticate, getChats);
router.get('/:id', authenticate, getChatById);
router.delete('/:id', authenticate, deleteChat);

export default router;