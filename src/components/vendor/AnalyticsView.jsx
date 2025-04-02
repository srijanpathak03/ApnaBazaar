import React, { useState } from 'react';
import { 
  BarChart3, LineChart, DollarSign, ShoppingBag, 
  Users, ArrowRight, ArrowUp, ArrowDown
} from 'lucide-react';
import { motion } from 'framer-motion';

const AnalyticsView = () => {
  const [timeRange, setTimeRange] = useState('week');
  
  // Mock analytics data
  const analyticsData = {
    sales: {
      total: '₹48,250',
      change: '+12.5%',
      increasing: true
    },
    orders: {
      total: 125,
      change: '+8.3%',
      increasing: true
    },
    customers: {
      total: 45,
      change: '+5.1%',
      increasing: true
    },
    avgOrderValue: {
      total: '₹386',
      change: '-2.4%',
      increasing: false
    }
  };
  
  // Mock chart data (would typically be generated from real data)
  const salesChartPlaceholder = 'https://via.placeholder.com/800x300?text=Sales+Chart';
  const productsChartPlaceholder = 'https://via.placeholder.com/400x300?text=Top+Products';
  const categoryChartPlaceholder = 'https://via.placeholder.com/400x300?text=Categories';
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Analytics & Insights</h1>
        
        <div className="inline-flex items-center rounded-md shadow-sm" role="group">
          <button
            onClick={() => setTimeRange('week')}
            className={`px-4 py-2 text-sm font-medium border ${
              timeRange === 'week' 
                ? 'bg-indigo-600 text-white border-indigo-600' 
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
            } rounded-l-lg`}
          >
            Week
          </button>
          <button
            onClick={() => setTimeRange('month')}
            className={`px-4 py-2 text-sm font-medium border-t border-b ${
              timeRange === 'month' 
                ? 'bg-indigo-600 text-white border-indigo-600' 
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            Month
          </button>
          <button
            onClick={() => setTimeRange('quarter')}
            className={`px-4 py-2 text-sm font-medium border ${
              timeRange === 'quarter' 
                ? 'bg-indigo-600 text-white border-indigo-600' 
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            Quarter
          </button>
          <button
            onClick={() => setTimeRange('year')}
            className={`px-4 py-2 text-sm font-medium border ${
              timeRange === 'year' 
                ? 'bg-indigo-600 text-white border-indigo-600' 
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
            } rounded-r-lg`}
          >
            Year
          </button>
        </div>
      </div>
      
      {/* Key metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Sales</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{analyticsData.sales.total}</h3>
              <p className={`text-xs flex items-center mt-1 ${
                analyticsData.sales.increasing 
                  ? 'text-green-600 dark:text-green-400' 
                  : 'text-red-600 dark:text-red-400'
              }`}>
                {analyticsData.sales.increasing ? <ArrowUp className="w-3 h-3 mr-1" /> : <ArrowDown className="w-3 h-3 mr-1" />}
                {analyticsData.sales.change} from previous {timeRange}
              </p>
            </div>
            <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-full">
              <DollarSign className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Orders</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{analyticsData.orders.total}</h3>
              <p className={`text-xs flex items-center mt-1 ${
                analyticsData.orders.increasing 
                  ? 'text-green-600 dark:text-green-400' 
                  : 'text-red-600 dark:text-red-400'
              }`}>
                {analyticsData.orders.increasing ? <ArrowUp className="w-3 h-3 mr-1" /> : <ArrowDown className="w-3 h-3 mr-1" />}
                {analyticsData.orders.change} from previous {timeRange}
              </p>
            </div>
            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full">
              <ShoppingBag className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">New Customers</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{analyticsData.customers.total}</h3>
              <p className={`text-xs flex items-center mt-1 ${
                analyticsData.customers.increasing 
                  ? 'text-green-600 dark:text-green-400' 
                  : 'text-red-600 dark:text-red-400'
              }`}>
                {analyticsData.customers.increasing ? <ArrowUp className="w-3 h-3 mr-1" /> : <ArrowDown className="w-3 h-3 mr-1" />}
                {analyticsData.customers.change} from previous {timeRange}
              </p>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full">
              <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Avg Order Value</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{analyticsData.avgOrderValue.total}</h3>
              <p className={`text-xs flex items-center mt-1 ${
                analyticsData.avgOrderValue.increasing 
                  ? 'text-green-600 dark:text-green-400' 
                  : 'text-red-600 dark:text-red-400'
              }`}>
                {analyticsData.avgOrderValue.increasing ? <ArrowUp className="w-3 h-3 mr-1" /> : <ArrowDown className="w-3 h-3 mr-1" />}
                {analyticsData.avgOrderValue.change} from previous {timeRange}
              </p>
            </div>
            <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full">
              <BarChart3 className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Sales chart */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Sales Overview
          </h3>
          <button className="text-sm text-indigo-600 dark:text-indigo-400 flex items-center">
            Detailed Report <ArrowRight className="w-4 h-4 ml-1" />
          </button>
        </div>
        <div className="p-6">
          <img 
            src={salesChartPlaceholder} 
            alt="Sales Chart" 
            className="w-full h-auto rounded-lg border border-gray-200 dark:border-gray-700"
          />
        </div>
      </div>
      
      {/* Two column charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Top Selling Products
            </h3>
          </div>
          <div className="p-6">
            <img 
              src={productsChartPlaceholder} 
              alt="Top Products Chart" 
              className="w-full h-auto rounded-lg border border-gray-200 dark:border-gray-700"
            />
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Sales by Category
            </h3>
          </div>
          <div className="p-6">
            <img 
              src={categoryChartPlaceholder} 
              alt="Categories Chart" 
              className="w-full h-auto rounded-lg border border-gray-200 dark:border-gray-700"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AnalyticsView; 