import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useGoals } from '../contexts/GoalContext';
import { useAuth } from '../contexts/AuthContext';

const Goals = () => {
  const { goals, loading, getGoals, createGoal, updateGoal, deleteGoal, stats } = useGoals();
  const { isAuthenticated } = useAuth();
  
  // Fetch goals when component mounts
  useEffect(() => {
    if (isAuthenticated) {
      getGoals();
    }
  }, [isAuthenticated, getGoals]);

  // State for new goal form
  const [showNewGoalForm, setShowNewGoalForm] = useState(false);
  const [newGoal, setNewGoal] = useState({
    title: '',
    targetAmount: '',
    currentAmount: '',
    deadline: '',
    category: 'Savings',
    priority: 'Medium',
    notes: '',
  });

  // Handle input changes for new goal form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewGoal({
      ...newGoal,
      [name]: name === 'targetAmount' || name === 'currentAmount' ? Number(value) : value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await createGoal({
      ...newGoal,
      targetAmount: Number(newGoal.targetAmount),
      currentAmount: Number(newGoal.currentAmount)
    });
    
    if (result.success) {
      setNewGoal({
        title: '',
        targetAmount: '',
        currentAmount: '',
        deadline: '',
        category: 'Savings',
        priority: 'Medium',
        notes: '',
      });
      setShowNewGoalForm(false);
    } else {
      // Handle error
      alert(result.message || 'Failed to create goal');
    }
  };

  // Calculate progress percentage
  const calculateProgress = (current, target) => {
    return Math.min(Math.round((current / target) * 100), 100);
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Calculate days remaining
  const calculateDaysRemaining = (deadline) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Get status color based on priority
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'Low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Delete a goal
  const handleDeleteGoal = async (id) => {
    const result = await deleteGoal(id);
    if (!result.success) {
      // Handle error
      alert(result.message || 'Failed to delete goal');
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen w-full">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:py-6 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="px-2 py-4 sm:px-0 sm:py-6 flex flex-col sm:flex-row justify-between sm:items-center">
          <div>
            <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">Financial Goals</h1>
            <p className="mt-1 text-xs sm:text-sm text-gray-500">Track and manage your financial goals</p>
          </div>
          <button
            onClick={() => setShowNewGoalForm(true)}
            className="mt-4 sm:mt-0 inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Add New Goal
          </button>
        </div>

        {/* Goals Summary */}
        <div className="px-2 sm:px-0 mb-4 sm:mb-6">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-4 sm:py-5 sm:p-6">
              <h3 className="text-base sm:text-lg leading-6 font-medium text-gray-900">Goals Summary</h3>
              <div className="mt-4 sm:mt-5 grid grid-cols-1 gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3">
                <div className="bg-white overflow-hidden shadow rounded-lg border border-gray-200">
                  <div className="px-4 py-5 sm:p-6">
                    <dt className="text-sm font-medium text-gray-500 truncate">Total Goals</dt>
                    <dd className="mt-1 text-2xl sm:text-3xl font-semibold text-gray-900">
                      {stats ? stats.totalGoals : goals.length}
                    </dd>
                  </div>
                </div>
                <div className="bg-white overflow-hidden shadow rounded-lg border border-gray-200">
                  <div className="px-4 py-5 sm:p-6">
                    <dt className="text-sm font-medium text-gray-500 truncate">Total Target Amount</dt>
                    <dd className="mt-1 text-2xl sm:text-3xl font-semibold text-gray-900">
                      {formatCurrency(stats ? stats.totalTargetAmount : goals.reduce((sum, goal) => sum + goal.targetAmount, 0))}
                    </dd>
                  </div>
                </div>
                <div className="bg-white overflow-hidden shadow rounded-lg border border-gray-200">
                  <div className="px-4 py-5 sm:p-6">
                    <dt className="text-sm font-medium text-gray-500 truncate">Current Progress</dt>
                    <dd className="mt-1 text-2xl sm:text-3xl font-semibold text-gray-900">
                      {formatCurrency(stats ? stats.totalCurrentAmount : goals.reduce((sum, goal) => sum + goal.currentAmount, 0))}
                    </dd>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        )}

        {/* Goals List */}
        {!loading && (
          <div className="px-2 sm:px-0">
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <ul className="divide-y divide-gray-200">
                {goals.map((goal) => {
                const progress = calculateProgress(goal.currentAmount, goal.targetAmount);
                const daysRemaining = calculateDaysRemaining(goal.deadline);
                
                return (
                  <li key={goal._id || goal.id}>
                    <div className="px-3 py-3 sm:px-6 sm:py-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <p className="text-xs sm:text-sm font-medium text-indigo-600 truncate">{goal.title}</p>
                          <div className="ml-2 flex-shrink-0 flex">
                            <p className={`px-1.5 sm:px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getPriorityColor(goal.priority)}`}>
                              {goal.priority} Priority
                            </p>
                          </div>
                        </div>
                        <div className="ml-2 flex-shrink-0 flex">
                          <button 
                            onClick={() => handleDeleteGoal(goal._id || goal.id)}
                            className="ml-2 flex items-center text-sm text-red-600 hover:text-red-900"
                          >
                            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                          </button>
                        </div>
                      </div>
                      <div className="mt-2 sm:flex sm:justify-between">
                        <div className="sm:flex">
                          <p className="flex items-center text-sm text-gray-500">
                            <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                              <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                            </svg>
                            {formatCurrency(goal.currentAmount)} of {formatCurrency(goal.targetAmount)}
                          </p>
                          <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                            <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                            </svg>
                            {daysRemaining > 0 ? `${daysRemaining} days remaining` : 'Deadline passed'}
                          </p>
                        </div>
                        <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                          <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                          </svg>
                          {goal.category}
                        </div>
                      </div>
                      <div className="mt-2">
                        <div className="relative">
                          <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                            <div 
                              style={{ width: `${progress}%` }} 
                              className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${progress >= 100 ? 'bg-green-500' : 'bg-indigo-500'}`}
                            ></div>
                          </div>
                          <div className="text-right mt-1">
                            <span className="text-xs font-semibold inline-block text-indigo-600">
                              {progress}% Complete
                            </span>
                          </div>
                        </div>
                      </div>
                      {goal.notes && (
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">{goal.notes}</p>
                        </div>
                      )}
                    </div>
                  </li>
                );
              })}
              </ul>
            </div>
          </div>
        )}

        {/* New Goal Modal */}
        {showNewGoalForm && (
          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>

              <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <form onSubmit={handleSubmit}>
                  <div className="bg-white px-3 pt-4 pb-3 sm:px-4 sm:pt-5 sm:pb-4 sm:p-6">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-2 sm:mt-0 sm:ml-4 text-center sm:text-left w-full">
                      <h3 className="text-base sm:text-lg leading-6 font-medium text-gray-900" id="modal-title">
                        Add New Financial Goal
                      </h3>
                      <div className="mt-4 sm:mt-6 space-y-4 sm:space-y-6">
                          <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Goal Title</label>
                            <input
                              type="text"
                              name="title"
                              id="title"
                              required
                              value={newGoal.title}
                              onChange={handleInputChange}
                              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            />
                          </div>
                          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                              <label htmlFor="targetAmount" className="block text-sm font-medium text-gray-700">Target Amount (₹)</label>
                              <input
                                type="number"
                                name="targetAmount"
                                id="targetAmount"
                                required
                                min="1"
                                value={newGoal.targetAmount}
                                onChange={handleInputChange}
                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                              />
                            </div>
                            <div>
                              <label htmlFor="currentAmount" className="block text-sm font-medium text-gray-700">Current Amount (₹)</label>
                              <input
                                type="number"
                                name="currentAmount"
                                id="currentAmount"
                                required
                                min="0"
                                value={newGoal.currentAmount}
                                onChange={handleInputChange}
                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                              />
                            </div>
                          </div>
                          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                              <label htmlFor="deadline" className="block text-sm font-medium text-gray-700">Target Date</label>
                              <input
                                type="date"
                                name="deadline"
                                id="deadline"
                                required
                                value={newGoal.deadline}
                                onChange={handleInputChange}
                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                              />
                            </div>
                            <div>
                              <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                              <select
                                id="category"
                                name="category"
                                value={newGoal.category}
                                onChange={handleInputChange}
                                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                              >
                                <option value="Savings">Savings</option>
                                <option value="Investment">Investment</option>
                                <option value="Purchase">Purchase</option>
                                <option value="Debt">Debt Repayment</option>
                                <option value="Travel">Travel</option>
                                <option value="Education">Education</option>
                                <option value="Other">Other</option>
                              </select>
                            </div>
                          </div>
                          <div>
                            <label htmlFor="priority" className="block text-sm font-medium text-gray-700">Priority</label>
                            <select
                              id="priority"
                              name="priority"
                              value={newGoal.priority}
                              onChange={handleInputChange}
                              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            >
                              <option value="High">High</option>
                              <option value="Medium">Medium</option>
                              <option value="Low">Low</option>
                            </select>
                          </div>
                          <div>
                            <label htmlFor="notes" className="block text-sm font-medium text-gray-700">Notes (Optional)</label>
                            <textarea
                              id="notes"
                              name="notes"
                              rows="3"
                              value={newGoal.notes}
                              onChange={handleInputChange}
                              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            ></textarea>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button
                      type="submit"
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                    >
                      Save Goal
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowNewGoalForm(false)}
                      className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* No Goals Message */}
        {goals.length === 0 && (
          <div className="text-center py-8 sm:py-12">
            <svg className="mx-auto h-10 w-10 sm:h-12 sm:w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No goals</h3>
            <p className="mt-1 text-xs sm:text-sm text-gray-500">Get started by creating a new financial goal.</p>
            <div className="mt-4 sm:mt-6">
              <button
                onClick={() => setShowNewGoalForm(true)}
                className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 border border-transparent shadow-sm text-xs sm:text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <svg className="-ml-1 mr-1 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                New Goal
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Goals;