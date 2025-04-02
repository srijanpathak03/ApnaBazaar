import React from 'react';
import { 
  DollarSign, Users, ShoppingBag, TrendingUp, 
  Package, ArrowRight, Clock, Bell 
} from 'lucide-react';
import { motion } from 'framer-motion';

const DashboardOverview = ({ shopData }) => {
  // Mock data for recent orders
  const recentOrders = [
    { id: 'ORD-1234', customer: 'Rahul Sharma', amount: '₹1,200', status: 'delivered', date: '2 hours ago' },
    { id: 'ORD-1233', customer: 'Priya Patel', amount: '₹850', status: 'processing', date: '5 hours ago' },
    { id: 'ORD-1232', customer: 'Amit Kumar', amount: '₹3,450', status: 'pending', date: '1 day ago' },
    { id: 'ORD-1231', customer: 'Neha Singh', amount: '₹1,675', status: 'delivered', date: '2 days ago' },
  ];

  // Mock data for notifications
  const notifications = [
    { id: 1, message: 'New order received (#ORD-1234)', time: '30 minutes ago' },
    { id: 2, message: 'Low stock alert: Organic Apples (3 remaining)', time: '2 hours ago' },
    { id: 3, message: 'Customer review: 5 stars for Fresh Mangoes', time: '5 hours ago' },
    { id: 4, message: 'Weekly report is ready to view', time: '1 day ago' },
  ];

  // Mock data for top selling products
  const topProducts = [
    { id: 1, name: 'Organic Apples', sold: 48, revenue: '₹4,800', trend: '+12%' },
    { id: 2, name: 'Fresh Mangoes', sold: 36, revenue: '₹3,600', trend: '+8%' },
    { id: 3, name: 'Handmade Cloth Bags', sold: 24, revenue: '₹2,400', trend: '+5%' },
    { id: 4, name: 'Spice Set', sold: 18, revenue: '₹1,800', trend: '-3%' },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Welcome Card */}
      <motion.div 
        variants={itemVariants}
        className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl shadow-lg p-6 text-white"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h2 className="text-2xl font-bold mb-2">Welcome back, {shopData.shopName || "Vendor"}!</h2>
            <p className="mb-4 opacity-90">Here's what's happening with your shop today.</p>
          </div>
          <div className="mt-4 md:mt-0">
            <button className="px-4 py-2 bg-white text-indigo-600 rounded-lg font-medium">
              View Reports
            </button>
          </div>
        </div>
      </motion.div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div 
          variants={itemVariants}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Today's Sales</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{shopData.totalSales}</h3>
              <p className="text-xs text-green-600 mt-1">+8% from yesterday</p>
            </div>
            <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-full">
              <DollarSign className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            </div>
          </div>
        </motion.div>

        <motion.div 
          variants={itemVariants}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Today's Orders</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{shopData.ordersToday}</h3>
              <p className="text-xs text-green-600 mt-1">+12% from yesterday</p>
            </div>
            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full">
              <ShoppingBag className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </motion.div>

        <motion.div 
          variants={itemVariants}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Shop Visitors</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{shopData.visitorsToday}</h3>
              <p className="text-xs text-green-600 mt-1">+5% from yesterday</p>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full">
              <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </motion.div>

        <motion.div 
          variants={itemVariants}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Pending Orders</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{shopData.pendingOrders}</h3>
              <p className="text-xs text-yellow-600 mt-1">Needs attention</p>
            </div>
            <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-full">
              <Clock className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Two Column Layout for Orders and Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <motion.div 
          variants={itemVariants}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden"
        >
          <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Orders</h3>
            <button className="text-sm text-indigo-600 dark:text-indigo-400 flex items-center">
              View All <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          </div>
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {recentOrders.map(order => (
              <div key={order.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">{order.id}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{order.customer}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900 dark:text-white">{order.amount}</p>
                    <p className="text-sm">
                      <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                        order.status === 'delivered' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                        order.status === 'processing' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' :
                        'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                      }`}>
                        {order.status}
                      </span>
                    </p>
                  </div>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{order.date}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Top Products */}
        <motion.div 
          variants={itemVariants}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden"
        >
          <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Top Selling Products</h3>
            <button className="text-sm text-indigo-600 dark:text-indigo-400 flex items-center">
              View All <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          </div>
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {topProducts.map(product => (
              <div key={product.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-md flex items-center justify-center mr-3">
                      <Package className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{product.name}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{product.sold} units sold</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900 dark:text-white">{product.revenue}</p>
                    <p className={`text-sm ${
                      product.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {product.trend}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Notifications */}
      <motion.div 
        variants={itemVariants}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden"
      >
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Notifications</h3>
          <button className="text-sm text-indigo-600 dark:text-indigo-400">Mark all as read</button>
        </div>
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {notifications.map(notification => (
            <div key={notification.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <div className="flex items-start">
                <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-full mr-3">
                  <Bell className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{notification.message}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{notification.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DashboardOverview; 