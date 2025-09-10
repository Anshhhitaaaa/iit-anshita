import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTransactions } from '../contexts/TransactionContext';
import { useGoals } from '../contexts/GoalContext';
import { UserIcon, EnvelopeIcon, CalendarIcon, PencilIcon, CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';
import defaultProfilePic from '../assets/profile.png';

const Profile = () => {
  const { user, isAuthenticated } = useAuth();
  const { getTransactions } = useTransactions();
  const { goals } = useGoals();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: '',
    email: '',
    profilePicture: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [transactionCount, setTransactionCount] = useState(0);

  useEffect(() => {
    if (user) {
      setEditData({
        name: user.name || '',
        email: user.email || '',
        profilePicture: user.profilePicture || ''
      });
    }
  }, [user]);

  useEffect(() => {
    // Fetch transaction count when component mounts
    const fetchTransactionCount = async () => {
      try {
        const result = await getTransactions();
        if (result.success) {
          setTransactionCount(result.data.totalCount || 0);
        }
      } catch (error) {
        console.error('Error fetching transaction count:', error);
      }
    };

    if (isAuthenticated) {
      fetchTransactionCount();
    }
  }, [isAuthenticated, getTransactions]);

  const handleEdit = () => {
    setIsEditing(true);
    setMessage({ type: '', text: '' });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData({
      name: user.name || '',
      email: user.email || '',
    });
    setMessage({ type: '', text: '' });
  };

  const handleSave = async () => {
    setIsLoading(true);
    setMessage({ type: '', text: '' });

    try {
      // Simulate API call to update user profile
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
      setIsEditing(false);
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to update profile. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData({
      ...editData,
      [name]: value,
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
          <p className="text-gray-600">Please log in to view your profile.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white shadow rounded-lg mb-8">
          <div className="px-6 py-8">
            <div className="flex items-center space-x-6">
              <div className="flex-shrink-0">
                {editData.profilePicture ? (
                  <img 
                    src={editData.profilePicture} 
                    alt="Profile" 
                    className="h-24 w-24 rounded-full object-cover border-4 border-white shadow-lg"
                  />
                ) : (
                  <img 
                    src={defaultProfilePic} 
                    alt="Profile" 
                    className="h-24 w-24 rounded-full object-cover border-4 border-white shadow-lg"
                  />
                )}
              </div>
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
                <p className="text-gray-600 mt-1">Manage your account information</p>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Information */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Personal Information</h2>
                <p className="text-gray-600 mt-1">Update your account details and preferences</p>
              </div>
              {!isEditing && (
                <button
                  onClick={handleEdit}
                  className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                >
                  <PencilIcon className="h-4 w-4 mr-2" />
                  Edit Profile
                </button>
              )}
            </div>

            {/* Message */}
            {message.text && (
              <div className={`mb-6 p-4 rounded-md ${
                message.type === 'success' 
                  ? 'bg-green-50 border border-green-200 text-green-800' 
                  : 'bg-red-50 border border-red-200 text-red-800'
              }`}>
                {message.text}
              </div>
            )}

            {/* Profile Picture Upload */}
              <div className="mb-8">
                <label className="block text-sm font-semibold text-gray-800 mb-3">
                  Profile Picture
                </label>
                {isEditing ? (
                  <div className="flex items-center space-x-6">
                    <div className="flex-shrink-0">
                      {editData.profilePicture ? (
                        <img 
                          src={editData.profilePicture} 
                          alt="Profile" 
                          className="h-20 w-20 rounded-full object-cover border-2 border-gray-200"
                        />
                      ) : (
                        <img 
                          src={defaultProfilePic} 
                          alt="Profile" 
                          className="h-20 w-20 rounded-full object-cover border-2 border-gray-200"
                        />
                      )}
                    </div>
                    <div className="flex-1">
                      <input
                        type="text"
                        name="profilePicture"
                        value={editData.profilePicture}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-gray-900"
                        placeholder="Enter profile picture URL"
                      />
                      <p className="mt-1 text-xs text-gray-500">Enter a URL for your profile picture</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center space-x-6">
                    <div className="flex-shrink-0">
                      {editData.profilePicture ? (
                        <img 
                          src={editData.profilePicture} 
                          alt="Profile" 
                          className="h-20 w-20 rounded-full object-cover border-2 border-gray-200"
                        />
                      ) : (
                        <img 
                          src={defaultProfilePic} 
                          alt="Profile" 
                          className="h-20 w-20 rounded-full object-cover border-2 border-gray-200"
                        />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-600">
                        {editData.profilePicture ? 'Profile picture set' : 'No profile picture set'}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              {/* Name Field */}
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-800">
                  Full Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={editData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-gray-900"
                    placeholder="Enter your full name"
                  />
                ) : (
                  <div className="flex items-center p-4 bg-gray-50 rounded-lg border">
                    <UserIcon className="h-5 w-5 mr-3 text-blue-600" />
                    <span className="text-gray-900 font-medium">{user?.name || 'Not provided'}</span>
                  </div>
                )}
              </div>

              {/* Email Field */}
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-800">
                  Email Address
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={editData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-gray-900"
                    placeholder="Enter your email"
                  />
                ) : (
                  <div className="flex items-center p-4 bg-gray-50 rounded-lg border">
                    <EnvelopeIcon className="h-5 w-5 mr-3 text-blue-600" />
                    <span className="text-gray-900 font-medium">{user?.email || 'Not provided'}</span>
                  </div>
                )}
              </div>

              {/* Member Since */}
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-800">
                  Member Since
                </label>
                <div className="flex items-center p-4 bg-gray-50 rounded-lg border">
                  <CalendarIcon className="h-5 w-5 mr-3 text-blue-600" />
                  <span className="text-gray-900 font-medium">
                    {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    }) : 'Unknown'}
                  </span>
                </div>
              </div>

              {/* User ID */}
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-800">
                  User ID
                </label>
                <div className="p-4 bg-gray-50 rounded-lg border">
                  <span className="text-gray-900 font-mono text-sm bg-white px-3 py-1 rounded border">
                    {user?.id || 'Not available'}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            {isEditing && (
              <div className="mt-10 flex justify-end space-x-4">
                <button
                  onClick={handleCancel}
                  className="inline-flex items-center px-6 py-3 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                >
                  <XMarkIcon className="h-4 w-4 mr-2" />
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={isLoading}
                  className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Saving...
                    </>
                  ) : (
                    <>
                      <CheckIcon className="h-4 w-4 mr-2" />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Account Statistics */}
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="h-5 w-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Transactions</p>
                <p className="text-2xl font-semibold text-gray-900">{transactionCount}</p>
              </div>
            </div>
          </div>

          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Goals Set</p>
                <p className="text-2xl font-semibold text-gray-900">{goals ? goals.length : 0}</p>
              </div>
            </div>
          </div>

          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-8 w-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <svg className="h-5 w-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Forecasts</p>
                <p className="text-2xl font-semibold text-gray-900">0</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
