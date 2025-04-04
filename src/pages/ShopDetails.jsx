import React, { useState } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ArrowLeft, MapPin, ShoppingCart, Check, User, Award, Package } from 'lucide-react';
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

  console.log("Market image URL:", market.image);
  console.log("Shop image URL:", shop.image);
  
  // Add more debugging for product images if available
  if (shop.products && shop.products.length > 0) {
    console.log("First product image URL:", shop.products[0].image);
  }

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
          {shop.image ? (
            <img
              src={shop.image}
              alt={shop.name}
              // crossOrigin="anonymous"
              className="w-full h-full object-cover"
              style={{ minHeight: '200px', minWidth: '200px' }}
              onError={(e) => {
                e.target.onerror = null;
                // Use a simpler fallback approach
                e.target.src = 'https://res.cloudinary.com/dt6ekj5b3/image/upload/v1743793129/twugc4auooodbuetgoa6.jpg';
                console.log("Shop header image load error handled with base64 SVG");
              }}
            />
          ) : (
            <div className="w-full h-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center">
              <Package className="w-16 h-16 text-gray-500 dark:text-gray-400" />
            </div>
          )}
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <h1 className="text-4xl font-bold text-white text-center">{shop.name}</h1>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
          {/* Shop Info */}
          <div className="flex flex-col md:flex-row justify-between gap-6 mb-8">
            <div>
              <div className="flex items-center mb-2">
                <span className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full text-sm font-medium">
                  {shop.type}
                </span>
                <div className="ml-3 flex items-center">
                  <Star className="w-5 h-5 text-yellow-500" fill="currentColor" />
                  <span className="ml-1 font-medium">{shop.rating}</span>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">{shop.description}</p>
              <div className="flex items-center text-gray-600 dark:text-gray-300">
                <Award className="w-5 h-5 mr-2 text-indigo-500" />
                <span>Speciality: {shop.speciality}</span>
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Shop Information</h3>
              <div className="space-y-2">
                <div className="flex items-center text-gray-600 dark:text-gray-300">
                  <MapPin className="w-5 h-5 mr-2 text-indigo-500" />
                  <span>{market.location}</span>
                </div>
                <div className="flex items-center text-gray-600 dark:text-gray-300">
                  <User className="w-5 h-5 mr-2 text-indigo-500" />
                  <span>Vendor since 2022</span>
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
                      {product.image ? (
                        <img
                          src={product.image}
                          alt={product.name}
                          crossOrigin="anonymous"
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          onError={(e) => {
                            e.target.onerror = null;
                            // Use a simpler fallback approach
                            e.target.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzY0NzQ4QiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJmZWF0aGVyIGZlYXRoZXItcGFja2FnZSI+PHBhdGggZD0iTTEyIDNsMjAgMTB2MTJMOCAyMi41IGwtOC01VjhsMTItNXoiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjxsaW5lIHgxPSIxMiIgeTE9IjEyIiB4Mj0iNyIgeTI9IjExIj48L2xpbmU+PHBhdGggZD0iTSA5IDEyIEwgOSAxOCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+PHBhdGggZD0iTSAxMSAxMCBMIDE2IDE1IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz48L3N2Zz4=';
                            console.log("Product image load error handled with base64 SVG for", product.name);
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-600">
                          <Package className="w-12 h-12 text-gray-400" />
                        </div>
                      )}
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
                <div className="col-span-full text-center py-10 bg-gray-100 dark:bg-gray-700/30 rounded-lg">
                  <Package className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600 dark:text-gray-300 text-lg">No products available at this shop yet.</p>
                  <p className="text-gray-500 dark:text-gray-400 mt-1">Check back later for updates!</p>
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