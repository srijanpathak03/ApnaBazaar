import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  HelpCircle, MessageSquare, AlertCircle, Send, ArrowRight,
  ShoppingBag, Tag, CheckCircle, Truck, Loader
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const Support = () => {
  const { isAuthenticated, currentUser } = useAuth();
  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    subject: '',
    category: '',
    message: '',
    isVendorRequest: false
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');
    
    try {
      const response = await axios.post(`${API_URL}/support/ticket`, formData);
      
      if (response.data.success) {
        setFormSubmitted(true);
      } else {
        setSubmitError(response.data.message || 'Failed to submit your request. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting support request:', error);
      setSubmitError(
        error.response?.data?.message || 
        'An error occurred while submitting your request. Please try again later.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const categories = [
    { id: 'general', name: 'General Inquiry', icon: <HelpCircle className="w-5 h-5" /> },
    { id: 'order', name: 'Order Issue', icon: <Truck className="w-5 h-5" /> },
    { id: 'vendor', name: 'Vendor Support', icon: <ShoppingBag className="w-5 h-5" /> },
    { id: 'technical', name: 'Technical Issue', icon: <AlertCircle className="w-5 h-5" /> },
    { id: 'payment', name: 'Payment Problem', icon: <Tag className="w-5 h-5" /> }
  ];

  // Common questions for FAQ
  const faqs = [
    {
      question: "How do I apply to become a vendor?",
      answer: "To become a vendor, create an account and select the 'Vendor' option during signup. Then complete your shop details and submit for approval."
    },
    {
      question: "How long does it take to process my vendor application?",
      answer: "We typically review and process vendor applications within 2-3 business days. You'll receive an email notification once your application is approved."
    },
    {
      question: "What commission does ApnaBazaar charge?",
      answer: "ApnaBazaar charges a 5% commission on all sales. This helps us maintain the platform and provide marketing support for vendors."
    },
    {
      question: "How can I track my order?",
      answer: "Once your order is shipped, you'll receive a tracking number via email. You can also check your order status in your account dashboard."
    },
    {
      question: "What payment methods are accepted?",
      answer: "We accept credit/debit cards, UPI, net banking, and digital wallets like Paytm and Google Pay."
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-gray-900 dark:text-white"
        >
          How Can We Help You?
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-4 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
        >
          We're here to help with any questions about our marketplace, vendor onboarding, 
          or any technical issues you might encounter.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
        {/* Support Form */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8"
        >
          {!formSubmitted ? (
            <>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                <MessageSquare className="w-6 h-6 mr-2 text-indigo-600 dark:text-indigo-400" />
                Contact Support
              </h2>
              
              {submitError && (
                <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg">
                  <p>{submitError}</p>
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Your Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Email Address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Subject
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Category
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {categories.map(category => (
                      <label 
                        key={category.id} 
                        className={`flex items-center p-3 border ${
                          formData.category === category.id 
                            ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30' 
                            : 'border-gray-300 dark:border-gray-600'
                        } rounded-lg cursor-pointer hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors`}
                      >
                        <input
                          type="radio"
                          name="category"
                          value={category.id}
                          checked={formData.category === category.id}
                          onChange={handleChange}
                          className="sr-only"
                        />
                        <div className="mr-3 text-indigo-500 dark:text-indigo-400">
                          {category.icon}
                        </div>
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {category.name}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                    required
                    placeholder="Please describe your issue or question in detail..."
                  ></textarea>
                </div>
                
                <div className="flex items-center">
                  <input
                    id="isVendorRequest"
                    name="isVendorRequest"
                    type="checkbox"
                    checked={formData.isVendorRequest}
                    onChange={handleChange}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label htmlFor="isVendorRequest" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                    This is a request to become a vendor/shop owner
                  </label>
                </div>
                
                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader className="w-5 h-5 mr-2 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Send Message
                      </>
                    )}
                  </button>
                </div>
              </form>
            </>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 mb-6">
                <CheckCircle className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Thank You for Reaching Out!
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Your support request has been submitted successfully. We'll get back to you within 24-48 hours.
                <br />
                <span className="mt-2 inline-block text-sm">A confirmation has been sent to your email.</span>
              </p>
              <button
                onClick={() => {
                  setFormSubmitted(false);
                  setFormData({
                    name: currentUser?.name || '',
                    email: currentUser?.email || '',
                    subject: '',
                    category: '',
                    message: '',
                    isVendorRequest: false
                  });
                }}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-100 dark:bg-indigo-900/30 dark:text-indigo-400 rounded-md hover:bg-indigo-200 dark:hover:bg-indigo-800/40 transition-colors"
              >
                Submit Another Request
              </button>
            </motion.div>
          )}
        </motion.div>
        
        {/* FAQs */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8"
        >
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
            <HelpCircle className="w-6 h-6 mr-2 text-indigo-600 dark:text-indigo-400" />
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-5">
            {faqs.map((faq, index) => (
              <FAQ key={index} question={faq.question} answer={faq.answer} />
            ))}
          </div>
          
          <div className="mt-8 flex items-center justify-center">
            <Link to="/pricing" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 flex items-center text-sm font-medium transition-colors">
              <span>View our pricing for more information</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
        </motion.div>
      </div>
      
      {/* Contact Info */}
      <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-8 text-center">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Need Immediate Assistance?
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Our support team is available Monday to Friday, 9:00 AM to 6:00 PM IST
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="mailto:support@apnabazaar.com" className="px-6 py-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm text-indigo-600 dark:text-indigo-400 font-medium hover:shadow-md transition-shadow">
            support@apnabazaar.com
          </a>
          <a href="tel:+91-1234567890" className="px-6 py-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm text-indigo-600 dark:text-indigo-400 font-medium hover:shadow-md transition-shadow">
            +91-1234567890
          </a>
        </div>
      </div>
    </div>
  );
};

// FAQ Accordion Component
const FAQ = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full justify-between items-center text-left py-2 focus:outline-none"
      >
        <h3 className="text-md font-medium text-gray-900 dark:text-white">{question}</h3>
        <div
          className={`transform transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        >
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ArrowRight className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </motion.div>
        </div>
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ overflow: 'hidden' }}
      >
        <p className="mt-2 text-gray-600 dark:text-gray-300 text-sm">
          {answer}
        </p>
      </motion.div>
    </div>
  );
};

export default Support; 