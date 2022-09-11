import express from 'express';

import authMiddleware from '../middlewares/auth.middleware.js';
import verifyMiddleware from '../middlewares/transaction.joi.middleware.js';
import {transactions, add} from '../controllers/transactionsController.js';

const router = express.Router();

router.use(authMiddleware);

router.get('/', transactions);

router.use(verifyMiddleware);

router.post('/operation', add);

export default router;