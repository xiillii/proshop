import express from 'express';
const router = express.Router();
import {
  authUser,
  getUserProfile,
  getUsers,
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

router.route('/').get(getUsers);
router.post('/login', authUser);
router.route('/profile').get(protect, getUserProfile);

export default router;
