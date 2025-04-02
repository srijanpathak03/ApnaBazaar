import React, { useState } from 'react';
import { Upload, Save, Store, MapPin, Phone, Mail, Globe, Clock, Check, DollarSign, Image } from 'lucide-react';

const ShopSettings = () => {
  const [formData, setFormData] = useState({
    bankAccount: {
      bankName: '',
      ifscCode: '',
    },
    taxInformation: {
      gstin: '',
      panNumber: '',
    },
    shopLogo: null,
    shopBanner: null,
  });

  const handleBankChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      bankAccount: {
        ...prevData.bankAccount,
        [field]: value,
      },
    }));
  };

  const handleTaxChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      taxInformation: {
        ...prevData.taxInformation,
        [field]: value,
      },
    }));
  };

  const handleImageUpload = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevData) => ({
          ...prevData,
          [field]: {
            url: reader.result,
            file,
          },
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Shop Settings</h1>
      
      <form onSubmit={handleSubmit}>
        {/* Shop Details */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <Image className="w-5 h-5 mr-2 text-indigo-600 dark:text-indigo-400" />
            Shop Details
          </h2>
          
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Bank Name
              </label>
              <input
                type="text"
                value={formData.bankAccount.bankName}
                onChange={(e) => handleBankChange('bankName', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                IFSC Code
              </label>
              <input
                type="text"
                value={formData.bankAccount.ifscCode}
                onChange={(e) => handleBankChange('ifscCode', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>
          
          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                GSTIN
              </label>
              <input
                type="text"
                value={formData.taxInformation.gstin}
                onChange={(e) => handleTaxChange('gstin', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                PAN Number
              </label>
              <input
                type="text"
                value={formData.taxInformation.panNumber}
                onChange={(e) => handleTaxChange('panNumber', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>
        </div>
        
        {/* Shop Visuals */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <Image className="w-5 h-5 mr-2 text-indigo-600 dark:text-indigo-400" />
            Shop Visuals
          </h2>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Shop Logo
              </label>
              <div className="flex items-center space-x-6">
                <div className="w-24 h-24 rounded-lg border border-gray-300 dark:border-gray-600 flex items-center justify-center overflow-hidden bg-gray-100 dark:bg-gray-700">
                  {formData.shopLogo ? (
                    <img 
                      src={formData.shopLogo.url} 
                      alt="Shop Logo" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Store className="w-12 h-12 text-gray-400" />
                  )}
                </div>
                <div>
                  <label className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    <Upload className="w-5 h-5 mr-2 -ml-1" />
                    Upload Logo
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, 'shopLogo')}
                      className="hidden"
                    />
                  </label>
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    Recommended size: 400x400px
                  </p>
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Shop Banner
              </label>
              <div className="border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700">
                {formData.shopBanner ? (
                  <img 
                    src={formData.shopBanner.url} 
                    alt="Shop Banner" 
                    className="w-full h-40 object-cover"
                  />
                ) : (
                  <div className="w-full h-40 flex items-center justify-center">
                    <Image className="w-12 h-12 text-gray-400" />
                  </div>
                )}
              </div>
              <div className="mt-2">
                <label className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  <Upload className="w-5 h-5 mr-2 -ml-1" />
                  Upload Banner
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, 'shopBanner')}
                    className="hidden"
                  />
                </label>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Recommended size: 1200x400px
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 flex items-center"
          >
            <Save className="w-5 h-5 mr-2 -ml-1" />
            Save Settings
          </button>
        </div>
      </form>
    </div>
  );
};

export default ShopSettings; 