import React, { useState } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ArrowLeft, MapPin, ShoppingCart, Check, User, Award } from 'lucide-react';
import { markets } from '../data/marketData';
import { useCart } from '../context/CartContext';

const ShopDetails = () => {
  const { marketId, shopId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [addedProducts, setAddedProducts] = useState({});
  
  // Find the market and shop
  const market = markets[marketId];
  const shop = market?.shops.find(s => s.id === shopId);
  
  if (!market || !shop) {
    return <Navigate to="/" replace />;
  }

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
    visible: {
      y: 0,
      opacity: 1
    }
  };

  const handleAddToCart = (e, product) => {
    e.stopPropagation(); // Prevent navigation when clicking the button
    
    const cartProduct = {
      ...product,
      marketId: market.id,
      marketName: market.name,
      shopId: shop.id,
      shopName: shop.name
    };
    
    addToCart(cartProduct);
    
    // Show added animation
    setAddedProducts(prev => ({ ...prev, [product.id]: true }));
    
    // Reset after animation
    setTimeout(() => {
      setAddedProducts(prev => ({ ...prev, [product.id]: false }));
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate(`/market/${marketId}`)}
        className="mb-6 flex items-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to {market.name}
      </motion.button>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="space-y-8"
      >
        {/* Shop Header */}
        <motion.div 
          variants={itemVariants} 
          className="relative h-64 md:h-72 rounded-xl overflow-hidden shadow-xl"
        >
          <img
            src={shop.image}
            alt={shop.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex flex-col justify-end p-6">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{shop.name}</h1>
                <div className="flex items-center space-x-2">
                  <div className="bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-bold flex items-center">
                    <Star className="w-3 h-3 mr-1" fill="currentColor" />
                    {shop.rating}
                  </div>
                  <span className="text-white text-sm">{shop.type}</span>
                </div>
              </div>
              
              <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm px-3 py-1 rounded-lg shadow-md">
                <p className="text-xs font-medium text-gray-800 dark:text-gray-200">Part of</p>
                <p className="text-sm font-bold text-indigo-600 dark:text-indigo-400">{market.name}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Shop Details */}
        <motion.div variants={itemVariants} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">About This Shop</h2>
              <p className="text-gray-600 dark:text-gray-300">{shop.description}</p>
            </div>
            <div className="space-y-3">
              <div className="flex items-start">
                <Award className="w-5 h-5 text-indigo-500 mt-0.5 mr-2 flex-shrink-0" />
                <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">Speciality</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{shop.speciality}</p>
                </div>
              </div>
              <div className="flex items-start">
                <MapPin className="w-5 h-5 text-indigo-500 mt-0.5 mr-2 flex-shrink-0" />
                <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">Location</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{market.location}</p>
                </div>
              </div>
              <div className="flex items-start">
                <User className="w-5 h-5 text-indigo-500 mt-0.5 mr-2 flex-shrink-0" />
                <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">Owner</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Local Merchant</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Products */}
          <div className="mt-10">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 pl-2 border-l-4 border-indigo-500">
              Products at {shop.name}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {shop.products && shop.products.length > 0 ? (
                shop.products.map((product) => (
                  <motion.div
                    key={product.id}
                    whileHover={{ y: -5 }}
                    onClick={() => navigate(`/market/${marketId}/shop/${shopId}/product/${product.id}`)}
                    className="bg-gray-50 dark:bg-gray-700 rounded-lg overflow-hidden shadow-sm cursor-pointer group"
                  >
                    <div className="h-48 overflow-hidden relative">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm py-1.5 px-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                          <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
                            View Details
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <h5 className="text-base font-semibold text-gray-900 dark:text-white mb-1">{product.name}</h5>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">{product.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold text-indigo-600 dark:text-indigo-400">₹{product.price}</span>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={(e) => handleAddToCart(e, product)}
                          className={`p-2 rounded-full ${
                            addedProducts[product.id]
                              ? 'bg-green-500 text-white'
                              : 'bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400'
                          } transition-colors duration-300`}
                        >
                          <AnimatePresence mode="wait">
                            {addedProducts[product.id] ? (
                              <motion.div
                                key="check"
                                initial={{ scale: 0.5, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.5, opacity: 0 }}
                              >
                                <Check className="w-5 h-5" />
                              </motion.div>
                            ) : (
                              <motion.div
                                key="cart"
                                initial={{ scale: 0.5, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.5, opacity: 0 }}
                              >
                                <ShoppingCart className="w-5 h-5" />
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full text-center py-10 text-gray-500 dark:text-gray-400">
                  No products available at this shop.
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ShopDetails; 