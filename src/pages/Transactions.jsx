import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeftIcon, ArrowUpIcon, ArrowDownIcon, PlusIcon } from '@heroicons/react/24/outline';
import { useTransactions } from '../contexts/TransactionContext';

const Transactions = () => {
  const { transactions, loading, getTransactions } = useTransactions();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filter, setFilter] = useState({
    type: '',
    category: '',
    sortBy: 'date',
    sortOrder: 'desc'
  });

  useEffect(() => {
    fetchTransactions();
  }, [currentPage, filter]);

  const fetchTransactions = async () => {
    const params = {
      page: currentPage,
      limit: 10,
      ...filter
    };
    
    // Remove empty filters
    Object.keys(params).forEach(key => {
      if (params[key] === '') {
        delete params[key];
      }
    });
    
    const result = await getTransactions(params);
    if (result.success && result.data.pagination) {
      setTotalPages(result.data.pagination.totalPages);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter(prev => ({
      ...prev,
      [name]: value
    }));
    setCurrentPage(1); // Reset to first page when filter changes
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex items-center mb-6">
            <Link to="/dashboard" className="mr-4 text-indigo-600 hover:text-indigo-900">
              <ArrowLeftIcon className="h-5 w-5" aria-hidden="true" />
            </Link>
            <h1 className="text-2xl font-semibold text-gray-900">All Transactions</h1>
          </div>

          {/* Filters */}
          <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
            <div className="px-4 py-5 sm:p-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
                <div>
                  <label htmlFor="type" className="block text-sm font-medium text-gray-700">Type</label>
                  <select
                    id="type"
                    name="type"
                    value={filter.type}
                    onChange={handleFilterChange}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  >
                    <option value="">All Types</option>
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                  <select
                    id="category"
                    name="category"
                    value={filter.category}
                    onChange={handleFilterChange}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  >
                    <option value="">All Categories</option>
                    <optgroup label="Income">
                      <option value="salary">Salary</option>
                      <option value="freelance">Freelance</option>
                      <option value="investment">Investment</option>
                      <option value="business">Business</option>
                      <option value="gift">Gift</option>
                      <option value="other_income">Other Income</option>
                    </optgroup>
                    <optgroup label="Expense">
                      <option value="food">Food</option>
                      <option value="transportation">Transportation</option>
                      <option value="entertainment">Entertainment</option>
                      <option value="shopping">Shopping</option>
                      <option value="bills">Bills</option>
                      <option value="healthcare">Healthcare</option>
                      <option value="education">Education</option>
                      <option value="travel">Travel</option>
                      <option value="other_expense">Other Expense</option>
                    </optgroup>
                  </select>
                </div>

                <div>
                  <label htmlFor="sortBy" className="block text-sm font-medium text-gray-700">Sort By</label>
                  <select
                    id="sortBy"
                    name="sortBy"
                    value={filter.sortBy}
                    onChange={handleFilterChange}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  >
                    <option value="date">Date</option>
                    <option value="amount">Amount</option>
                    <option value="category">Category</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="sortOrder" className="block text-sm font-medium text-gray-700">Order</label>
                  <select
                    id="sortOrder"
                    name="sortOrder"
                    value={filter.sortOrder}
                    onChange={handleFilterChange}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  >
                    <option value="desc">Descending</option>
                    <option value="asc">Ascending</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Transactions List */}
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-4 sm:py-5 sm:px-6 flex flex-col sm:flex-row justify-between sm:items-center">
              <div>
                <h3 className="text-lg leading-6 font-medium text-gray-900">Transactions</h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  {loading ? 'Loading...' : `Showing ${transactions.length} transactions`}
                </p>
              </div>
              <Link
                to="/add-transaction"
                className="mt-3 sm:mt-0 inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                Add Transaction
              </Link>
            </div>

            {loading ? (
              <div className="text-center py-10">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600 mx-auto"></div>
                <p className="mt-2 text-gray-500">Loading transactions...</p>
              </div>
            ) : transactions.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-gray-500">No transactions found</p>
              </div>
            ) : (
              <div className="border-t border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Category
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Description
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {transactions.map((transaction) => (
                      <tr key={transaction._id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${transaction.type === 'income' ? 'bg-green-100' : 'bg-red-100'}`}>
                              {transaction.type === 'income' ? (
                                <ArrowUpIcon className="h-5 w-5 text-green-600" aria-hidden="true" />
                              ) : (
                                <ArrowDownIcon className="h-5 w-5 text-red-600" aria-hidden="true" />
                              )}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {transaction.type === 'income' ? 'Income' : 'Expense'}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{transaction.category.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900 max-w-xs truncate">{transaction.description}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{formatDate(transaction.date)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <div className={`text-sm font-medium ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                            {transaction.type === 'income' ? '+' : '-'} {formatCurrency(transaction.amount)}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                <div className="flex-1 flex justify-between sm:hidden">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-700">
                      Showing page <span className="font-medium">{currentPage}</span> of{' '}
                      <span className="font-medium">{totalPages}</span> pages
                    </p>
                  </div>
                  <div>
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                      <button
                        onClick={() => handlePageChange(1)}
                        disabled={currentPage === 1}
                        className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <span className="sr-only">First</span>
                        <span className="h-5 w-5 flex items-center justify-center">«</span>
                      </button>
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <span className="sr-only">Previous</span>
                        <span className="h-5 w-5 flex items-center justify-center">‹</span>
                      </button>
                      
                      {/* Page numbers */}
                      {[...Array(totalPages).keys()].map(page => {
                        const pageNumber = page + 1;
                        // Show current page, and 1 page before and after
                        if (
                          pageNumber === 1 ||
                          pageNumber === totalPages ||
                          (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                        ) {
                          return (
                            <button
                              key={pageNumber}
                              onClick={() => handlePageChange(pageNumber)}
                              className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${currentPage === pageNumber
                                ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                                : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                              }`}
                            >
                              {pageNumber}
                            </button>
                          );
                        } else if (
                          pageNumber === currentPage - 2 ||
                          pageNumber === currentPage + 2
                        ) {
                          // Show ellipsis for skipped pages
                          return (
                            <span
                              key={pageNumber}
                              className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700"
                            >
                              ...
                            </span>
                          );
                        }
                        return null;
                      })}
                      
                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <span className="sr-only">Next</span>
                        <span className="h-5 w-5 flex items-center justify-center">›</span>
                      </button>
                      <button
                        onClick={() => handlePageChange(totalPages)}
                        disabled={currentPage === totalPages}
                        className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <span className="sr-only">Last</span>
                        <span className="h-5 w-5 flex items-center justify-center">»</span>
                      </button>
                    </nav>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transactions;