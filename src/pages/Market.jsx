import React, { useState } from 'react';
import MarketCard from '../components/MarketCard';
import { motion, AnimatePresence } from 'framer-motion';
import { markets } from '../data/marketData';
import { Search, Filter, Store } from 'lucide-react';

const Market = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);

  const filteredMarkets = Object.values(markets).filter(market => 
    market.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    market.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    market.location.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleSearch = (e) => {
    // Simulate loading state
    setIsLoading(true);
    setSearchTerm(e.target.value);
    
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
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

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-gray-900 dark:text-white"
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
            Popular Markets
          </span>
        </motion.h1>
        
        <div className="w-full sm:w-auto flex items-center gap-2">
          <motion.div 
            initial={{ opacity: 0, width: "80%" }}
            animate={{ opacity: 1, width: "100%" }}
            className="relative flex-grow"
          >
            <input
              type="text"
              placeholder="Search markets..."
              value={searchTerm}
              onChange={handleSearch}
              className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition-colors"
            />
            <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
            {searchTerm && (
              <motion.button
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
              >
                ✕
              </motion.button>
            )}
          </motion.div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setFilterOpen(!filterOpen)}
            className="p-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition-colors"
          >
            <Filter className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
      
      <AnimatePresence>
        {filterOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Location</label>
                <select className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400">
                  <option value="">All Locations</option>
                  <option value="delhi">Delhi</option>
                  <option value="mumbai">Mumbai</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Market Type</label>
                <select className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400">
                  <option value="">All Types</option>
                  <option value="clothing">Clothing</option>
                  <option value="food">Food</option>
                  <option value="electronics">Electronics</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Sort By</label>
                <select className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400">
                  <option value="popular">Popularity</option>
                  <option value="nameAsc">Name (A-Z)</option>
                  <option value="nameDesc">Name (Z-A)</option>
                </select>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      ) : filteredMarkets.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-10 text-center shadow-md"
        >
          <Store className="w-14 h-14 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No markets found</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            We couldn't find any markets matching your search criteria.
          </p>
          <button 
            onClick={() => setSearchTerm('')}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors"
          >
            Clear Search
          </button>
        </motion.div>
      ) : (
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredMarkets.map((market) => (
            <MarketCard key={market.id} {...market} />
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default Market;