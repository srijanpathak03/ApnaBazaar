import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  User, 
  Store, 
  MapPin, 
  Phone, 
  Mail, 
  Calendar, 
  Edit, 
  Save, 
  Camera, 
  Loader, 
  Star, 
  ExternalLink, 
  Settings, 
  Package, 
  BarChart3,
  ShoppingBag
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const VendorProfile = () => {
  const { currentUser, userLoading, isAuthenticated, isVendor } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    profileImage: null,
    shopName: '',
    name: '',
    email: '',
    phone: '',
    businessType: 'food',
    address: '',
    description: ''
  });

  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [shopStats, setShopStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalCustomers: 0,
    averageRating: 0,
    reviewCount: 0
  });
  const [recentActivities, setRecentActivities] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevData) => ({
          ...prevData,
          profileImage: {
            url: reader.result,
            file: file
          }
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      // Handle form submission
      setSuccessMessage('Changes saved successfully!');
    } catch (error) {
      console.error('Error saving changes:', error);
      setSuccessMessage('Failed to save changes. Please try again later.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Vendor Info */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
            <div className="relative h-40 bg-gradient-to-r from-indigo-500 to-purple-600">
              <div className="absolute -bottom-12 left-6">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full border-4 border-white dark:border-gray-800 bg-gray-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
                    {formData.profileImage ? (
                      <img 
                        src={formData.profileImage.url} 
                        alt="Profile" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Store className="w-12 h-12 text-gray-400" />
                    )}
                  </div>
                  
                  {isEditing && (
                    <label className="absolute bottom-0 right-0 p-1 bg-indigo-600 rounded-full cursor-pointer">
                      <Camera className="w-4 h-4 text-white" />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleProfileImageChange}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
              </div>
              
              <div className="absolute top-4 right-4">
                {isEditing ? (
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-3 py-1 bg-white text-gray-700 text-sm rounded-md shadow-sm hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-3 py-1 flex items-center bg-white text-gray-700 text-sm rounded-md shadow-sm hover:bg-gray-50"
                  >
                    <Edit className="w-3 h-3 mr-1" />
                    Edit
                  </button>
                )}
              </div>
            </div>
            
            <div className="pt-16 pb-6 px-6">
              {successMessage && (
                <div className="mb-4 p-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-sm rounded-md">
                  {successMessage}
                </div>
              )}
              
              {isEditing ? (
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Shop Name
                      </label>
                      <input
                        type="text"
                        name="shopName"
                        value={formData.shopName}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Phone
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Business Type
                      </label>
                      <select
                        name="businessType"
                        value={formData.businessType}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                      >
                        <option value="food">Food & Beverages</option>
                        <option value="grocery">Grocery</option>
                        <option value="clothing">Clothing & Apparel</option>
                        <option value="crafts">Crafts & Handmade</option>
                        <option value="produce">Fresh Produce</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Address
                      </label>
                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        rows="3"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                      ></textarea>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Shop Description
                      </label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows="5"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                      ></textarea>
                    </div>
                    
                    <button
                      type="submit"
                      disabled={saving}
                      className="w-full flex justify-center items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {saving ? (
                        <>
                          <Loader className="w-4 h-4 mr-2 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4 mr-2" />
                          Save Changes
                        </>
                      )}
                    </button>
                  </div>
                </form>
              ) : (
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{formData.shopName}</h1>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Managed by {formData.name}</p>
                  
                  <div className="mt-3 flex items-center">
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <Star
                          key={rating}
                          className={`w-4 h-4 ${
                            rating <= shopStats.averageRating
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300 dark:text-gray-600'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="ml-1 text-sm text-gray-500 dark:text-gray-400">
                      ({shopStats.averageRating}) • {shopStats.reviewCount} reviews
                    </span>
                  </div>
                  
                  <div className="mt-6 space-y-3">
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <Mail className="w-4 h-4 mr-2 text-gray-400" />
                      {formData.email}
                    </div>
                    
                    {formData.phone && (
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <Phone className="w-4 h-4 mr-2 text-gray-400" />
                        {formData.phone}
                      </div>
                    )}
                    
                    {formData.address && (
                      <div className="flex items-start text-sm text-gray-500 dark:text-gray-400">
                        <MapPin className="w-4 h-4 mr-2 mt-1 text-gray-400" />
                        <span>{formData.address}</span>
                      </div>
                    )}
                    
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                      Member since {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    </div>
                    
                    <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-700">
                      <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Shop Description</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {formData.description}
                      </p>
                    </div>
                    
                    <button
                      onClick={() => navigate('/vendor/dashboard')}
                      className="mt-4 w-full flex justify-center items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      <Store className="w-4 h-4 mr-2" />
                      Go to Dashboard
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Stats Section */}
          <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Shop Statistics</h2>
            </div>
            
            <div className="p-6 grid grid-cols-2 gap-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{shopStats.totalProducts}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Products</p>
              </div>
              
              <div className="text-center">
                <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{shopStats.totalOrders}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Orders</p>
              </div>
              
              <div className="text-center">
                <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{shopStats.totalCustomers}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Customers</p>
              </div>
              
              <div className="text-center">
                <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{shopStats.reviewCount}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Reviews</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right Column - Activities & More */}
        <div className="lg:col-span-2">
          {/* Recent Activities */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Activities</h2>
            </div>
            
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <div className="flex space-x-3">
                    <div className={`p-2 rounded-full ${
                      activity.type === 'order' 
                        ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400' 
                        : activity.type === 'review'
                        ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400'
                        : 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                    }`}>
                      {activity.type === 'order' && <ShoppingBag className="w-5 h-5" />}
                      {activity.type === 'review' && <Star className="w-5 h-5" />}
                      {activity.type === 'inventory' && <Package className="w-5 h-5" />}
                    </div>
                    <div>
                      <p className="text-sm text-gray-900 dark:text-white">{activity.message}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{activity.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Shop Performance */}
          <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Shop Performance</h2>
              <select className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md text-sm bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                <option value="7days">Last 7 days</option>
                <option value="30days">Last 30 days</option>
                <option value="3months">Last 3 months</option>
                <option value="year">This year</option>
              </select>
            </div>
            
            <div className="p-6">
              <div className="h-64 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <BarChart3 className="w-12 h-12 mx-auto text-gray-400 mb-3" />
                  <p className="text-gray-600 dark:text-gray-300">Performance chart will appear here</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Complete at least 10 orders to see detailed analytics</p>
                </div>
              </div>
              
              <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Revenue</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">₹15,450</p>
                  <p className="text-xs text-green-600 mt-1">+12% from last period</p>
                </div>
                
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Orders</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">32</p>
                  <p className="text-xs text-green-600 mt-1">+8% from last period</p>
                </div>
                
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Visits</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">342</p>
                  <p className="text-xs text-green-600 mt-1">+15% from last period</p>
                </div>
                
                <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Conversion</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">9.4%</p>
                  <p className="text-xs text-green-600 mt-1">+2% from last period</p>
                </div>
              </div>
              
              <div className="mt-6 flex justify-center">
                <button
                  onClick={() => navigate('/vendor/dashboard/analytics')}
                  className="inline-flex items-center text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                >
                  <span className="font-medium">View Full Analytics</span>
                  <ExternalLink className="w-4 h-4 ml-1" />
                </button>
              </div>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <button
              onClick={() => navigate('/vendor/dashboard/products')}
              className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-shadow flex flex-col items-center justify-center"
            >
              <Package className="w-8 h-8 text-indigo-600 dark:text-indigo-400 mb-2" />
              <span className="font-medium text-gray-900 dark:text-white">Manage Products</span>
            </button>
            
            <button
              onClick={() => navigate('/vendor/dashboard/orders')}
              className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-shadow flex flex-col items-center justify-center"
            >
              <ShoppingBag className="w-8 h-8 text-indigo-600 dark:text-indigo-400 mb-2" />
              <span className="font-medium text-gray-900 dark:text-white">Manage Orders</span>
            </button>
            
            <button
              onClick={() => navigate('/vendor/dashboard/settings')}
              className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-shadow flex flex-col items-center justify-center"
            >
              <Settings className="w-8 h-8 text-indigo-600 dark:text-indigo-400 mb-2" />
              <span className="font-medium text-gray-900 dark:text-white">Shop Settings</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorProfile; 