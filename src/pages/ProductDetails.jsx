import React, { useState } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Star, ArrowLeft, ShoppingCart, Check, Heart, Share2, 
  MessageCircle, ThumbsUp, ThumbsDown, User, ShoppingBag 
} from 'lucide-react';
import { markets } from '../data/marketData';
import { useCart } from '../context/CartContext';

// Hardcoded reviews for products
const productReviews = {
  'fh-jeans-01': [
    { 
      id: 'r1', 
      user: 'Ravi Kumar', 
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      rating: 5, 
      date: '2023-12-15', 
      comment: 'Fantastic jeans! The fabric is stretchy and comfortable for all-day wear. I\'ve bought 3 pairs already.',
      likes: 24,
      dislikes: 2,
      verified: true
    },
    { 
      id: 'r2', 
      user: 'Priya Sharma', 
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      rating: 4, 
      date: '2023-11-28', 
      comment: 'Good quality for the price. Sizing runs a bit small, so order one size up.',
      likes: 15,
      dislikes: 1,
      verified: true
    },
    { 
      id: 'r3', 
      user: 'Arun Singh', 
      avatar: 'https://randomuser.me/api/portraits/men/62.jpg',
      rating: 3, 
      date: '2024-01-07', 
      comment: 'Decent pants but the color was slightly different from the pictures. Customer service was helpful though.',
      likes: 8,
      dislikes: 3,
      verified: false
    }
  ],
  'ss-necklace-01': [
    { 
      id: 'r4', 
      user: 'Neha Patel', 
      avatar: 'https://randomuser.me/api/portraits/women/63.jpg',
      rating: 5, 
      date: '2024-01-02', 
      comment: 'Absolutely gorgeous necklace! Looks much more expensive than it is. I wear it almost daily.',
      likes: 37,
      dislikes: 0,
      verified: true
    },
    { 
      id: 'r5', 
      user: 'Ananya Gupta', 
      avatar: 'https://randomuser.me/api/portraits/women/26.jpg',
      rating: 5, 
      date: '2023-12-25', 
      comment: 'Got this as a gift for my sister and she loved it! The layered design is very trendy.',
      likes: 19,
      dislikes: 1,
      verified: true
    }
  ],
  'default': [
    { 
      id: 'r6', 
      user: 'Vikram Malhotra', 
      avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
      rating: 4, 
      date: '2023-12-10', 
      comment: 'Great product! Exactly as described. Would buy again.',
      likes: 12,
      dislikes: 1,
      verified: true
    },
    { 
      id: 'r7', 
      user: 'Meera Desai', 
      avatar: 'https://randomuser.me/api/portraits/women/79.jpg',
      rating: 5, 
      date: '2024-01-18', 
      comment: 'Amazing quality and fast shipping. Highly recommend this shop!',
      likes: 31,
      dislikes: 2,
      verified: true
    },
    { 
      id: 'r8', 
      user: 'Sanjay Verma', 
      avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
      rating: 3, 
      date: '2023-11-15', 
      comment: 'It\'s okay for the price. Nothing special but does the job.',
      likes: 5,
      dislikes: 3,
      verified: false
    }
  ]
};

const ProductDetails = () => {
  const { marketId, shopId, productId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [addedToCart, setAddedToCart] = useState(false);
  const [wishlist, setWishlist] = useState(false);
  const [activeTab, setActiveTab] = useState('description');
  const [reviewLikes, setReviewLikes] = useState({});
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });

  // Find the market, shop, and product
  const market = markets[marketId];
  const shop = market?.shops.find(s => s.id === shopId);
  const product = shop?.products.find(p => p.id === productId);
  
  if (!market || !shop || !product) {
    return <Navigate to="/" replace />;
  }

  // Get reviews for this product or use default
  const reviews = productReviews[productId] || productReviews.default;
  
  // Calculate average rating
  const avgRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

  const handleAddToCart = () => {
    const cartProduct = {
      ...product,
      marketId: market.id,
      marketName: market.name,
      shopId: shop.id,
      shopName: shop.name
    };
    
    addToCart(cartProduct);
    setAddedToCart(true);
    
    setTimeout(() => {
      setAddedToCart(false);
    }, 1500);
  };

  const handleLikeReview = (reviewId, type) => {
    setReviewLikes(prev => ({
      ...prev,
      [reviewId]: type
    }));
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    alert("Thanks for your review! It will be published after moderation.");
    setNewReview({ rating: 5, comment: '' });
  };

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

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb Navigation */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center text-sm overflow-x-auto whitespace-nowrap hide-scrollbar"
        >
          <span 
            className="hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer transition-colors" 
            onClick={() => navigate('/')}
          >
            Markets
          </span>
          <span className="mx-2 text-gray-400">›</span>
          <span 
            className="hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer transition-colors" 
            onClick={() => navigate(`/market/${marketId}`)}
          >
            {market.name}
          </span>
          <span className="mx-2 text-gray-400">›</span>
          <span 
            className="hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer transition-colors" 
            onClick={() => navigate(`/market/${marketId}/shop/${shopId}`)}
          >
            {shop.name}
          </span>
          <span className="mx-2 text-gray-400">›</span>
          <span className="text-gray-700 dark:text-gray-300 font-medium truncate max-w-[120px] sm:max-w-none">{product.name}</span>
        </motion.div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate(`/market/${marketId}/shop/${shopId}`)}
          className="flex items-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to {shop.name}
        </motion.button>
      </div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="space-y-12"
      >
        {/* Product Overview */}
        <motion.div 
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-2 gap-10"
        >
          {/* Product Image */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 shadow-md overflow-hidden group">
            <div className="rounded-lg overflow-hidden h-80 sm:h-96 md:h-[28rem] relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-4 right-4 flex space-x-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setWishlist(!wishlist)}
                  className="bg-white dark:bg-gray-800 p-2.5 rounded-full shadow-lg text-gray-500 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 transition-all opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0"
                >
                  <Heart className={`w-5 h-5 ${wishlist ? 'fill-red-500 text-red-500' : ''}`} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => alert("Link copied!")}
                  className="bg-white dark:bg-gray-800 p-2.5 rounded-full shadow-lg text-gray-500 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0"
                >
                  <Share2 className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
            <div className="flex items-center justify-between mt-4">
              <div className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                <ShoppingBag className="w-4 h-4 mr-1 text-indigo-500 dark:text-indigo-400" />
                From <span className="font-medium ml-1 hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer" onClick={() => navigate(`/market/${marketId}/shop/${shopId}`)}>{shop.name}</span>
              </div>
              <div className="flex items-center">
                <div className="flex items-center text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className="w-4 h-4" 
                      fill={i < Math.round(avgRating) ? "currentColor" : "none"}
                    />
                  ))}
                </div>
                <span className="ml-1 text-xs text-gray-500 dark:text-gray-400">({reviews.length})</span>
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{product.name}</h1>
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className="w-4 h-4" 
                      fill={i < Math.round(avgRating) ? "currentColor" : "none"}
                      color={i < Math.round(avgRating) ? "#EAB308" : "#9CA3AF"}
                    />
                  ))}
                  <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">
                    {avgRating.toFixed(1)} ({reviews.length} reviews)
                  </span>
                </div>
              </div>
            </div>
            
            <div className="border-t border-b py-4 border-gray-200 dark:border-gray-700">
              <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-4">
                ₹{product.price.toFixed(2)}
              </div>
              <div className="flex space-x-4">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleAddToCart}
                  className={`flex-grow py-3 px-6 rounded-lg font-medium flex items-center justify-center space-x-2 relative overflow-hidden shadow-md ${
                    addedToCart 
                      ? 'bg-green-500 text-white' 
                      : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white'
                  } transition-colors duration-300`}
                >
                  <AnimatePresence mode="wait">
                    {addedToCart ? (
                      <motion.div
                        key="check"
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.5, opacity: 0 }}
                        className="flex items-center space-x-2"
                      >
                        <Check className="w-5 h-5" />
                        <span>Added to Cart</span>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="cart"
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.5, opacity: 0 }}
                        className="flex items-center space-x-2"
                      >
                        <ShoppingCart className="w-5 h-5" />
                        <span>Add to Cart</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  {!addedToCart && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0.3 }}
                      animate={{ scale: 3, opacity: 0 }}
                      transition={{ repeat: Infinity, duration: 1.5, repeatDelay: 1 }}
                      className="absolute inset-0 rounded-lg bg-white"
                    />
                  )}
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setWishlist(!wishlist)}
                  className={`p-3 rounded-lg ${
                    wishlist 
                      ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400' 
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                  } shadow-md transition-colors`}
                >
                  <Heart className={`w-5 h-5 ${wishlist ? 'fill-red-500 text-red-500' : ''}`} />
                </motion.button>
              </div>
            </div>
            
            {/* Product Tab Navigation */}
            <div className="border-b border-gray-200 dark:border-gray-700">
              <div className="flex space-x-8">
                <button
                  onClick={() => setActiveTab('description')}
                  className={`py-4 font-medium text-sm border-b-2 ${
                    activeTab === 'description'
                      ? 'border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
                >
                  Description
                </button>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className={`py-4 font-medium text-sm border-b-2 ${
                    activeTab === 'reviews'
                      ? 'border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
                >
                  Reviews ({reviews.length})
                </button>
              </div>
            </div>
            
            {/* Tab Content */}
            <div className="py-2">
              {activeTab === 'description' && (
                <div className="space-y-4">
                  <p className="text-gray-700 dark:text-gray-300">{product.description}</p>
                  <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg mt-4">
                    <h3 className="font-medium text-gray-900 dark:text-white mb-2">Shop Information</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{shop.description}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      <span className="font-medium">Speciality:</span> {shop.speciality}
                    </p>
                  </div>
                </div>
              )}
              
              {activeTab === 'reviews' && (
                <div className="space-y-6">
                  {/* Reviews Summary */}
                  <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg flex flex-col md:flex-row md:items-center justify-between">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-3xl font-bold text-gray-900 dark:text-white">{avgRating.toFixed(1)}</span>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className="w-5 h-5" 
                              fill={i < Math.round(avgRating) ? "currentColor" : "none"}
                              color={i < Math.round(avgRating) ? "#EAB308" : "#9CA3AF"}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Based on {reviews.length} reviews</p>
                    </div>
                    <button 
                      onClick={() => alert("Sign in to write a review")}
                      className="mt-3 md:mt-0 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium"
                    >
                      Write a Review
                    </button>
                  </div>
                  
                  {/* Review List */}
                  <div className="space-y-4">
                    {reviews.map(review => (
                      <motion.div 
                        key={review.id} 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-0"
                      >
                        <div className="flex justify-between">
                          <div className="flex items-center space-x-3">
                            <motion.img 
                              whileHover={{ scale: 1.1 }}
                              src={review.avatar} 
                              alt={review.user} 
                              className="w-10 h-10 rounded-full ring-2 ring-gray-200 dark:ring-gray-700"
                            />
                            <div>
                              <div className="flex items-center">
                                <span className="font-medium text-gray-900 dark:text-white mr-2">{review.user}</span>
                                {review.verified && (
                                  <span className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 text-xs px-2 py-0.5 rounded-full flex items-center">
                                    <Check className="w-3 h-3 mr-1" />
                                    Verified
                                  </span>
                                )}
                              </div>
                              <div className="flex items-center space-x-1 mt-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star 
                                    key={i} 
                                    className="w-4 h-4" 
                                    fill={i < review.rating ? "currentColor" : "none"}
                                    color={i < review.rating ? "#EAB308" : "#9CA3AF"}
                                  />
                                ))}
                                <span className="text-xs text-gray-500 ml-2">{review.date}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <p className="text-gray-700 dark:text-gray-300 mt-3">{review.comment}</p>
                        
                        <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.2 }}
                          className="mt-4 flex items-center space-x-6"
                        >
                          <motion.button 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleLikeReview(review.id, 'like')}
                            className={`flex items-center space-x-1 text-sm ${
                              reviewLikes[review.id] === 'like' 
                                ? 'text-indigo-600 dark:text-indigo-400' 
                                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                            } transition-colors`}
                          >
                            <ThumbsUp className={`w-4 h-4 ${reviewLikes[review.id] === 'like' ? 'fill-indigo-600 dark:fill-indigo-400' : ''}`} />
                            <span>{reviewLikes[review.id] === 'like' ? review.likes + 1 : review.likes}</span>
                          </motion.button>
                          
                          <motion.button 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleLikeReview(review.id, 'dislike')}
                            className={`flex items-center space-x-1 text-sm ${
                              reviewLikes[review.id] === 'dislike' 
                                ? 'text-indigo-600 dark:text-indigo-400' 
                                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                            } transition-colors`}
                          >
                            <ThumbsDown className={`w-4 h-4 ${reviewLikes[review.id] === 'dislike' ? 'fill-indigo-600 dark:fill-indigo-400' : ''}`} />
                            <span>{reviewLikes[review.id] === 'dislike' ? review.dislikes + 1 : review.dislikes}</span>
                          </motion.button>
                          
                          <motion.button 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => alert("Sign in to reply")}
                            className="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                          >
                            <MessageCircle className="w-4 h-4" />
                            <span>Reply</span>
                          </motion.button>
                        </motion.div>
                      </motion.div>
                    ))}
                  </div>
                  
                  {/* Review Form */}
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mt-8">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Write a Review</h3>
                    <form onSubmit={handleSubmitReview}>
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Your Rating
                        </label>
                        <div className="flex space-x-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => setNewReview(prev => ({ ...prev, rating: star }))}
                              className="focus:outline-none"
                            >
                              <Star 
                                className="w-6 h-6" 
                                color="#EAB308"
                                fill={star <= newReview.rating ? "#EAB308" : "none"}
                              />
                            </button>
                          ))}
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Your Review
                        </label>
                        <textarea
                          value={newReview.comment}
                          onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
                          rows={4}
                          className="w-full px-3 py-2 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 bg-white dark:bg-gray-700"
                          placeholder="Share your experience with this product..."
                        />
                      </div>
                      
                      <button
                        type="submit"
                        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium"
                      >
                        Submit Review
                      </button>
                    </form>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
        
        {/* Related Products */}
        <motion.div variants={itemVariants}>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            You May Also Like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {shop.products.filter(p => p.id !== product.id).slice(0, 4).map(relatedProduct => (
              <motion.div
                key={relatedProduct.id}
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md cursor-pointer"
                onClick={() => navigate(`/market/${marketId}/shop/${shopId}/product/${relatedProduct.id}`)}
              >
                <div className="h-44 overflow-hidden">
                  <img
                    src={relatedProduct.image}
                    alt={relatedProduct.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1 truncate">{relatedProduct.name}</h3>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-indigo-600 dark:text-indigo-400 font-bold">₹{relatedProduct.price}</span>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 mr-1" />
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        {(Math.random() * 2 + 3).toFixed(1)}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ProductDetails; 