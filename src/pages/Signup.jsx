import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  KeyRound, Eye, EyeOff, User, Store, AtSign, Phone, 
  ShoppingBag, Home, BriefcaseBusiness, ArrowRight, AlertTriangle 
} from 'lucide-react';
import { motion } from 'framer-motion';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
  });
  
  // Vendor-specific fields
  const [vendorData, setVendorData] = useState({
    shopName: '',
    businessType: '',
    address: '',
  });
  
  const [isVendor, setIsVendor] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleVendorChange = (e) => {
    const { name, value } = e.target;
    setVendorData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    try {
      setError('');
      setLoading(true);
      
      const userData = {
        ...formData,
        ...(isVendor && vendorData),
        role: isVendor ? 'vendor' : 'user',
      };
      
      // Remove confirmPassword as it's not needed for the API
      delete userData.confirmPassword;
      
      await signup(userData, isVendor);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Failed to create account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background patterns - visible in dark mode */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-purple-600/5 dark:bg-purple-600/10 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-indigo-600/5 dark:bg-indigo-600/10 blur-3xl"></div>
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
        <div className="w-full md:w-3/5 bg-white dark:bg-gray-800 p-8">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Create Your {isVendor ? 'Vendor' : 'Customer'} Account
            </h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Join ApnaBazaar and start {isVendor ? 'selling' : 'shopping'}
            </p>
          </div>
          
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-3 rounded-md mb-4 flex items-start"
            >
              <AlertTriangle className="h-5 w-5 mr-2 flex-shrink-0" />
              <span className="text-sm">{error}</span>
            </motion.div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Account Type Selection */}
            <div className="bg-gray-100 dark:bg-gray-700 p-1 rounded-xl flex mb-6">
              <button
                type="button"
                className={`flex-1 flex justify-center items-center py-3 px-4 rounded-lg text-sm font-medium transition ${
                  !isVendor 
                    ? 'bg-white dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 shadow' 
                    : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                }`}
                onClick={() => setIsVendor(false)}
              >
                <User className="w-5 h-5 mr-2" />
                Customer
              </button>
              <button
                type="button"
                className={`flex-1 flex justify-center items-center py-3 px-4 rounded-lg text-sm font-medium transition ${
                  isVendor 
                    ? 'bg-white dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 shadow' 
                    : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                }`}
                onClick={() => setIsVendor(true)}
              >
                <Store className="w-5 h-5 mr-2" />
                Vendor
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    className="appearance-none rounded-lg relative block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white dark:bg-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Full Name"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <AtSign className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="appearance-none rounded-lg relative block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white dark:bg-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Email Address"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Phone Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    className="appearance-none rounded-lg relative block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white dark:bg-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Phone Number"
                    required
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
                    value={formData.password}
                    onChange={handleChange}
                    className="appearance-none rounded-lg relative block w-full pl-10 pr-10 py-2 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white dark:bg-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Password"
                    required
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
              
              <div className={isVendor ? "md:col-span-2" : ""}>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <KeyRound className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="appearance-none rounded-lg relative block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white dark:bg-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Confirm Password"
                  />
                </div>
              </div>
            </div>
            
            {isVendor && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-5 pt-4 border-t border-gray-200 dark:border-gray-700 mt-4"
              >
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Vendor Information</h3>
                
                <div>
                  <label htmlFor="shopName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Shop Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <ShoppingBag className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="shopName"
                      name="shopName"
                      type="text"
                      value={vendorData.shopName}
                      onChange={handleVendorChange}
                      className="appearance-none rounded-lg relative block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white dark:bg-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Your Shop Name"
                      required={isVendor}
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="businessType" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Business Type
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <BriefcaseBusiness className="h-5 w-5 text-gray-400" />
                    </div>
                    <select
                      id="businessType"
                      name="businessType"
                      value={vendorData.businessType}
                      onChange={handleVendorChange}
                      className="appearance-none rounded-lg relative block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white dark:bg-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      required={isVendor}
                    >
                      <option value="">Select business type</option>
                      <option value="food">Food & Beverages</option>
                      <option value="grocery">Grocery</option>
                      <option value="clothing">Clothing & Apparel</option>
                      <option value="crafts">Crafts & Handmade</option>
                      <option value="produce">Fresh Produce</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Business Address
                  </label>
                  <div className="relative">
                    <div className="absolute top-3 left-3 pointer-events-none">
                      <Home className="h-5 w-5 text-gray-400" />
                    </div>
                    <textarea
                      id="address"
                      name="address"
                      value={vendorData.address}
                      onChange={handleVendorChange}
                      rows="3"
                      className="appearance-none rounded-lg relative block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white dark:bg-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Your Business Address"
                      required={isVendor}
                    ></textarea>
                  </div>
                </div>
              </motion.div>
            )}
            
            <div className="mt-8">
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? 'Creating account...' : 'Create account'}
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Already have an account?{' '}
                <Link to="/login" className="text-indigo-600 dark:text-indigo-400 hover:underline">
                  Log in
                </Link>
              </p>
            </div>
          </form>
        </div>
        
        {/* Right side - Image/Info */}
        <div className="hidden md:block md:w-2/5 bg-gradient-to-br from-indigo-500 to-purple-600 p-12 text-white relative">
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
                {isVendor ? 'Become a Vendor' : 'Join Our Community'}
              </h3>
              
              <div className="space-y-4">
                {isVendor ? (
                  <>
                    <p className="flex items-start">
                      <Store className="w-5 h-5 mr-2 mt-0.5" />
                      <span>Set up your own digital shop</span>
                    </p>
                    <p className="flex items-start">
                      <ShoppingBag className="w-5 h-5 mr-2 mt-0.5" />
                      <span>Reach more customers in your area</span>
                    </p>
                    <p className="flex items-start">
                      <BriefcaseBusiness className="w-5 h-5 mr-2 mt-0.5" />
                      <span>Grow your local business</span>
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
                      <span>Create your profile</span>
                    </p>
                    <p className="flex items-start">
                      <Home className="w-5 h-5 mr-2 mt-0.5" />
                      <span>Support local businesses</span>
                    </p>
                  </>
                )}
              </div>
            </div>
            
            <div className="mt-auto">
              <div className="p-4 bg-white/10 rounded-lg backdrop-blur-sm">
                <p className="text-sm opacity-90">
                  {isVendor 
                    ? "Join thousands of vendors already growing their business with ApnaBazaar" 
                    : "Join thousands of customers shopping locally with ApnaBazaar"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup; 