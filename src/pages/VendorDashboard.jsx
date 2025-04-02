import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  BarChart3, Package, ShoppingBag, Users, TrendingUp, Settings, 
  PlusCircle, Truck, Calendar, DollarSign 
} from 'lucide-react';

// Dashboard Views
import DashboardOverview from '../components/vendor/DashboardOverview';
import ProductsManager from '../components/vendor/ProductsManager';
import OrdersManager from '../components/vendor/OrdersManager';
import CustomersView from '../components/vendor/CustomersView';
import AnalyticsView from '../components/vendor/AnalyticsView';
import ShopSettings from '../components/vendor/ShopSettings';
import AddProduct from '../components/vendor/AddProduct';

const VendorDashboard = () => {
  const { currentUser, isVendor, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate();

  // Redirect if not authenticated or not a vendor
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    } else if (!isVendor) {
      navigate('/');
    }
  }, [isAuthenticated, isVendor, navigate]);

  // Sample data for the welcome card
  const shopData = {
    totalSales: "₹12,450",
    ordersToday: 8,
    visitorsToday: 143,
    pendingOrders: 3
  };

  // Render the active dashboard component
  const renderDashboardView = () => {
    switch (activeTab) {
      case 'overview':
        return <DashboardOverview shopData={shopData} />;
      case 'products':
        return <ProductsManager />;
      case 'orders':
        return <OrdersManager />;
      case 'customers':
        return <CustomersView />;
      case 'analytics':
        return <AnalyticsView />;
      case 'settings':
        return <ShopSettings />;
      case 'add-product':
        return <AddProduct />;
      default:
        return <DashboardOverview shopData={shopData} />;
    }
  };

  if (!isAuthenticated || !isVendor) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar Navigation */}
      <div className="w-full md:w-64 bg-white dark:bg-gray-800 shadow-md md:min-h-screen">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="font-bold text-xl text-gray-800 dark:text-white">
            {currentUser?.shopName || "Vendor Dashboard"}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {currentUser?.name}
          </p>
        </div>
        <nav className="p-2">
          <ul className="space-y-1">
            <li>
              <button
                onClick={() => setActiveTab('overview')}
                className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
                  activeTab === 'overview' 
                    ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400' 
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <BarChart3 className="w-5 h-5 mr-3" />
                <span>Overview</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('products')}
                className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
                  activeTab === 'products' 
                    ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400' 
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <Package className="w-5 h-5 mr-3" />
                <span>Products</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('add-product')}
                className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
                  activeTab === 'add-product' 
                    ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400' 
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <PlusCircle className="w-5 h-5 mr-3" />
                <span>Add Product</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('orders')}
                className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
                  activeTab === 'orders' 
                    ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400' 
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <ShoppingBag className="w-5 h-5 mr-3" />
                <span>Orders</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('customers')}
                className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
                  activeTab === 'customers' 
                    ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400' 
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <Users className="w-5 h-5 mr-3" />
                <span>Customers</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('analytics')}
                className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
                  activeTab === 'analytics' 
                    ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400' 
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <TrendingUp className="w-5 h-5 mr-3" />
                <span>Analytics</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('settings')}
                className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
                  activeTab === 'settings' 
                    ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400' 
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <Settings className="w-5 h-5 mr-3" />
                <span>Shop Settings</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {renderDashboardView()}
      </div>
    </div>
  );
};

export default VendorDashboard; 