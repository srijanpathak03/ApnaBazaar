import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { CreditCard, Truck, MapPin, Check, AlertCircle, ChevronDown, ChevronUp, Package } from 'lucide-react';

// Razorpay test credentials - key_id is used in frontend, key_secret would normally only be used on backend
const RAZORPAY_KEY_ID = 'rzp_test_XaNlidEzBNbJzK';

const Checkout = () => {
  const location = useLocation();
  const { currentUser, isAuthenticated } = useAuth();
  const { cartItems, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  
  // Get data from navigation state or use context values
  const cartData = location.state?.cartItems || cartItems;
  const totalAmount = location.state?.total || (cartTotal + cartTotal * 0.18).toFixed(2);
  const razorpayKeyId = location.state?.razorpayKeyId || RAZORPAY_KEY_ID;
  
  const [loading, setLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);
  
  // Form data
  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: currentUser?.phone || '',
    address: {
      street: '',
      city: '',
      state: '',
      postalCode: '',
      country: 'India'
    },
    paymentMethod: 'razorpay',
    saveAddress: true
  });
  
  // Shipping options
  const shippingOptions = [
    { id: 'standard', name: 'Standard Delivery', price: 40, days: '3-5' },
    { id: 'express', name: 'Express Delivery', price: 100, days: '1-2' }
  ];
  
  const [selectedShipping, setSelectedShipping] = useState(shippingOptions[0]);
  
  // Redirect if not logged in
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login?redirect=checkout');
    }
  }, [isAuthenticated, navigate]);
  
  // Check if cart is empty
  useEffect(() => {
    if (cartData?.length === 0 && !paymentSuccess) {
      navigate('/');
    }
  }, [cartData, navigate, paymentSuccess]);
  
  // Calculate order summary
  const subtotal = parseFloat(cartTotal);
  const shipping = selectedShipping.price;
  const tax = Math.round(subtotal * 0.05);
  const total = subtotal + shipping + tax;
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name.startsWith('address.')) {
      const addressField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        address: {
          ...prev.address,
          [addressField]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };
  
  const handleShippingChange = (option) => {
    setSelectedShipping(option);
  };
  
  const validateForm = () => {
    const { name, email, phone, address } = formData;
    if (!name || !email || !phone || !address.street || !address.city || !address.state || !address.postalCode) {
      setError('Please fill in all required fields');
      return false;
    }
    return true;
  };
  
  // Load Razorpay script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    
    script.onload = () => {
      console.log('Razorpay script loaded successfully');
      setRazorpayLoaded(true);
    };
    
    script.onerror = (error) => {
      console.error('Failed to load Razorpay script:', error);
      setError('Failed to load payment gateway. Please try again later.');
    };
    
    document.body.appendChild(script);
    
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);
  
  // Initiate Razorpay payment
  const initiatePayment = () => {
    if (!validateForm()) return;
    
    if (!razorpayLoaded) {
      setError('Payment gateway is still loading. Please try again in a few seconds.');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    // Generate a receipt ID that doesn't require server-side order creation
    const receiptId = `rcpt_${Math.random().toString(36).substring(2, 15)}`;
    
    // Configure Razorpay options
    const options = {
      key: razorpayKeyId,
      amount: Math.round(total * 100), // Amount in paisa
      currency: 'INR',
      name: 'ApnaBazaar',
      description: 'Purchase from ApnaBazaar',
      image: 'https://i.ibb.co/qgbdqZ3/apnabazaar-logo.png',
      // In production, order_id should come from your backend
      // We're omitting it for direct client-side testing
      receipt: receiptId,
      prefill: {
        name: formData.name,
        email: formData.email,
        contact: formData.phone
      },
      notes: {
        address: JSON.stringify(formData.address)
      },
      theme: {
        color: '#4f46e5'
      },
      handler: function(response) {
        handlePaymentSuccess(response);
      },
      modal: {
        ondismiss: function() {
          setLoading(false);
          console.log('Payment modal closed');
        }
      }
    };
    
    try {
      if (typeof window.Razorpay === 'undefined') {
        throw new Error('Razorpay SDK not loaded');
      }
      
      const razorpayInstance = new window.Razorpay(options);
      razorpayInstance.on('payment.failed', function(response) {
        console.error('Payment failed:', response.error);
        setError(`Payment failed: ${response.error.description}`);
        setLoading(false);
      });
      razorpayInstance.open();
    } catch (err) {
      console.error('Razorpay error:', err);
      setError(`Failed to initialize payment: ${err.message}`);
      setLoading(false);
    }
  };
  
  const handlePaymentSuccess = (response) => {
    console.log('Payment successful:', response);
    
    // In a real app, you would verify the payment with your backend
    // Here we'll just simulate success for the demo
    setPaymentSuccess(true);
    setLoading(false);
    
    // Clear the cart
    clearCart();
  };
  
  const placeOrder = (e) => {
    e.preventDefault();
    initiatePayment();
  };
  
  // Payment success screen
  if (paymentSuccess) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 text-center">
          <div className="h-16 w-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="h-8 w-8 text-green-600 dark:text-green-400" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Payment Successful!</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Your order has been placed successfully. We have sent you an email with the order details.
          </p>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Order ID: {Math.random().toString(36).substring(2, 10).toUpperCase()}
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center">
            <button
              onClick={() => navigate('/')}
              className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Continue Shopping
            </button>
            <button
              onClick={() => navigate('/profile')}
              className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              View Profile
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Checkout</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Checkout Form */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
            {/* Shipping Address */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-indigo-600 dark:text-indigo-400" />
                  Shipping Address
                </h2>
                <button
                  onClick={() => setShowAddressForm(!showAddressForm)}
                  className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 text-sm font-medium flex items-center"
                >
                  {showAddressForm ? (
                    <>
                      <ChevronUp className="w-4 h-4 mr-1" />
                      Hide Form
                    </>
                  ) : (
                    <>
                      <ChevronDown className="w-4 h-4 mr-1" />
                      Show Form
                    </>
                  )}
                </button>
              </div>
              
              {showAddressForm && (
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Full Name *
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
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Phone *
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Email Address *
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
                  
                  <div>
                    <label htmlFor="address.street" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Street Address *
                    </label>
                    <input
                      id="address.street"
                      name="address.street"
                      type="text"
                      value={formData.address.street}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label htmlFor="address.city" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        City *
                      </label>
                      <input
                        id="address.city"
                        name="address.city"
                        type="text"
                        value={formData.address.city}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="address.state" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        State *
                      </label>
                      <input
                        id="address.state"
                        name="address.state"
                        type="text"
                        value={formData.address.state}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="address.postalCode" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Postal Code *
                      </label>
                      <input
                        id="address.postalCode"
                        name="address.postalCode"
                        type="text"
                        value={formData.address.postalCode}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      id="saveAddress"
                      name="saveAddress"
                      type="checkbox"
                      checked={formData.saveAddress}
                      onChange={(e) => setFormData(prev => ({ ...prev, saveAddress: e.target.checked }))}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor="saveAddress" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                      Save this address for future orders
                    </label>
                  </div>
                </form>
              )}
              
              {!showAddressForm && (
                <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <p className="font-medium text-gray-900 dark:text-white">{formData.name}</p>
                  <p className="text-gray-600 dark:text-gray-300 mt-1">{formData.address.street}</p>
                  <p className="text-gray-600 dark:text-gray-300">
                    {formData.address.city}, {formData.address.state} {formData.address.postalCode}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 mt-1">{formData.phone}</p>
                  <p className="text-gray-600 dark:text-gray-300">{formData.email}</p>
                </div>
              )}
            </div>
            
            {/* Shipping Method */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center mb-4">
                <Truck className="w-5 h-5 mr-2 text-indigo-600 dark:text-indigo-400" />
                Shipping Method
              </h2>
              
              <div className="space-y-4">
                {shippingOptions.map((option) => (
                  <div 
                    key={option.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                      selectedShipping.id === option.id
                        ? 'border-indigo-600 dark:border-indigo-400 bg-indigo-50 dark:bg-indigo-900/20'
                        : 'border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                    }`}
                    onClick={() => handleShippingChange(option)}
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className={`h-5 w-5 rounded-full border ${
                          selectedShipping.id === option.id
                            ? 'border-indigo-600 dark:border-indigo-400'
                            : 'border-gray-300 dark:border-gray-600'
                        }`}>
                          {selectedShipping.id === option.id && (
                            <div className="h-3 w-3 mx-auto mt-1 rounded-full bg-indigo-600 dark:bg-indigo-400" />
                          )}
                        </div>
                        <div className="ml-3">
                          <p className="font-medium text-gray-900 dark:text-white">{option.name}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Delivery in {option.days} business days</p>
                        </div>
                      </div>
                      <div className="font-medium text-gray-900 dark:text-white">₹{option.price}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Payment Method */}
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center mb-4">
                <CreditCard className="w-5 h-5 mr-2 text-indigo-600 dark:text-indigo-400" />
                Payment Method
              </h2>
              
              <div className="border rounded-lg p-4 border-indigo-600 dark:border-indigo-400 bg-indigo-50 dark:bg-indigo-900/20">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="h-5 w-5 rounded-full border border-indigo-600 dark:border-indigo-400">
                      <div className="h-3 w-3 mx-auto mt-1 rounded-full bg-indigo-600 dark:bg-indigo-400" />
                    </div>
                    <div className="ml-3">
                      <p className="font-medium text-gray-900 dark:text-white">
                        Pay with Razorpay
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Credit/Debit Card, UPI, NetBanking, Wallet
                      </p>
                    </div>
                  </div>
                  <div>
                    <img src="https://razorpay.com/assets/razorpay-logo.svg" alt="Razorpay" className="h-6" />
                  </div>
                </div>
              </div>
              
              {error && (
                <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg flex items-start text-red-700 dark:text-red-400">
                  <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0" />
                  {error}
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden sticky top-8">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Order Summary</h2>
              
              <div className="max-h-60 overflow-y-auto space-y-4 mb-4">
                {cartData?.map((item) => (
                  <div key={item.id} className="flex">
                    <div className="h-16 w-16 flex-shrink-0 rounded-md overflow-hidden bg-gray-200 dark:bg-gray-700">
                      {item.image ? (
                        <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center">
                          <Package className="h-8 w-8 text-gray-400" />
                        </div>
                      )}
                    </div>
                    <div className="ml-4 flex-1">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{item.name}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {item.quantity} x ₹{item.price}
                      </p>
                    </div>
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      ₹{item.quantity * item.price}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="space-y-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex justify-between">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Subtotal</p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">₹{subtotal}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Shipping</p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">₹{shipping}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Tax</p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">₹{tax}</p>
                </div>
                <div className="flex justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-base font-medium text-gray-900 dark:text-white">Total</p>
                  <p className="text-base font-medium text-gray-900 dark:text-white">₹{total}</p>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <button
                onClick={placeOrder}
                disabled={loading || !isAuthenticated || !razorpayLoaded}
                className="w-full flex justify-center items-center px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Processing...' : razorpayLoaded ? 'Place Order' : 'Loading Payment Gateway...'}
              </button>
              
              <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-4">
                By placing your order, you agree to our Terms of Service and Privacy Policy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout; 