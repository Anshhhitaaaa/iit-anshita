import { useState } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Forecast = () => {
  // State for forecast period selection
  const [forecastPeriod, setForecastPeriod] = useState('6months');
  
  // Mock data for demonstration
  const [categories] = useState([
    { id: 'housing', name: 'Housing', color: '#4F46E5' },
    { id: 'food', name: 'Food', color: '#7C3AED' },
    { id: 'transport', name: 'Transportation', color: '#EC4899' },
    { id: 'entertainment', name: 'Entertainment', color: '#F59E0B' },
    { id: 'utilities', name: 'Utilities', color: '#10B981' },
    { id: 'others', name: 'Others', color: '#6366F1' },
  ]);

  // Generate forecast data based on selected period
  const generateForecastData = () => {
    let months;
    switch (forecastPeriod) {
      case '3months':
        months = ['July', 'August', 'September'];
        break;
      case '6months':
        months = ['July', 'August', 'September', 'October', 'November', 'December'];
        break;
      case '12months':
        months = [
          'July', 'August', 'September', 'October', 'November', 'December',
          'January', 'February', 'March', 'April', 'May', 'June'
        ];
        break;
      default:
        months = ['July', 'August', 'September', 'October', 'November', 'December'];
    }

    // Generate random forecast data with some trend
    const datasets = categories.map((category) => {
      const baseValue = Math.floor(Math.random() * 10000) + 5000;
      const data = months.map((_, index) => {
        // Add some variability and slight upward trend
        return baseValue + Math.floor(Math.random() * 2000) - 1000 + (index * 200);
      });

      return {
        label: category.name,
        data,
        backgroundColor: category.color,
        borderColor: category.color,
        borderWidth: 1,
      };
    });

    return { labels: months, datasets };
  };

  // Generate income vs expenses forecast
  const generateIncomeExpensesForecast = () => {
    let months;
    switch (forecastPeriod) {
      case '3months':
        months = ['July', 'August', 'September'];
        break;
      case '6months':
        months = ['July', 'August', 'September', 'October', 'November', 'December'];
        break;
      case '12months':
        months = [
          'July', 'August', 'September', 'October', 'November', 'December',
          'January', 'February', 'March', 'April', 'May', 'June'
        ];
        break;
      default:
        months = ['July', 'August', 'September', 'October', 'November', 'December'];
    }

    // Base values for income and expenses
    const baseIncome = 75000;
    const baseExpenses = 52000;

    // Generate data with trends
    const incomeData = months.map((_, index) => {
      // Income increases slightly each month
      return baseIncome + (index * 1000) + Math.floor(Math.random() * 3000) - 1500;
    });

    const expensesData = months.map((_, index) => {
      // Expenses increase slightly each month but less than income
      return baseExpenses + (index * 800) + Math.floor(Math.random() * 2000) - 1000;
    });

    // Calculate savings
    const savingsData = months.map((_, index) => {
      return incomeData[index] - expensesData[index];
    });

    return {
      labels: months,
      datasets: [
        {
          label: 'Income',
          data: incomeData,
          borderColor: '#10B981', // emerald-500
          backgroundColor: 'rgba(16, 185, 129, 0.1)',
          tension: 0.4,
        },
        {
          label: 'Expenses',
          data: expensesData,
          borderColor: '#F59E0B', // amber-500
          backgroundColor: 'rgba(245, 158, 11, 0.1)',
          tension: 0.4,
        },
        {
          label: 'Savings',
          data: savingsData,
          borderColor: '#4F46E5', // indigo-600
          backgroundColor: 'rgba(79, 70, 229, 0.1)',
          tension: 0.4,
        },
      ],
    };
  };

  // Chart options
  const lineOptions = {
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

  const barOptions = {
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

  // Generate insights based on forecast data
  const generateInsights = () => {
    const insights = [
      {
        title: 'Spending Trend',
        description: 'Your monthly expenses are projected to increase by approximately 5% over the next few months. Consider reviewing your budget to maintain your savings goals.',
        type: 'warning',
      },
      {
        title: 'Savings Potential',
        description: 'Based on your current income and spending patterns, you could save an additional ₹15,000 per month by reducing discretionary spending in Entertainment and Shopping categories.',
        type: 'info',
      },
      {
        title: 'Budget Alert',
        description: 'Your Housing expenses are projected to exceed your budget by ₹3,000 in the coming months. Consider adjusting your budget or finding ways to reduce these costs.',
        type: 'warning',
      },
      {
        title: 'Income Opportunity',
        description: 'If you maintain your current savings rate, you will have enough for your emergency fund goal by December 2023.',
        type: 'success',
      },
    ];

    return insights;
  };

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
      <div className="max-w-7xl mx-auto py-4 px-4 sm:py-6 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="px-2 py-4 sm:px-0 sm:py-6">
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">Forecast & Insights</h1>
          <p className="mt-1 text-xs sm:text-sm text-gray-500">Predict your future expenses and income based on your spending patterns</p>
        </div>

        {/* Forecast Period Selection */}
        <div className="px-4 sm:px-0 mb-6">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Forecast Period</h3>
              <div className="mt-4 flex flex-wrap gap-4">
                <button
                  onClick={() => setForecastPeriod('3months')}
                  className={`px-4 py-2 rounded-md text-sm font-medium ${forecastPeriod === '3months' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                >
                  3 Months
                </button>
                <button
                  onClick={() => setForecastPeriod('6months')}
                  className={`px-4 py-2 rounded-md text-sm font-medium ${forecastPeriod === '6months' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                >
                  6 Months
                </button>
                <button
                  onClick={() => setForecastPeriod('12months')}
                  className={`px-4 py-2 rounded-md text-sm font-medium ${forecastPeriod === '12months' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                >
                  12 Months
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="mt-6 sm:mt-8 grid grid-cols-1 gap-4 sm:gap-5 sm:grid-cols-1 lg:grid-cols-2">
          {/* Income vs Expenses Forecast */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Income vs Expenses Forecast</h3>
              <p className="mt-1 text-sm text-gray-500">Projected income and expenses for the next {forecastPeriod === '3months' ? '3' : forecastPeriod === '6months' ? '6' : '12'} months</p>
              <div className="mt-3 sm:mt-5 h-60 sm:h-80">
                <Line data={generateIncomeExpensesForecast()} options={{...lineOptions, maintainAspectRatio: false}} />
              </div>
            </div>
          </div>

          {/* Category Forecast */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Category Forecast</h3>
              <p className="mt-1 text-sm text-gray-500">Projected expenses by category</p>
              <div className="mt-3 sm:mt-5 h-60 sm:h-80">
                <Bar data={generateForecastData()} options={{...barOptions, maintainAspectRatio: false}} />
              </div>
            </div>
          </div>
        </div>

        {/* Insights Section */}
        <div className="mt-6 sm:mt-8">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Financial Insights</h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">Personalized recommendations based on your spending patterns</p>
            </div>
            <div className="border-t border-gray-200">
              <dl>
                {generateInsights().map((insight, index) => (
                  <div key={index} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6`}>
                    <dt className="text-sm font-medium text-gray-500">{insight.title}</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      <div className={`flex items-start ${insight.type === 'warning' ? 'text-amber-600' : insight.type === 'success' ? 'text-green-600' : 'text-blue-600'}`}>
                        {insight.type === 'warning' && (
                          <svg className="flex-shrink-0 h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        )}
                        {insight.type === 'success' && (
                          <svg className="flex-shrink-0 h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        )}
                        {insight.type === 'info' && (
                          <svg className="flex-shrink-0 h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                          </svg>
                        )}
                        {insight.description}
                      </div>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>

        {/* Savings Projection */}
        <div className="mt-6 sm:mt-8 bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Savings Projection</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">Estimated savings based on current trends</p>
          </div>
          <div className="border-t border-gray-200 px-4 py-4 sm:py-5 sm:p-6">
            <div className="grid grid-cols-1 gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3">
              <div className="bg-gray-50 overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <dt className="text-sm font-medium text-gray-500 truncate">Projected Monthly Savings</dt>
                  <dd className="mt-1 text-2xl sm:text-3xl font-semibold text-gray-900">{formatCurrency(23000)}</dd>
                </div>
              </div>
              <div className="bg-gray-50 overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <dt className="text-sm font-medium text-gray-500 truncate">6-Month Savings Potential</dt>
                  <dd className="mt-1 text-2xl sm:text-3xl font-semibold text-gray-900">{formatCurrency(138000)}</dd>
                </div>
              </div>
              <div className="bg-gray-50 overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <dt className="text-sm font-medium text-gray-500 truncate">Annual Savings Potential</dt>
                  <dd className="mt-1 text-2xl sm:text-3xl font-semibold text-gray-900">{formatCurrency(276000)}</dd>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forecast;