import express from 'express';
import {login,register,logout} from '../controllers/clientsController.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.delete('/logout', logout);

export default router;