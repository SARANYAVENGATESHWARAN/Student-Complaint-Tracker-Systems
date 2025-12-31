import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Menu, X, User, LogOut, BookOpen, Bell, Moon, Sun, Search } from 'lucide-react';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // In a real app, you'd persist this to localStorage and apply to document
    document.documentElement.classList.toggle('dark');
  };

  const getNavLinks = () => {
    if (!isAuthenticated) {
      return [
        { to: '/', label: 'Home' },
        { to: '/about', label: 'About' },
        { to: '/features', label: 'Features' },
        { to: '/login', label: 'Login', isButton: true }
      ];
    }

    const baseLinks = [{ to: '/', label: 'Home' }];

    switch (user?.role) {
      case 'student':
        return [
          ...baseLinks,
          { to: '/student/submit-complaint', label: 'Submit Complaint' },
          { to: '/student/my-complaints', label: 'My Complaints' },
          { to: '/profile', label: 'Profile' }
        ];
      case 'faculty':
        return [
          ...baseLinks,
          { to: '/faculty/assigned-complaints', label: 'Assigned Complaints' },
          { to: '/profile', label: 'Profile' }
        ];
      case 'admin':
        return [
          ...baseLinks,
          { to: '/admin/manage-complaints', label: 'Manage Complaints' },
          { to: '/admin/manage-users', label: 'Manage Users' },
          { to: '/admin/reports', label: 'Reports' },
          { to: '/profile', label: 'Profile' }
        ];
      default:
        return baseLinks;
    }
  };

  const isActive = (path) => location.pathname === path;

  const navLinks = getNavLinks();

  const notifications = [
    { id: 1, message: 'New complaint assigned', time: '2 min ago', unread: true },
    { id: 2, message: 'Complaint #101 resolved', time: '1 hour ago', unread: false },
    { id: 3, message: 'System maintenance scheduled', time: '2 hours ago', unread: false }
  ];
  return (
    <nav className="bg-white dark:bg-gray-900 shadow-lg sticky top-0 z-50 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <BookOpen className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900 dark:text-white">EduTracker</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Search Bar */}
            {isAuthenticated && (
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search complaints..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm w-64 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                />
              </div>
            )}

            {/* Navigation Links */}
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`${
                  link.isButton
                    ? 'bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors'
                    : isActive(link.to)
                    ? 'text-blue-600 font-semibold border-b-2 border-blue-600 pb-1'
                    : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors'
                }`}
              >
                {link.label}
              </Link>
            ))}
            
            {isAuthenticated && (
              <div className="flex items-center space-x-3">
                {/* Dark Mode Toggle */}
                <button
                  onClick={toggleDarkMode}
                  className="p-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  title="Toggle dark mode"
                >
                  {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </button>

                {/* Notifications */}
                <div className="relative">
                  <button
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="p-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors relative"
                    title="Notifications"
                  >
                    <Bell className="h-5 w-5" />
                    {notifications.some(n => n.unread) && (
                      <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
                    )}
                  </button>

                  {showNotifications && (
                    <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
                      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                        <h3 className="font-semibold text-gray-900 dark:text-white">Notifications</h3>
                      </div>
                      <div className="max-h-64 overflow-y-auto">
                        {notifications.map((notification) => (
                          <div
                            key={notification.id}
                            className={`p-4 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 ${
                              notification.unread ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                            }`}
                          >
                            <p className="text-sm text-gray-900 dark:text-white">{notification.message}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{notification.time}</p>
                          </div>
                        ))}
                      </div>
                      <div className="p-4 text-center">
                        <button className="text-blue-600 dark:text-blue-400 text-sm hover:underline">
                          View all notifications
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* User Profile */}
                <div className="flex items-center space-x-2">
                  <img
                    src={user.profilePicture}
                    alt={user.name}
                    className="h-8 w-8 rounded-full object-cover"
                  />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {user.name}
                  </span>
                </div>

                {/* Logout */}
                <button
                  onClick={handleLogout}
                  className="text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors p-2"
                  title="Logout"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white p-2"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {/* Mobile Search */}
              {isAuthenticated && (
                <div className="px-3 py-2">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      placeholder="Search complaints..."
                      className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm w-full dark:bg-gray-800 dark:text-white"
                    />
                  </div>
                </div>
              )}

              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsMenuOpen(false)}
                  className={`${
                    link.isButton
                      ? 'bg-blue-600 text-white'
                      : isActive(link.to)
                      ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                  } block px-3 py-2 rounded-md text-base font-medium transition-colors`}
                >
                  {link.label}
                </Link>
              ))}
              
              {isAuthenticated && (
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
                  {/* Mobile Dark Mode Toggle */}
                  <button
                    onClick={toggleDarkMode}
                    className="flex items-center w-full text-left px-3 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md transition-colors"
                  >
                    {isDarkMode ? <Sun className="h-5 w-5 mr-2" /> : <Moon className="h-5 w-5 mr-2" />}
                    {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                  </button>

                  <div className="flex items-center px-3 py-2">
                    <img
                      src={user.profilePicture}
                      alt={user.name}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                    <div className="ml-3">
                      <div className="text-base font-medium text-gray-800 dark:text-gray-200">{user.name}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{user.email}</div>
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full text-left px-3 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors"
                  >
                    <LogOut className="h-5 w-5 mr-2" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;