import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Market from './pages/Market';
import MarketDetail from './pages/MarketDetails';
import ShopDetails from './pages/ShopDetails';
import ProductDetails from './pages/ProductDetails';
import Fair from './pages/Fair';
import Pricing from './pages/Pricing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import VendorDashboard from './pages/VendorDashboard';
import CartDrawer from './components/CartDrawer';
import Checkout from './pages/Checkout';
import { useAuth } from './context/AuthContext';
import UserProfile from './pages/UserProfile';
import VendorProfile from './pages/VendorProfile';

// Protected route component for vendor routes
const VendorRoute = ({ children }) => {
  const { isAuthenticated, isVendor, userLoading } = useAuth();
  
  if (userLoading) {
    return <div className="p-8 text-center">Loading...</div>;
  }
  
  if (!isAuthenticated || !isVendor) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

// Protected route component for user routes
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, userLoading } = useAuth();
  
  if (userLoading) {
    return <div className="p-8 text-center">Loading...</div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login?redirect=checkout" replace />;
  }
  
  return children;
};

// Create a wrapper component that uses the auth context
const AppRoutes = () => {
  const { isVendor, isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      {/* Only show navbar on non-vendor dashboard routes */}
      {!isVendor || !isAuthenticated || !window.location.pathname.startsWith('/vendor') ? (
        <>
          <Navbar />
          <CartDrawer />
        </>
      ) : null}
      
      <main>
        <Routes>
          {/* Redirect vendors to their dashboard as the default route */}
          <Route path="/" element={
            isAuthenticated && isVendor ? 
              <Navigate to="/vendor/dashboard" replace /> : 
              <Market />
          } />
          
          <Route path="/market/:id" element={<MarketDetail />} />
          <Route path="/market/:marketId/shop/:shopId" element={<ShopDetails />} />
          <Route path="/market/:marketId/shop/:shopId/product/:productId" element={<ProductDetails />} />
          <Route path="/fair" element={<Fair />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* Checkout Route */}
          <Route 
            path="/checkout" 
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            } 
          />
          
          {/* Vendor Dashboard Routes */}
          <Route 
            path="/vendor/dashboard/*" 
            element={
              <VendorRoute>
                <VendorDashboard />
              </VendorRoute>
            } 
          />
          
          {/* Profile Routes */}
          <Route 
            path="/profile" 
            element={
              isAuthenticated ? 
                (isVendor ? <Navigate to="/vendor/profile" replace /> : <UserProfile />) : 
                <Navigate to="/login" replace />
            } 
          />
          
          <Route 
            path="/vendor/profile" 
            element={
              isAuthenticated && isVendor ? 
                <VendorProfile /> : 
                <Navigate to={isAuthenticated ? "/profile" : "/login"} replace />
            } 
          />
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <Router>
            <AppRoutes />
          </Router>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;