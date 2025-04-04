import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Eye, EyeOff, AtSign, KeyRound, ShoppingBag, AlertTriangle, 
  User, Store, ArrowRight
} from 'lucide-react';
import { motion } from 'framer-motion';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isVendor, setIsVendor] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { login, isAuthenticated, userError } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get redirect path from URL query parameter
  const redirectPath = new URLSearchParams(location.search).get('redirect') || '/';
  
  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      navigate(redirectPath);
    }
  }, [isAuthenticated, navigate, redirectPath]);
  
  // Update error message when auth context error changes
  useEffect(() => {
    if (userError) {
      setErrorMessage(userError);
    }
  }, [userError]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    
    if (!email || !password) {
      setErrorMessage('Please enter both email and password');
      return;
    }
    
    try {
      setIsSubmitting(true);
      await login(email, password, isVendor);
      // Will redirect via the useEffect above when isAuthenticated changes
    } catch (error) {
      console.error('Login error:', error);
      // Error is already set via the auth context
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const toggleVendorMode = () => {
    setIsVendor(!isVendor);
    setErrorMessage(''); // Clear any errors when switching modes
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background patterns - visible in dark mode */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-purple-600/5 dark:bg-purple-600/10 blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-indigo-600/5 dark:bg-indigo-600/10 blur-3xl"></div>
        <svg className="absolute top-0 left-0 w-full h-full text-gray-200 dark:text-gray-800/20 opacity-30" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="grid" width="8" height="8" patternUnits="userSpaceOnUse">
              <path d="M 8 0 L 0 0 0 8" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      
      <div className="max-w-5xl w-full mx-auto flex rounded-2xl shadow-xl overflow-hidden relative z-10">
        {/* Left side - Form */}
        <div className="w-full md:w-1/2 bg-white dark:bg-gray-800 p-8 md:p-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
              {isVendor ? 'Vendor Login' : 'Sign in to your account'}
            </h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Or{' '}
              <Link to="/signup" className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">
                create a new account
              </Link>
            </p>
          </div>
          
          {/* Account type toggle */}
          <div className="flex justify-center mb-8">
            <div className="bg-gray-100 dark:bg-gray-700 p-1 rounded-xl flex w-full max-w-xs">
              <button
                type="button"
                onClick={() => setIsVendor(false)}
                className={`flex-1 flex items-center justify-center py-2 px-4 rounded-lg text-sm font-medium transition ${
                  !isVendor
                    ? 'bg-white dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 shadow-sm'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100'
                }`}
              >
                <User className="w-4 h-4 mr-2" />
                Customer
              </button>
              <button
                type="button"
                onClick={() => setIsVendor(true)}
                className={`flex-1 flex items-center justify-center py-2 px-4 rounded-lg text-sm font-medium transition ${
                  isVendor
                    ? 'bg-white dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 shadow-sm'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100'
                }`}
              >
                <Store className="w-4 h-4 mr-2" />
                Vendor
              </button>
            </div>
          </div>
          
          {errorMessage && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 p-3 rounded-md flex items-start mb-6"
            >
              <AlertTriangle className="h-5 w-5 mr-2 flex-shrink-0" />
              <span className="text-sm">{errorMessage}</span>
            </motion.div>
          )}
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="email-address" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <AtSign className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="appearance-none rounded-lg relative block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 text-gray-900 dark:text-white dark:bg-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Email address"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <KeyRound className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="appearance-none rounded-lg relative block w-full pl-10 pr-10 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 text-gray-900 dark:text-white dark:bg-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Password"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
                  Remember me
                </label>
              </div>
              
              <div className="text-sm">
                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">
                  Forgot password?
                </a>
              </div>
            </div>
            
            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting ? 'Signing in...' : 'Sign in'}
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </form>
        </div>
        
        {/* Right side - Image/Info */}
        <div className="hidden md:block md:w-1/2 bg-gradient-to-br from-indigo-500 to-purple-600 p-12 text-white relative">
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <pattern id="small-grid" width="10" height="10" patternUnits="userSpaceOnUse">
                  <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#small-grid)" />
            </svg>
          </div>
          
          <div className="relative z-10 h-full flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-bold mb-6">
                {isVendor ? 'Vendor Portal' : 'Welcome to ApnaBazaar'}
              </h3>
              
              <div className="space-y-4">
                {isVendor ? (
                  <>
                    <p className="flex items-start">
                      <ShoppingBag className="w-5 h-5 mr-2 mt-0.5" />
                      <span>Manage your marketplace shop</span>
                    </p>
                    <p className="flex items-start">
                      <Store className="w-5 h-5 mr-2 mt-0.5" />
                      <span>Access vendor-specific tools</span>
                    </p>
                  </>
                ) : (
                  <>
                    <p className="flex items-start">
                      <ShoppingBag className="w-5 h-5 mr-2 mt-0.5" />
                      <span>Shop from local vendors</span>
                    </p>
                    <p className="flex items-start">
                      <User className="w-5 h-5 mr-2 mt-0.5" />
                      <span>Personalized shopping experience</span>
                    </p>
                  </>
                )}
              </div>
            </div>
            
            <div className="mt-auto">
              <svg className="w-24 h-24 opacity-20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9 22V12H15V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login; 