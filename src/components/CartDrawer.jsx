import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingCart, Plus, Minus, Trash2, CreditCard, ShoppingBag, AlertCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const CartDrawer = () => {
  const { 
    cartItems, 
    cartOpen, 
    cartTotal, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    setCartOpen 
  } = useCart();
  const navigate = useNavigate();

  const drawerVariants = {
    hidden: { x: '100%' },
    visible: {
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
        mass: 1,
      }
    },
    exit: { 
      x: '100%',
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30
      }
    }
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 0.6 },
    exit: { opacity: 0 }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: i => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.2
      }
    }),
    exit: { opacity: 0, x: 20 }
  };

  const handleNavigateToProduct = (item) => {
    navigate(`/market/${item.marketId}/shop/${item.shopId}/product/${item.id}`);
    setCartOpen(false);
  };

  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 bg-black z-40"
            onClick={() => setCartOpen(false)}
          />
          
          {/* Cart Drawer */}
          <motion.div
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed top-0 right-0 h-full w-full sm:w-96 bg-white dark:bg-gray-800 shadow-xl z-50 overflow-hidden flex flex-col"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
                <div className="flex items-center space-x-2">
                  <div className="p-1.5 bg-indigo-100 dark:bg-indigo-900/30 rounded-full">
                    <ShoppingCart className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">Your Cart</h2>
                  <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs font-medium rounded-full">
                    {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
                  </span>
                </div>
                <motion.button 
                  whileHover={{ rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setCartOpen(false)}
                  className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <X className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                </motion.button>
              </div>
              
              {/* Cart Items */}
              <div className="flex-grow overflow-y-auto py-4 px-4">
                {cartItems.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                      className="bg-gray-50 dark:bg-gray-700/50 rounded-full p-6 mb-4"
                    >
                      <ShoppingBag className="w-12 h-12 text-gray-300 dark:text-gray-600" />
                    </motion.div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Your cart is empty</h3>
                    <p className="text-gray-500 dark:text-gray-400 max-w-xs mb-6">
                      Looks like you haven't added any items to your cart yet.
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => {
                        navigate('/');
                        setCartOpen(false);
                      }}
                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
                    >
                      Start Shopping
                    </motion.button>
                  </div>
                ) : (
                  <ul className="space-y-4">
                    {cartItems.map((item, index) => (
                      <motion.li 
                        key={`${item.id}-${item.shopId}`}
                        custom={index}
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                        className="border-b dark:border-gray-700 pb-4 last:border-0"
                      >
                        <div className="flex space-x-4">
                          <div 
                            className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0 cursor-pointer relative group"
                            onClick={() => handleNavigateToProduct(item)}
                          >
                            <img 
                              src={item.image} 
                              alt={item.name} 
                              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity"></div>
                          </div>
                          <div className="flex-grow">
                            <div className="flex justify-between">
                              <h3 
                                className="font-medium text-gray-900 dark:text-white cursor-pointer hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                                onClick={() => handleNavigateToProduct(item)}
                              >
                                {item.name}
                              </h3>
                              <motion.button 
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => removeFromCart(item.id)}
                                className="text-red-500 hover:text-red-700 dark:hover:text-red-400"
                              >
                                <Trash2 className="w-4 h-4" />
                              </motion.button>
                            </div>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{item.shopName}</p>
                            <div className="mt-2 flex justify-between items-center">
                              <div className="text-indigo-600 dark:text-indigo-400 font-medium">
                                ₹{item.price.toFixed(2)}
                              </div>
                              <div className="flex items-center space-x-2">
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  className="p-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 disabled:opacity-50"
                                  disabled={item.quantity <= 1}
                                >
                                  <Minus className="w-4 h-4" />
                                </motion.button>
                                <span className="w-8 text-center font-medium text-gray-900 dark:text-white">
                                  {item.quantity}
                                </span>
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  className="p-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                                >
                                  <Plus className="w-4 h-4" />
                                </motion.button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.li>
                    ))}
                  </ul>
                )}
              </div>
              
              {/* Footer */}
              {cartItems.length > 0 && (
                <div className="p-4 border-t dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                      <span className="text-gray-900 dark:text-white">₹{cartTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Shipping</span>
                      <span className="text-gray-900 dark:text-white">FREE</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Tax</span>
                      <span className="text-gray-900 dark:text-white">₹{(cartTotal * 0.18).toFixed(2)}</span>
                    </div>
                    <div className="border-t dark:border-gray-700 pt-3 flex justify-between">
                      <span className="font-medium text-gray-900 dark:text-white">Total</span>
                      <span className="font-bold text-lg text-indigo-600 dark:text-indigo-400">
                        ₹{(cartTotal + cartTotal * 0.18).toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <motion.button 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-3 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center space-x-2"
                      onClick={() => alert('Checkout functionality coming soon!')}
                    >
                      <CreditCard className="w-5 h-5" />
                      <span>Checkout</span>
                    </motion.button>
                    <motion.button 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 font-medium rounded-lg transition-colors flex items-center justify-center space-x-2"
                      onClick={clearCart}
                    >
                      <span>Clear Cart</span>
                    </motion.button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer; 