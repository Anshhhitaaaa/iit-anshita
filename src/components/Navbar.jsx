import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bars3Icon, XMarkIcon, BellIcon, UserIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../contexts/AuthContext';
import logo from '../assets/logo.png';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, message: '⚠️ You overspent ₹1,200 on shopping this week.', read: false },
    { id: 2, message: '✅ Great job! You saved 20% more than last month.', read: false },
  ]);
  const [showNotifications, setShowNotifications] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (showNotifications) setShowNotifications(false);
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    if (isOpen) setIsOpen(false);
  };

  const markAsRead = (id) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <nav className="bg-indigo-600 shadow-lg w-full fixed top-0 z-50">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-white font-bold text-lg sm:text-xl flex items-center">
                <img src={logo} alt="Logo" className="h-8 w-8 mr-2" />
                Smart Budget
              </Link>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            {/* Show authenticated user links */}
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="text-white hover:bg-indigo-500 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Dashboard</Link>
                <Link to="/add-transaction" className="text-white hover:bg-indigo-500 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Add Transaction</Link>
                <Link to="/forecast" className="text-white hover:bg-indigo-500 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Forecast</Link>
                <Link to="/goals" className="text-white hover:bg-indigo-500 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Goals</Link>
                <Link to="/contact" className="text-white hover:bg-indigo-500 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Contact</Link>
                
                {/* Notification Bell - only for authenticated users */}
                <div className="relative">
                  <button 
                    onClick={toggleNotifications}
                    className="text-white hover:bg-indigo-500 p-1 rounded-full focus:outline-none"
                  >
                    <BellIcon className="h-6 w-6" />
                    {unreadCount > 0 && (
                      <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-indigo-600"></span>
                    )}
                  </button>
                  
                  {/* Notification Dropdown */}
                  {showNotifications && (
                    <div className="origin-top-right absolute right-0 mt-2 w-80 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                      <div className="py-1">
                        <div className="px-4 py-2 border-b border-gray-200">
                          <p className="text-sm font-medium text-gray-700">Notifications</p>
                        </div>
                        {notifications.length > 0 ? (
                          notifications.map((notification) => (
                            <div 
                              key={notification.id}
                              className={`px-4 py-3 hover:bg-gray-100 ${!notification.read ? 'bg-blue-50' : ''}`}
                              onClick={() => markAsRead(notification.id)}
                            >
                              <p className="text-sm text-gray-700">{notification.message}</p>
                            </div>
                          ))
                        ) : (
                          <div className="px-4 py-3">
                            <p className="text-sm text-gray-500">No notifications</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
                
                {/* User menu */}
                <div className="relative">
                  <div className="flex items-center space-x-2">
                    <Link 
                      to="/profile" 
                      className="flex items-center space-x-2 text-white hover:bg-indigo-500 px-3 py-2 rounded-md text-sm font-medium"
                    >
                      <UserIcon className="h-5 w-5" />
                      <span>{user?.name}</span>
                    </Link>
                    <button 
                      onClick={logout}
                      className="bg-white text-indigo-600 hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link to="/about" className="text-white hover:bg-indigo-500 hover:text-white px-3 py-2 rounded-md text-sm font-medium">About</Link>
                <Link to="/contact" className="text-white hover:bg-indigo-500 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Contact</Link>
                <Link to="/login" className="text-white hover:bg-indigo-500 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Login</Link>
                <Link to="/signup" className="bg-white text-indigo-600 hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium">Sign Up</Link>
              </>
            )}
          </div>
          
          <div className="-mr-1 sm:-mr-2 flex md:hidden">
            {/* Mobile Notification Bell - only for authenticated users */}
            {isAuthenticated && (
              <div className="relative mr-1 sm:mr-2 flex items-center">
                <button 
                  onClick={toggleNotifications}
                  className="text-white hover:bg-indigo-500 p-1 rounded-full focus:outline-none"
                >
                  <BellIcon className="h-5 w-5 sm:h-6 sm:w-6" />
                  {unreadCount > 0 && (
                    <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-indigo-600"></span>
                  )}
                </button>
              </div>
            )}
            
            {/* Mobile menu button */}
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-1.5 sm:p-2 rounded-md text-white hover:text-white hover:bg-indigo-500 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <XMarkIcon className="block h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
              ) : (
                <Bars3Icon className="block h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-0.5 sm:space-y-1 sm:px-3">
            {/* Show authenticated user links */}
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="text-white hover:bg-indigo-500 block px-2 py-1.5 sm:px-3 sm:py-2 rounded-md text-sm sm:text-base font-medium">Dashboard</Link>
                <Link to="/add-transaction" className="text-white hover:bg-indigo-500 block px-2 py-1.5 sm:px-3 sm:py-2 rounded-md text-sm sm:text-base font-medium">Add Transaction</Link>
                <Link to="/forecast" className="text-white hover:bg-indigo-500 block px-2 py-1.5 sm:px-3 sm:py-2 rounded-md text-sm sm:text-base font-medium">Forecast</Link>
                <Link to="/goals" className="text-white hover:bg-indigo-500 block px-2 py-1.5 sm:px-3 sm:py-2 rounded-md text-sm sm:text-base font-medium">Goals</Link>
                <Link to="/contact" className="text-white hover:bg-indigo-500 block px-2 py-1.5 sm:px-3 sm:py-2 rounded-md text-sm sm:text-base font-medium">Contact</Link>
                <div className="border-t border-indigo-400 pt-2 mt-2">
                  <Link 
                    to="/profile" 
                    className="flex items-center space-x-2 px-2 py-1.5 sm:px-3 sm:py-2 text-white hover:bg-indigo-500 rounded-md"
                  >
                    <UserIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                    <span className="text-sm sm:text-base">{user?.name}</span>
                  </Link>
                  <button 
                    onClick={logout}
                    className="bg-white text-indigo-600 hover:bg-gray-100 block w-full text-left px-2 py-1.5 sm:px-3 sm:py-2 rounded-md text-sm sm:text-base font-medium mt-1 sm:mt-2"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link to="/about" className="text-white hover:bg-indigo-500 block px-2 py-1.5 sm:px-3 sm:py-2 rounded-md text-sm sm:text-base font-medium">About</Link>
                <Link to="/contact" className="text-white hover:bg-indigo-500 block px-2 py-1.5 sm:px-3 sm:py-2 rounded-md text-sm sm:text-base font-medium">Contact</Link>
                <Link to="/login" className="text-white hover:bg-indigo-500 block px-2 py-1.5 sm:px-3 sm:py-2 rounded-md text-sm sm:text-base font-medium">Login</Link>
                <Link to="/signup" className="bg-white text-indigo-600 hover:bg-gray-100 block px-2 py-1.5 sm:px-3 sm:py-2 rounded-md text-sm sm:text-base font-medium mt-1 sm:mt-2">Sign Up</Link>
              </>
            )}
          </div>
        </div>
      )}
      
      {/* Mobile Notification Dropdown */}
      {showNotifications && (
        <div className="md:hidden px-2 pt-2 pb-3 bg-white shadow-lg z-10">
          <div className="px-3 sm:px-4 py-1.5 sm:py-2 border-b border-gray-200">
            <p className="text-xs sm:text-sm font-medium text-gray-700">Notifications</p>
          </div>
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <div 
                key={notification.id}
                className={`px-4 py-3 hover:bg-gray-100 ${!notification.read ? 'bg-blue-50' : ''}`}
                onClick={() => markAsRead(notification.id)}
              >
                <p className="text-sm text-gray-700">{notification.message}</p>
              </div>
            ))
          ) : (
            <div className="px-4 py-3">
              <p className="text-sm text-gray-500">No notifications</p>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;