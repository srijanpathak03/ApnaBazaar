import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, LogOut, Store } from 'lucide-react';

const NavbarAuthButtons = () => {
  const { currentUser, logout, isVendor } = useAuth();
  const navigate = useNavigate();

  if (currentUser) {
    return (
      <div className="relative group">
        <button className="flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400">
          <span className="hidden md:inline-block font-medium">
            {currentUser.name || 'Account'}
          </span>
          <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
            <User className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          </div>
        </button>
        
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
          <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
            <p className="text-sm font-medium text-gray-900 dark:text-white">{currentUser.name}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{currentUser.email}</p>
            {isVendor && (
              <span className="inline-block mt-1 text-xs bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-300 px-2 py-0.5 rounded-full">
                Vendor
              </span>
            )}
          </div>
          
          {isVendor && (
            <Link to="/vendor/dashboard" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center">
              <Store className="w-4 h-4 mr-2 text-indigo-600 dark:text-indigo-400" />
              Vendor Dashboard
            </Link>
          )}
          
          <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
            Your Profile
          </Link>
          
          <Link to="/orders" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
            Your Orders
          </Link>
          
          <button 
            onClick={() => {
              logout();
              navigate('/');
            }}
            className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Log Out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-2">
      <Link
        to="/login"
        className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
      >
        Log In
      </Link>
      <Link
        to="/signup"
        className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition-colors"
      >
        Sign Up
      </Link>
    </div>
  );
};

export default NavbarAuthButtons; 