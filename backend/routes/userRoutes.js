import express from 'express';
const router = express.Router();
import { authUser, getUsers } from '../controllers/userController.js';

router.route('/').get(getUsers);
router.post('/login', authUser);

export default router;
