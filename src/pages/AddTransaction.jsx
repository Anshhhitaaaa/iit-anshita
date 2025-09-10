import { useState } from 'react';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { Link, useNavigate } from 'react-router-dom';
import { useTransactions } from '../contexts/TransactionContext';

const AddTransaction = () => {
  const navigate = useNavigate();
  const { createTransaction } = useTransactions();
  const [formData, setFormData] = useState({
    type: 'expense',
    amount: '',
    category: '',
    date: new Date().toISOString().split('T')[0],
    description: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const expenseCategories = [
    { value: 'food', label: 'Food' },
    { value: 'transportation', label: 'Transportation' },
    { value: 'entertainment', label: 'Entertainment' },
    { value: 'shopping', label: 'Shopping' },
    { value: 'bills', label: 'Bills' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'education', label: 'Education' },
    { value: 'travel', label: 'Travel' },
    { value: 'other_expense', label: 'Other Expense' },
  ];

  const incomeCategories = [
    { value: 'salary', label: 'Salary' },
    { value: 'freelance', label: 'Freelance' },
    { value: 'investment', label: 'Investment' },
    { value: 'business', label: 'Business' },
    { value: 'gift', label: 'Gift' },
    { value: 'other_income', label: 'Other Income' },
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });

    // Reset category when type changes
    if (name === 'type') {
      setFormData(prev => ({
        ...prev,
        category: '',
        [name]: value,
      }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.amount || isNaN(formData.amount) || parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'Please enter a valid amount';
    }
    if (!formData.category) {
      newErrors.category = 'Please select a category';
    }
    if (!formData.date) {
      newErrors.date = 'Please select a date';
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage('');

    const transactionData = {
      type: formData.type,
      amount: parseFloat(formData.amount),
      category: formData.category,
      date: formData.date,
      description: formData.description,
    };

    const result = await createTransaction(transactionData);
    
    if (result.success) {
      setSubmitMessage('Transaction added successfully!');
      // Reset form
      setFormData({
        type: 'expense',
        amount: '',
        category: '',
        date: new Date().toISOString().split('T')[0],
        description: '',
      });
      setErrors({});
      // Redirect to dashboard after a short delay
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    } else {
      setSubmitMessage(result.message || 'Failed to add transaction');
    }

    setIsSubmitting(false);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex items-center mb-6">
            <Link to="/dashboard" className="mr-4 text-indigo-600 hover:text-indigo-900">
              <ArrowLeftIcon className="h-5 w-5" aria-hidden="true" />
            </Link>
            <h1 className="text-2xl font-semibold text-gray-900">Add Transaction</h1>
          </div>

          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Transaction Type */}
                <div>
                  <label className="text-base font-medium text-gray-900">Transaction Type</label>
                  <div className="mt-4 space-y-4">
                    <div className="flex items-center">
                      <input
                        id="expense"
                        name="type"
                        type="radio"
                        value="expense"
                        checked={formData.type === 'expense'}
                        onChange={handleChange}
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                      />
                      <label htmlFor="expense" className="ml-3 block text-sm font-medium text-gray-700">
                        Expense
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="income"
                        name="type"
                        type="radio"
                        value="income"
                        checked={formData.type === 'income'}
                        onChange={handleChange}
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                      />
                      <label htmlFor="income" className="ml-3 block text-sm font-medium text-gray-700">
                        Income
                      </label>
                    </div>
                  </div>
                </div>

                {/* Amount */}
                <div>
                  <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                    Amount (₹)
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">₹</span>
                    </div>
                    <input
                      type="number"
                      name="amount"
                      id="amount"
                      value={formData.amount}
                      onChange={handleChange}
                      className={`focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md ${errors.amount ? 'border-red-300' : ''}`}
                      placeholder="0.00"
                      aria-describedby="amount-currency"
                    />
                  </div>
                  {errors.amount && <p className="mt-2 text-sm text-red-600">{errors.amount}</p>}
                </div>

                {/* Category */}
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                    Category
                  </label>
                  <div className="mt-1">
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className={`mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md ${errors.category ? 'border-red-300' : ''}`}
                    >
                      <option value="">Select a category</option>
                      {formData.type === 'expense'
                        ? expenseCategories.map((category) => (
                            <option key={category.value} value={category.value}>
                              {category.label}
                            </option>
                          ))
                        : incomeCategories.map((category) => (
                            <option key={category.value} value={category.value}>
                              {category.label}
                            </option>
                          ))}
                    </select>
                  </div>
                  {errors.category && <p className="mt-2 text-sm text-red-600">{errors.category}</p>}
                </div>

                {/* Date */}
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                    Date
                  </label>
                  <div className="mt-1">
                    <input
                      type="date"
                      name="date"
                      id="date"
                      value={formData.date}
                      onChange={handleChange}
                      className={`focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${errors.date ? 'border-red-300' : ''}`}
                    />
                  </div>
                  {errors.date && <p className="mt-2 text-sm text-red-600">{errors.date}</p>}
                </div>

                {/* Description */}
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="description"
                      name="description"
                      rows={3}
                      value={formData.description}
                      onChange={handleChange}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Add notes about this transaction"
                    />
                  </div>
                </div>

                {/* Success/Error Message */}
                {submitMessage && (
                  <div className={`p-4 rounded-md ${
                    submitMessage.includes('successfully') 
                      ? 'bg-green-50 border border-green-200 text-green-800' 
                      : 'bg-red-50 border border-red-200 text-red-800'
                  }`}>
                    {submitMessage}
                  </div>
                )}

                <div className="flex justify-end">
                  <Link
                    to="/dashboard"
                    className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-3"
                  >
                    Cancel
                  </Link>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Saving...
                      </>
                    ) : (
                      'Save Transaction'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTransaction;