import mongoose from 'mongoose';

const TransactionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    required: [true, 'Please add a transaction type'],
    enum: ['income', 'expense']
  },
  category: {
    type: String,
    required: [true, 'Please add a category'],
    enum: [
      // Income categories
      'salary', 'freelance', 'investment', 'business', 'gift', 'other_income',
      // Expense categories
      'food', 'transportation', 'entertainment', 'shopping', 'bills', 'healthcare', 'education', 'travel', 'other_expense'
    ]
  },
  amount: {
    type: Number,
    required: [true, 'Please add an amount'],
    min: [0.01, 'Amount must be greater than 0']
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [200, 'Description cannot be more than 200 characters']
  },
  date: {
    type: Date,
    required: [true, 'Please add a date'],
    default: Date.now
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Index for better query performance
TransactionSchema.index({ user: 1, date: -1 });
TransactionSchema.index({ user: 1, type: 1 });

export default mongoose.model('Transaction', TransactionSchema);
