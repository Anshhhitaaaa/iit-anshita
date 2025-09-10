import { createContext, useContext, useState, useCallback } from 'react';
import axios from 'axios';

const GoalContext = createContext();

export const GoalProvider = ({ children }) => {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5003';
  
  // Function to refresh stats
  const refreshStats = useCallback(async () => {
    try {
      const response = await axios.get(`${API_URL}/api/goals/stats`);
      setStats(response.data.data);
      return response.data.data;
    } catch (error) {
      console.error('Refresh goal stats error:', error);
      return null;
    }
  }, [API_URL]);

  // Get all goals
  const getGoals = useCallback(async (params = {}) => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/api/goals`, { params });
      setGoals(response.data.data);
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Get goals error:', error);
      return { 
        success: false, 
        message: error.response?.data?.message || 'Failed to fetch goals' 
      };
    } finally {
      setLoading(false);
    }
  }, [API_URL]);

  // Get goal statistics
  const getGoalStats = useCallback(async () => {
    try {
      const data = await refreshStats();
      return { success: true, data };
    } catch (error) {
      console.error('Get goal stats error:', error);
      return { 
        success: false, 
        message: error.response?.data?.message || 'Failed to fetch statistics' 
      };
    }
  }, [refreshStats]);

  // Create new goal
  const createGoal = useCallback(async (goalData) => {
    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/api/goals`, goalData);
      setGoals(prev => [response.data.data, ...prev]);
      
      // Update stats after adding a goal
      await refreshStats();
      
      return { success: true, data: response.data.data };
    } catch (error) {
      console.error('Create goal error:', error);
      return { 
        success: false, 
        message: error.response?.data?.message || 'Failed to create goal' 
      };
    } finally {
      setLoading(false);
    }
  }, [API_URL, refreshStats]);

  // Update goal
  const updateGoal = useCallback(async (id, goalData) => {
    setLoading(true);
    try {
      const response = await axios.put(`${API_URL}/api/goals/${id}`, goalData);
      setGoals(prev => 
        prev.map(goal => 
          goal._id === id ? response.data.data : goal
        )
      );
      
      // Update stats after updating a goal
      await refreshStats();
      
      return { success: true, data: response.data.data };
    } catch (error) {
      console.error('Update goal error:', error);
      return { 
        success: false, 
        message: error.response?.data?.message || 'Failed to update goal' 
      };
    } finally {
      setLoading(false);
    }
  }, [API_URL, refreshStats]);

  // Delete goal
  const deleteGoal = useCallback(async (id) => {
    setLoading(true);
    try {
      await axios.delete(`${API_URL}/api/goals/${id}`);
      setGoals(prev => prev.filter(goal => goal._id !== id));
      
      // Update stats after deleting a goal
      await refreshStats();
      
      return { success: true };
    } catch (error) {
      console.error('Delete goal error:', error);
      return { 
        success: false, 
        message: error.response?.data?.message || 'Failed to delete goal' 
      };
    } finally {
      setLoading(false);
    }
  }, [API_URL, refreshStats]);

  return (
    <GoalContext.Provider
      value={{
        goals,
        loading,
        stats,
        getGoals,
        getGoalStats,
        createGoal,
        updateGoal,
        deleteGoal,
        refreshStats
      }}
    >
      {children}
    </GoalContext.Provider>
  );
};

export const useGoals = () => {
  const context = useContext(GoalContext);
  if (context === undefined) {
    throw new Error('useGoals must be used within a GoalProvider');
  }
  return context;
};