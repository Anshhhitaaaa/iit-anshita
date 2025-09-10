import Transaction from '../models/Transaction.js';
import mongoose from 'mongoose';

// @desc    Get all transactions for a user
// @route   GET /api/transactions
// @access  Private
export const getTransactions = async (req, res) => {
  try {
    const { page = 1, limit = 10, type, category, sortBy = 'date', sortOrder = 'desc' } = req.query;
    
    // Build filter object
    const filter = { user: req.user.id };
    if (type) filter.type = type;
    if (category) filter.category = category;
    
    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;
    
    const transactions = await Transaction.find(filter)
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate('user', 'name email');
    
    const total = await Transaction.countDocuments(filter);
    
    res.status(200).json({
      success: true,
      count: transactions.length,
      total,
      data: transactions,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get transactions error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get single transaction
// @route   GET /api/transactions/:id
// @access  Private
export const getTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id).populate('user', 'name email');
    
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    
    // Make sure user owns transaction
    if (transaction.user._id.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized to access this transaction' });
    }
    
    res.status(200).json({
      success: true,
      data: transaction
    });
  } catch (error) {
    console.error('Get transaction error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create new transaction
// @route   POST /api/transactions
// @access  Private
export const createTransaction = async (req, res) => {
  try {
    // Add user to req.body
    req.body.user = req.user.id;
    
    const transaction = await Transaction.create(req.body);
    
    res.status(201).json({
      success: true,
      data: transaction
    });
  } catch (error) {
    console.error('Create transaction error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update transaction
// @route   PUT /api/transactions/:id
// @access  Private
export const updateTransaction = async (req, res) => {
  try {
    let transaction = await Transaction.findById(req.params.id);
    
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    
    // Make sure user owns transaction
    if (transaction.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized to update this transaction' });
    }
    
    transaction = await Transaction.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    
    res.status(200).json({
      success: true,
      data: transaction
    });
  } catch (error) {
    console.error('Update transaction error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete transaction
// @route   DELETE /api/transactions/:id
// @access  Private
export const deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    
    // Make sure user owns transaction
    if (transaction.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized to delete this transaction' });
    }
    
    await Transaction.findByIdAndDelete(req.params.id);
    
    res.status(200).json({
      success: true,
      message: 'Transaction deleted successfully'
    });
  } catch (error) {
    console.error('Delete transaction error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get transaction statistics
// @route   GET /api/transactions/stats
// @access  Private
export const getTransactionStats = async (req, res) => {
  try {
    const { period = 'month' } = req.query;
    
    let startDate;
    const endDate = new Date();
    
    switch (period) {
      case 'week':
        startDate = new Date(endDate.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case 'month':
        startDate = new Date(endDate.getFullYear(), endDate.getMonth(), 1);
        break;
      case 'year':
        startDate = new Date(endDate.getFullYear(), 0, 1);
        break;
      default:
        startDate = new Date(endDate.getFullYear(), endDate.getMonth(), 1);
    }
    
    const stats = await Transaction.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(req.user.id),
          date: { $gte: startDate, $lte: endDate }
        }
      },
      {
        $group: {
          _id: '$type',
          total: { $sum: '$amount' },
          count: { $sum: 1 }
        }
      }
    ]);
    
    const income = stats.find(stat => stat._id === 'income') || { total: 0, count: 0 };
    const expense = stats.find(stat => stat._id === 'expense') || { total: 0, count: 0 };
    
    res.status(200).json({
      success: true,
      data: {
        income: income.total,
        expense: expense.total,
        balance: income.total - expense.total,
        incomeCount: income.count,
        expenseCount: expense.count,
        period,
        startDate,
        endDate
      }
    });
  } catch (error) {
    console.error('Get transaction stats error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
