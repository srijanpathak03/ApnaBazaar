import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Market from './pages/Market';
import MarketDetail from './pages/MarketDetails';
import ShopDetails from './pages/ShopDetails';
import ProductDetails from './pages/ProductDetails';
import Fair from './pages/Fair';
import Pricing from './pages/Pricing';
import CartDrawer from './components/CartDrawer';

function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <Router>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
            <Navbar />
            <CartDrawer />
            <main>
              <Routes>
                <Route path="/" element={<Market />} />
                <Route path="/market/:id" element={<MarketDetail />} />
                <Route path="/market/:marketId/shop/:shopId" element={<ShopDetails />} />
                <Route path="/market/:marketId/shop/:shopId/product/:productId" element={<ProductDetails />} />
                <Route path="/fair" element={<Fair />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
          </div>
        </Router>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;