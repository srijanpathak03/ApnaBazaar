import React from 'react';
import { MapPin, Calendar, Clock, Users, Star } from 'lucide-react';
import { motion } from 'framer-motion';

const Fair = () => {
  // Mock data for upcoming fairs
  const upcomingFairs = [
    {
      id: 1,
      name: "Spring Farmer's Market",
      description: "A vibrant gathering of local farmers and artisans offering fresh produce, handcrafted goods, and unique gifts.",
      image: "https://images.unsplash.com/photo-1526399232581-2ab5608b6336?ixlib=rb-4.0.3",
      location: "Central Park, New York",
      date: "May 15-16, 2023",
      timing: "9:00 AM - 5:00 PM",
      attendance: "Expected 2,000+ visitors",
      rating: 4.7,
      distance: "1.2 miles away"
    },
    {
      id: 2,
      name: "Artisan Craft Festival",
      description: "Explore the finest handcrafted products from local artisans. From pottery to textiles, jewelry to wood crafts.",
      image: "https://images.unsplash.com/photo-1607778912862-16b931453c81?ixlib=rb-4.0.3",
      location: "Riverside Plaza, Brooklyn",
      date: "May 22-23, 2023",
      timing: "10:00 AM - 6:00 PM",
      attendance: "Expected 1,500+ visitors",
      rating: 4.5,
      distance: "2.4 miles away"
    },
    {
      id: 3,
      name: "Urban Food Festival",
      description: "Experience culinary delights from diverse local restaurants and food vendors, featuring organic and sustainable options.",
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3",
      location: "City Square, Queens",
      date: "June 5-6, 2023",
      timing: "11:00 AM - 8:00 PM",
      attendance: "Expected 3,000+ visitors",
      rating: 4.8,
      distance: "3.7 miles away"
    },
    {
      id: 4,
      name: "Weekend Flea Market",
      description: "Discover unique vintage items, collectibles, and second-hand treasures from local vendors and small businesses.",
      image: "https://images.unsplash.com/photo-1571942676516-bcab84649e44?ixlib=rb-4.0.3",
      location: "Sunset Park, Staten Island",
      date: "June 12-13, 2023",
      timing: "8:00 AM - 4:00 PM",
      attendance: "Expected 1,200+ visitors",
      rating: 4.3,
      distance: "5.1 miles away"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Fairs Near Me</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">Discover local markets and events happening in your area</p>
        </div>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-200 rounded-full text-sm font-medium">
            This Week
          </button>
          <button className="px-4 py-2 bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-200 rounded-full text-sm font-medium">
            This Month
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {upcomingFairs.map((fair) => (
          <FairCard key={fair.id} fair={fair} />
        ))}
      </div>
    </div>
  );
};

const FairCard = ({ fair }) => {
  return (
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
      className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden cursor-pointer transition-all group"
    >
      <div className="relative h-52 overflow-hidden">
        <img
          className="w-full h-full object-cover transform transition-transform group-hover:scale-105"
          src={fair.image}
          alt={fair.name}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-80"></div>
        <div className="absolute top-4 right-4 bg-white/90 dark:bg-gray-800/90 rounded-full py-1 px-2 flex items-center">
          <Star className="w-4 h-4 text-yellow-500 mr-1" fill="currentColor" />
          <span className="text-sm font-medium">{fair.rating}</span>
        </div>
        <div className="absolute bottom-4 left-4 right-4">
          <div className="px-2 py-1 bg-green-600/90 text-white text-xs font-semibold rounded-full shadow-md mb-2 inline-block">
            {fair.distance}
          </div>
          <h3 className="text-xl font-bold text-white drop-shadow-md">{fair.name}</h3>
        </div>
      </div>
      <div className="p-5">
        <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2 mb-4">{fair.description}</p>
        <div className="space-y-2 text-sm">
          <div className="flex items-center text-gray-500 dark:text-gray-400">
            <MapPin className="w-4 h-4 mr-2 text-indigo-500 dark:text-indigo-400" />
            <span>{fair.location}</span>
          </div>
          <div className="flex items-center text-gray-500 dark:text-gray-400">
            <Calendar className="w-4 h-4 mr-2 text-indigo-500 dark:text-indigo-400" />
            <span>{fair.date}</span>
          </div>
          <div className="flex items-center text-gray-500 dark:text-gray-400">
            <Clock className="w-4 h-4 mr-2 text-indigo-500 dark:text-indigo-400" />
            <span>{fair.timing}</span>
          </div>
          <div className="flex items-center text-gray-500 dark:text-gray-400">
            <Users className="w-4 h-4 mr-2 text-indigo-500 dark:text-indigo-400" />
            <span>{fair.attendance}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Fair;