import express from 'express';
import { 
  getTransactions, 
  getTransaction, 
  createTransaction, 
  updateTransaction, 
  deleteTransaction,
  getTransactionStats 
} from '../controllers/transaction.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// All routes are protected
router.use(protect);

router.route('/')
  .get(getTransactions)
  .post(createTransaction);

router.route('/stats')
  .get(getTransactionStats);

router.route('/:id')
  .get(getTransaction)
  .put(updateTransaction)
  .delete(deleteTransaction);

export default router;
