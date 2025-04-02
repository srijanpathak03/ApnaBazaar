import React, { useState } from 'react';
import { MapPin, Users, Clock, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import AuthModal from './AuthModal';

const ProtectedMarketCard = ({
  id,
  name,
  description,
  image,
  location,
  visitors,
  timing,
}) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  
  const handleCardClick = () => {
    if (isAuthenticated) {
      navigate(`/market/${id}`);
    } else {
      setShowAuthModal(true);
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ 
          y: -8,
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
        }}
        transition={{ 
          type: "spring", 
          stiffness: 300,
          damping: 15 
        }}
        onClick={handleCardClick}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden cursor-pointer transition-all group"
      >
        <div className="relative h-52 overflow-hidden">
          <img
            className="w-full h-full object-cover transform transition-transform group-hover:scale-105"
            src={image}
            alt={name}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-80"></div>
          <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
            <div>
              <div className="px-2 py-1 bg-indigo-600/90 text-white text-xs font-semibold rounded-full shadow-md mb-2 inline-block">
                Popular Market
              </div>
              <h3 className="text-xl font-bold text-white drop-shadow-md">{name}</h3>
            </div>
            <motion.div 
              whileHover={{ x: 3 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white/90 dark:bg-gray-800/90 rounded-full p-1.5"
            >
              <ChevronRight className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            </motion.div>
          </div>
        </div>
        <div className="p-5">
          <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2 mb-4">{description}</p>
          <div className="space-y-2 text-sm">
            <div className="flex items-center text-gray-500 dark:text-gray-400">
              <MapPin className="w-4 h-4 mr-2 text-indigo-500 dark:text-indigo-400" />
              <span>{location}</span>
            </div>
            <div className="flex items-center text-gray-500 dark:text-gray-400">
              <Users className="w-4 h-4 mr-2 text-indigo-500 dark:text-indigo-400" />
              <span>{visitors}</span>
            </div>
            <div className="flex items-center text-gray-500 dark:text-gray-400">
              <Clock className="w-4 h-4 mr-2 text-indigo-500 dark:text-indigo-400" />
              <span>{timing}</span>
            </div>
          </div>
        </div>
      </motion.div>
      
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
        redirectPath={`/market/${id}`}
      />
    </>
  );
};

export default ProtectedMarketCard; 