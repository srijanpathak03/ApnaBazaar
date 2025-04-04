import React, { useState } from 'react';
import { CheckCircle, XCircle, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState('monthly');
  const navigate = useNavigate();
  
  // Define pricing plans
  const plans = [
    {
      name: 'Free',
      description: 'Basic features for small vendors just getting started',
      monthlyPrice: 0,
      yearlyPrice: 0,
      features: [
        { name: 'List up to 10 products', included: true },
        { name: 'Basic analytics', included: true },
        { name: 'Single shop', included: true },
        { name: 'Standard support', included: true },
        { name: 'Basic shop customization', included: true },
        { name: 'Community access', included: true },
        { name: 'Priority placement', included: false },
        { name: 'Promotional banners', included: false },
        { name: 'Advanced analytics', included: false },
        { name: 'Multiple shops', included: false },
      ],
      cta: 'Current Plan',
      btnColor: 'bg-gray-500 hover:bg-gray-600',
      popular: false
    },
    {
      name: 'Standard',
      description: 'All essentials for growing businesses',
      monthlyPrice: 599,
      yearlyPrice: 5990,
      features: [
        { name: 'List up to 50 products', included: true },
        { name: 'Advanced analytics', included: true },
        { name: 'Single shop', included: true },
        { name: 'Priority support', included: true },
        { name: 'Advanced shop customization', included: true },
        { name: 'Community access', included: true },
        { name: 'Priority placement', included: true },
        { name: 'Promotional banners', included: true },
        { name: 'Bulk product upload', included: true },
        { name: 'Multiple shops', included: false },
      ],
      cta: 'Upgrade Now',
      btnColor: 'bg-indigo-600 hover:bg-indigo-700',
      popular: true
    },
    {
      name: 'Premium',
      description: 'Advanced features for established businesses',
      monthlyPrice: 1299,
      yearlyPrice: 13990,
      features: [
        { name: 'Unlimited products', included: true },
        { name: 'Premium analytics', included: true },
        { name: 'Multiple shops (up to 3)', included: true },
        { name: 'Dedicated support', included: true },
        { name: 'Custom shop themes', included: true },
        { name: 'Community access', included: true },
        { name: 'Top placement in search', included: true },
        { name: 'Featured promotional banners', included: true },
        { name: 'Bulk product upload', included: true },
        { name: 'API access', included: true },
      ],
      cta: 'Go Premium',
      btnColor: 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700',
      popular: false
    }
  ];

  const handleUpgrade = (plan) => {
    if (plan.monthlyPrice === 0) {
      return; // Already on free plan
    }
    
    // In a real app, you'd navigate to checkout with the selected plan
    navigate('/checkout', { 
      state: { 
        planName: plan.name,
        price: billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice,
        billingCycle: billingCycle,
        razorpayKeyId: 'rzp_test_XaNlidEzBNbJzK'
      } 
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Pricing Plans for Vendors</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
          Choose the perfect plan for your business needs
        </p>
        
        {/* Billing toggle */}
        <div className="flex items-center justify-center mb-8">
          <span className={`mr-3 text-sm font-medium ${billingCycle === 'monthly' ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>
            Monthly
          </span>
          <button 
            onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${billingCycle === 'yearly' ? 'bg-indigo-600' : 'bg-gray-200 dark:bg-gray-700'}`}
          >
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${billingCycle === 'yearly' ? 'translate-x-6' : 'translate-x-1'}`} />
          </button>
          <span className={`ml-3 text-sm font-medium ${billingCycle === 'yearly' ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>
            Yearly <span className="text-green-500 font-medium">(Save 15%)</span>
          </span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {plans.map((plan, index) => (
          <div 
            key={index} 
            className={`rounded-2xl bg-white dark:bg-gray-800 shadow-lg overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-xl ${plan.popular ? 'ring-2 ring-indigo-500 relative' : ''}`}
          >
            {plan.popular && (
              <div className="absolute top-0 right-0 bg-indigo-600 text-white text-xs font-bold px-3 py-1 uppercase tracking-wider transform translate-x-2 -translate-y-2 rotate-45">
                Popular
              </div>
            )}
            
            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{plan.name}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">{plan.description}</p>
              
              <div className="flex items-baseline mb-8">
                <span className="text-4xl font-extrabold text-gray-900 dark:text-white">₹{billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice}</span>
                <span className="ml-2 text-gray-600 dark:text-gray-400">
                  {billingCycle === 'monthly' ? '/month' : '/year'}
                </span>
              </div>
              
              <button
                onClick={() => handleUpgrade(plan)}
                className={`w-full py-3 px-4 rounded-lg text-white font-medium transition-colors ${plan.btnColor} ${plan.monthlyPrice === 0 ? 'cursor-default opacity-75' : ''}`}
              >
                {plan.cta}
              </button>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700/40 p-6">
              <p className="font-medium text-gray-900 dark:text-white mb-4">Plan includes:</p>
              <ul className="space-y-3">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    {feature.included ? (
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mr-2" />
                    ) : (
                      <XCircle className="h-5 w-5 text-gray-400 flex-shrink-0 mr-2" />
                    )}
                    <span className={feature.included ? 'text-gray-700 dark:text-gray-300' : 'text-gray-500 dark:text-gray-500'}>
                      {feature.name}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
      
      {/* FAQ Section */}
      <div className="max-w-4xl mx-auto mt-20">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Frequently Asked Questions</h2>
        
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Can I upgrade my plan later?</h3>
            <p className="text-gray-600 dark:text-gray-400">Yes, you can upgrade your plan at any time. Your new features will be immediately available, and we'll prorate the cost.</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Do you offer refunds?</h3>
            <p className="text-gray-600 dark:text-gray-400">We offer a 7-day money-back guarantee for all paid plans. If you're not satisfied, contact our support team within 7 days of your purchase.</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">What payment methods do you accept?</h3>
            <p className="text-gray-600 dark:text-gray-400">We accept credit/debit cards, UPI, NetBanking, and digital wallets through our secure payment partner, Razorpay.</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Can I change between monthly and yearly billing?</h3>
            <p className="text-gray-600 dark:text-gray-400">Yes, you can switch between monthly and yearly billing at any time. If you switch from monthly to yearly, you'll receive the annual discount immediately.</p>
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="mt-20 text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Still have questions?</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">Our team is happy to help you find the perfect plan for your business.</p>
        <button className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors">
          Contact Support
        </button>
      </div>
    </div>
  );
};

export default Pricing;