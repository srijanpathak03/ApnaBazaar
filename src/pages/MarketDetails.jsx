import React, { useState } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ArrowLeft, MapPin, Users, Clock, ShoppingCart, Plus, Check } from 'lucide-react';
import { markets } from '../data/marketData';
import { useCart } from '../context/CartContext';

const MarketDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const market = markets[id];
  const { addToCart } = useCart();
  const [addedProducts, setAddedProducts] = useState({});
  
  if (!market) {
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

  const handleAddToCart = (product, shop) => {
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
        onClick={() => navigate('/')}
        className="mb-6 flex items-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to Markets
      </motion.button>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="space-y-8"
      >
        <motion.div variants={itemVariants} className="relative h-64 md:h-80 rounded-xl overflow-hidden shadow-xl">
          <img
            src={market.image}
            alt={market.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <h1 className="text-4xl font-bold text-white text-center">{market.name}</h1>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="flex items-center text-gray-600 dark:text-gray-300">
              <MapPin className="w-5 h-5 mr-2 text-indigo-500" />
              <span>{market.location}</span>
            </div>
            <div className="flex items-center text-gray-600 dark:text-gray-300">
              <Users className="w-5 h-5 mr-2 text-indigo-500" />
              <span>{market.visitors}</span>
            </div>
            <div className="flex items-center text-gray-600 dark:text-gray-300">
              <Clock className="w-5 h-5 mr-2 text-indigo-500" />
              <span>{market.timing}</span>
            </div>
          </div>
          
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Shops in {market.name}</h2>
          
          <div className="space-y-16">
            {market.shops.map((shop) => (
              <motion.div
                key={shop.id}
                variants={itemVariants}
                className="border-b border-gray-200 dark:border-gray-700 pb-12 last:border-0 last:pb-0"
              >
                <div 
                  className="flex flex-col md:flex-row gap-6 mb-8 cursor-pointer hover:opacity-90 transition-opacity"
                  onClick={() => navigate(`/market/${market.id}/shop/${shop.id}`)}
                >
                  {shop.image && (
                    <div className="h-40 w-full md:w-1/3 lg:w-1/4 overflow-hidden rounded-lg flex-shrink-0 relative group">
                      <img
                        src={shop.image}
                        alt={shop.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm py-1 px-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
                            View Shop Details
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="flex-grow">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{shop.name}</h3>
                      <div className="flex items-center bg-yellow-100 dark:bg-yellow-900 px-2 py-1 rounded">
                        <Star className="w-4 h-4 text-yellow-500 dark:text-yellow-400 mr-1" fill="currentColor" />
                        <span className="text-sm text-yellow-700 dark:text-yellow-300 font-medium">{shop.rating}</span>
                      </div>
                    </div>
                    <div className="text-sm font-medium text-indigo-600 dark:text-indigo-400 mb-2">
                      {shop.type}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{shop.description}</p>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      <p className="font-medium">Speciality: <span className="font-normal">{shop.speciality}</span></p>
                    </div>
                  </div>
                </div>
                
                {shop.products && shop.products.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-medium text-gray-800 dark:text-gray-200 pl-2 border-l-4 border-indigo-500">
                        Popular Products
                      </h4>
                      <button 
                        onClick={() => navigate(`/market/${market.id}/shop/${shop.id}`)}
                        className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300"
                      >
                        View All Products
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {shop.products.slice(0, 3).map((product) => (
                        <motion.div
                          key={product.id}
                          whileHover={{ y: -5 }}
                          className="bg-gray-50 dark:bg-gray-700 rounded-lg overflow-hidden shadow-sm cursor-pointer group"
                          onClick={() => navigate(`/market/${market.id}/shop/${shop.id}/product/${product.id}`)}
                        >
                          <div className="h-40 overflow-hidden relative">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm py-1.5 px-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                                <span className="text-xs font-medium text-indigo-600 dark:text-indigo-400">
                                  View Details
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="p-4">
                            <h5 className="text-base font-semibold text-gray-900 dark:text-white mb-1 truncate">{product.name}</h5>
                            <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">{product.description}</p>
                            <div className="flex justify-between items-center">
                              <span className="text-lg font-bold text-indigo-600 dark:text-indigo-400">₹{product.price}</span>
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleAddToCart(product, shop);
                                }}
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
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default MarketDetail;