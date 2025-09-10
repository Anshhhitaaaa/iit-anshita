import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpIcon, ArrowDownIcon, PlusIcon } from '@heroicons/react/24/outline';
import { Doughnut, Line } from 'react-chartjs-2';
import { useTransactions } from '../contexts/TransactionContext';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title
);

const Dashboard = () => {
  const { transactions, loading, getTransactions, getTransactionStats, stats } = useTransactions();
  const [monthlyData, setMonthlyData] = useState({
    income: 0,
    expenses: 0,
    savings: 0,
    budget: 60000, // Default budget
  });
  
  const [isEditing, setIsEditing] = useState({
    income: false,
    expenses: false,
    savings: false
  });
  
  const [editValues, setEditValues] = useState({
    income: 0,
    expenses: 0,
    savings: 0
  });

  // Fetch transactions on component mount
  useEffect(() => {
    const fetchData = async () => {
      await getTransactions({ limit: 5, sortBy: 'date', sortOrder: 'desc' });
      await getTransactionStats('month');
    };
    
    fetchData();
  }, [getTransactions, getTransactionStats]);

  // Update monthly data when stats change
  useEffect(() => {
    if (stats) {
      const income = stats.income || 0;
      const expenses = stats.expense || 0;
      const savings = income - expenses;
      
      setMonthlyData({
        income,
        expenses,
        savings,
        budget: 60000, // Default budget
      });
      
      setEditValues({
        income,
        expenses,
        savings
      });
    }
  }, [stats]);

  // Handle edit toggle
  const toggleEdit = (field) => {
    if (isEditing[field]) {
      // Save the edited value
      const newValue = parseFloat(editValues[field]);
      if (!isNaN(newValue) && newValue >= 0) {
        // If editing income or expenses, recalculate savings
        if (field === 'income' || field === 'expenses') {
          const newIncome = field === 'income' ? newValue : monthlyData.income;
          const newExpenses = field === 'expenses' ? newValue : monthlyData.expenses;
          const newSavings = newIncome - newExpenses;
          
          setMonthlyData(prev => ({
            ...prev,
            [field]: newValue,
            savings: newSavings
          }));
          
          setEditValues(prev => ({
            ...prev,
            [field]: newValue,
            savings: newSavings
          }));
        } else {
          // For savings, adjust income to match (keeping expenses the same)
          const newIncome = monthlyData.expenses + newValue;
          
          setMonthlyData(prev => ({
            ...prev,
            income: newIncome,
            savings: newValue
          }));
          
          setEditValues(prev => ({
            ...prev,
            income: newIncome,
            savings: newValue
          }));
        }
      } else {
        // If invalid input, reset to previous value
        setEditValues(prev => ({
          ...prev,
          [field]: monthlyData[field]
        }));
      }
    } else {
      // Start editing - initialize edit value
      setEditValues(prev => ({
        ...prev,
        [field]: monthlyData[field]
      }));
    }
    
    // Toggle edit mode
    setIsEditing(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };
  
  // Handle input change
  const handleInputChange = (e, field) => {
    const value = e.target.value;
    setEditValues(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  // Chart data for expense breakdown
  const expenseChartData = {
    labels: ['Housing', 'Food', 'Transportation', 'Entertainment', 'Utilities', 'Others'],
    datasets: [
      {
        data: [15000, 8000, 5000, 4000, 6000, 14000],
        backgroundColor: [
          '#4F46E5', // indigo-600
          '#7C3AED', // violet-600
          '#EC4899', // pink-600
          '#F59E0B', // amber-500
          '#10B981', // emerald-500
          '#6366F1', // indigo-500
        ],
        borderWidth: 1,
      },
    ],
  };

  // Chart data for monthly trend
  const trendChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Income',
        data: [65000, 68000, 70000, 72000, 70000, 75000],
        borderColor: '#10B981', // emerald-500
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.4,
      },
      {
        label: 'Expenses',
        data: [48000, 50000, 49000, 55000, 53000, 52000],
        borderColor: '#F59E0B', // amber-500
        backgroundColor: 'rgba(245, 158, 11, 0.1)',
        tension: 0.4,
      },
    ],
  };

  const trendOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => `₹${value / 1000}k`,
        },
      },
    },
  };

  // Calculate savings percentage
  const savingsPercentage = monthlyData.income > 0 
    ? ((monthlyData.income - monthlyData.expenses) / monthlyData.income * 100).toFixed(1)
    : 0;

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="bg-gray-50 min-h-screen w-full">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
        {/* Dashboard Header */}
        <div className="px-2 py-4 sm:px-0 sm:py-6">
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">Dashboard</h1>
          <p className="mt-1 text-xs sm:text-sm text-gray-500">Overview of your financial status for June 2023</p>
        </div>

        {/* Summary Cards */}
        <div className="mt-4 grid grid-cols-1 gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {/* Income Card */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-green-100 rounded-md p-3">
                  <ArrowUpIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Monthly Income</dt>
                    <dd>
                      {isEditing.income ? (
                        <div className="flex items-center mt-1">
                          <input
                            type="number"
                            value={editValues.income}
                            onChange={(e) => handleInputChange(e, 'income')}
                            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          />
                          <button
                            onClick={() => toggleEdit('income')}
                            className="ml-2 inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <div className="text-lg font-medium text-gray-900">{formatCurrency(monthlyData.income)}</div>
                          <button
                            onClick={() => toggleEdit('income')}
                            className="ml-2 text-gray-400 hover:text-gray-500"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                          </button>
                        </div>
                      )}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          {/* Expenses Card */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-red-100 rounded-md p-3">
                  <ArrowDownIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Monthly Expenses</dt>
                    <dd>
                      {isEditing.expenses ? (
                        <div className="flex items-center mt-1">
                          <input
                            type="number"
                            value={editValues.expenses}
                            onChange={(e) => handleInputChange(e, 'expenses')}
                            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          />
                          <button
                            onClick={() => toggleEdit('expenses')}
                            className="ml-2 inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <div className="text-lg font-medium text-gray-900">{formatCurrency(monthlyData.expenses)}</div>
                          <button
                            onClick={() => toggleEdit('expenses')}
                            className="ml-2 text-gray-400 hover:text-gray-500"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                          </button>
                        </div>
                      )}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          {/* Savings Card */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-blue-100 rounded-md p-3">
                  <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Monthly Savings</dt>
                    <dd>
                      {isEditing.savings ? (
                        <div className="flex items-center mt-1">
                          <input
                            type="number"
                            value={editValues.savings}
                            onChange={(e) => handleInputChange(e, 'savings')}
                            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          />
                          <button
                            onClick={() => toggleEdit('savings')}
                            className="ml-2 inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <div className="text-lg font-medium text-gray-900">
                            {formatCurrency(monthlyData.savings)} {monthlyData.income > 0 ? `(${savingsPercentage}%)` : ''}
                          </div>
                          <button
                            onClick={() => toggleEdit('savings')}
                            className="ml-2 text-gray-400 hover:text-gray-500"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                          </button>
                        </div>
                      )}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          {/* Budget Card */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-purple-100 rounded-md p-3">
                  <svg className="h-6 w-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Monthly Budget</dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        {formatCurrency(monthlyData.budget)}
                        <span className="text-sm text-gray-500 ml-2">
                          {monthlyData.expenses <= monthlyData.budget ? 'On track' : 'Over budget'}
                        </span>
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="mt-6 sm:mt-8 grid grid-cols-1 gap-4 sm:gap-5 sm:grid-cols-2">
          {/* Expense Breakdown Chart */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Expense Breakdown</h3>
              <div className="mt-3 sm:mt-5 h-48 sm:h-64 flex items-center justify-center">
                <div className="w-full max-w-md">
                  <Doughnut data={expenseChartData} options={{ maintainAspectRatio: false }} />
                </div>
              </div>
            </div>
          </div>

          {/* Monthly Trend Chart */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Income vs Expenses Trend</h3>
              <div className="mt-3 sm:mt-5 h-48 sm:h-64">
                <Line data={trendChartData} options={{ ...trendOptions, maintainAspectRatio: false }} />
              </div>
            </div>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="mt-6 sm:mt-8 bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-4 sm:py-5 sm:px-6 flex flex-col sm:flex-row justify-between sm:items-center">
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Transactions</h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">Your latest financial activities</p>
            </div>
            <Link
              to="/add-transaction"
              className="mt-3 sm:mt-0 inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
              Add Transaction
            </Link>
          </div>
          <div className="border-t border-gray-200">
            {loading ? (
              <div className="px-4 py-5 sm:px-6 text-center text-gray-500">Loading transactions...</div>
            ) : transactions.length === 0 ? (
              <div className="px-4 py-5 sm:px-6 text-center text-gray-500">No transactions found. Add your first transaction!</div>
            ) : (
              <ul className="divide-y divide-gray-200">
                {transactions.map((transaction) => (
                  <li key={transaction._id} className="px-4 py-3 sm:py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className={`flex-shrink-0 h-8 w-8 sm:h-10 sm:w-10 rounded-full flex items-center justify-center ${transaction.type === 'income' ? 'bg-green-100' : 'bg-red-100'}`}>
                          {transaction.type === 'income' ? (
                            <ArrowUpIcon className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" aria-hidden="true" />
                          ) : (
                            <ArrowDownIcon className="h-5 w-5 sm:h-6 sm:w-6 text-red-600" aria-hidden="true" />
                          )}
                        </div>
                        <div className="ml-3 sm:ml-4">
                          <div className="text-sm font-medium text-gray-900">{transaction.category}</div>
                          <div className="text-xs sm:text-sm text-gray-500">{new Date(transaction.date).toLocaleDateString()}</div>
                          <div className="text-xs text-gray-500 mt-1">{transaction.description}</div>
                        </div>
                      </div>
                      <div className={`text-sm font-medium ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                        {transaction.type === 'income' ? '+' : '-'} {formatCurrency(transaction.amount)}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
            <div className="px-4 py-4 sm:px-6 text-center">
              <Link to="/transactions" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                View all transactions
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;