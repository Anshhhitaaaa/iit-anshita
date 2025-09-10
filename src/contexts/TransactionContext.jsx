import { createContext, useContext, useState, useCallback } from 'react';
import axios from 'axios';

const TransactionContext = createContext();

export const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL || '';
  
  // Function to refresh stats
  const refreshStats = useCallback(async () => {
    try {
      const response = await axios.get(`${API_URL}/api/transactions/stats`, {
        params: { period: 'month' }
      });
      setStats(response.data.data);
      return response.data.data;
    } catch (error) {
      console.error('Refresh stats error:', error);
      return null;
    }
  }, [API_URL]);

  // Get all transactions
  const getTransactions = useCallback(async (params = {}) => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/api/transactions`, { params });
      setTransactions(response.data.data);
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Get transactions error:', error);
      return { 
        success: false, 
        message: error.response?.data?.message || 'Failed to fetch transactions' 
      };
    } finally {
      setLoading(false);
    }
  }, [API_URL]);

  // Get transaction statistics
  const getTransactionStats = useCallback(async (period = 'month') => {
    try {
      if (period === 'month') {
        // Use the refreshStats function for monthly stats
        const data = await refreshStats();
        return { success: true, data };
      } else {
        // For other periods, make a separate API call
        const response = await axios.get(`${API_URL}/api/transactions/stats`, {
          params: { period }
        });
        return { success: true, data: response.data.data };
      }
    } catch (error) {
      console.error('Get transaction stats error:', error);
      return { 
        success: false, 
        message: error.response?.data?.message || 'Failed to fetch statistics' 
      };
    }
  }, [API_URL, refreshStats]);

  // Create new transaction
  const createTransaction = useCallback(async (transactionData) => {
    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/api/transactions`, transactionData);
      setTransactions(prev => [response.data.data, ...prev]);
      
      // Update stats after adding a transaction
      await refreshStats();
      
      return { success: true, data: response.data.data };
    } catch (error) {
      console.error('Create transaction error:', error);
      return { 
        success: false, 
        message: error.response?.data?.message || 'Failed to create transaction' 
      };
    } finally {
      setLoading(false);
    }
  }, [API_URL, refreshStats]);

  // Update transaction
  const updateTransaction = useCallback(async (id, transactionData) => {
    setLoading(true);
    try {
      const response = await axios.put(`${API_URL}/api/transactions/${id}`, transactionData);
      setTransactions(prev => 
        prev.map(transaction => 
          transaction._id === id ? response.data.data : transaction
        )
      );
      
      // Update stats after updating a transaction
      await refreshStats();
      
      return { success: true, data: response.data.data };
    } catch (error) {
      console.error('Update transaction error:', error);
      return { 
        success: false, 
        message: error.response?.data?.message || 'Failed to update transaction' 
      };
    } finally {
      setLoading(false);
    }
  }, [API_URL, refreshStats]);

  // Delete transaction
  const deleteTransaction = useCallback(async (id) => {
    setLoading(true);
    try {
      await axios.delete(`${API_URL}/api/transactions/${id}`);
      setTransactions(prev => prev.filter(transaction => transaction._id !== id));
      
      // Update stats after deleting a transaction
      await refreshStats();
      
      return { success: true };
    } catch (error) {
      console.error('Delete transaction error:', error);
      return { 
        success: false, 
        message: error.response?.data?.message || 'Failed to delete transaction' 
      };
    } finally {
      setLoading(false);
    }
  }, [API_URL, refreshStats]);

  const value = {
    transactions,
    stats,
    loading,
    getTransactions,
    getTransactionStats,
    createTransaction,
    updateTransaction,
    deleteTransaction
  };

  return (
    <TransactionContext.Provider value={value}>
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactions = () => {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error('useTransactions must be used within a TransactionProvider');
  }
  return context;
};
