import express from 'express';
import { getGoals, getGoal, createGoal, updateGoal, deleteGoal, getGoalStats } from '../controllers/goal.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Protect all routes
router.use(protect);

// Goal statistics route
router.get('/stats', getGoalStats);

// Main goal routes
router
  .route('/')
  .get(getGoals)
  .post(createGoal);

router
  .route('/:id')
  .get(getGoal)
  .put(updateGoal)
  .delete(deleteGoal);

export default router;