import Goal from '../models/Goal.js';
import mongoose from 'mongoose';

// @desc    Get all goals for a user
// @route   GET /api/goals
// @access  Private
export const getGoals = async (req, res) => {
  try {
    const { page = 1, limit = 10, category, priority, sortBy = 'deadline', sortOrder = 'asc' } = req.query;
    
    // Build filter object
    const filter = { user: req.user.id };
    if (category) filter.category = category;
    if (priority) filter.priority = priority;
    
    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;
    
    const goals = await Goal.find(filter)
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit);
    
    const total = await Goal.countDocuments(filter);
    
    res.status(200).json({
      success: true,
      count: goals.length,
      total,
      data: goals,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get goals error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get single goal
// @route   GET /api/goals/:id
// @access  Private
export const getGoal = async (req, res) => {
  try {
    const goal = await Goal.findById(req.params.id);
    
    if (!goal) {
      return res.status(404).json({ message: 'Goal not found' });
    }
    
    // Make sure user owns goal
    if (goal.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized to access this goal' });
    }
    
    res.status(200).json({
      success: true,
      data: goal
    });
  } catch (error) {
    console.error('Get goal error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create new goal
// @route   POST /api/goals
// @access  Private
export const createGoal = async (req, res) => {
  try {
    // Add user to req.body
    req.body.user = req.user.id;
    
    const goal = await Goal.create(req.body);
    
    res.status(201).json({
      success: true,
      data: goal
    });
  } catch (error) {
    console.error('Create goal error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update goal
// @route   PUT /api/goals/:id
// @access  Private
export const updateGoal = async (req, res) => {
  try {
    let goal = await Goal.findById(req.params.id);
    
    if (!goal) {
      return res.status(404).json({ message: 'Goal not found' });
    }
    
    // Make sure user owns goal
    if (goal.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized to update this goal' });
    }
    
    goal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    
    res.status(200).json({
      success: true,
      data: goal
    });
  } catch (error) {
    console.error('Update goal error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete goal
// @route   DELETE /api/goals/:id
// @access  Private
export const deleteGoal = async (req, res) => {
  try {
    const goal = await Goal.findById(req.params.id);
    
    if (!goal) {
      return res.status(404).json({ message: 'Goal not found' });
    }
    
    // Make sure user owns goal
    if (goal.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized to delete this goal' });
    }
    
    await goal.deleteOne();
    
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    console.error('Delete goal error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get goal statistics
// @route   GET /api/goals/stats
// @access  Private
export const getGoalStats = async (req, res) => {
  try {
    const stats = await Goal.aggregate([
      { $match: { user: new mongoose.Types.ObjectId(req.user.id) } },
      { $group: {
          _id: null,
          totalGoals: { $sum: 1 },
          totalTargetAmount: { $sum: '$targetAmount' },
          totalCurrentAmount: { $sum: '$currentAmount' },
          avgCompletion: { $avg: { $divide: ['$currentAmount', '$targetAmount'] } }
        }
      }
    ]);
    
    res.status(200).json({
      success: true,
      data: stats.length > 0 ? stats[0] : {
        totalGoals: 0,
        totalTargetAmount: 0,
        totalCurrentAmount: 0,
        avgCompletion: 0
      }
    });
  } catch (error) {
    console.error('Get goal stats error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};