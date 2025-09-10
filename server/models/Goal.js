import mongoose from 'mongoose';

const GoalSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: [true, 'Please add a goal title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  targetAmount: {
    type: Number,
    required: [true, 'Please add a target amount'],
    min: [1, 'Target amount must be greater than 0']
  },
  currentAmount: {
    type: Number,
    default: 0,
    min: [0, 'Current amount cannot be negative']
  },
  deadline: {
    type: Date,
    required: [true, 'Please add a deadline']
  },
  category: {
    type: String,
    required: [true, 'Please add a category'],
    enum: ['Savings', 'Investment', 'Purchase', 'Debt', 'Travel', 'Education', 'Other']
  },
  priority: {
    type: String,
    required: [true, 'Please add a priority level'],
    enum: ['High', 'Medium', 'Low'],
    default: 'Medium'
  },
  notes: {
    type: String,
    maxlength: [500, 'Notes cannot be more than 500 characters']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Index for better query performance
GoalSchema.index({ user: 1, deadline: 1 });
GoalSchema.index({ user: 1, category: 1 });

export default mongoose.model('Goal', GoalSchema);