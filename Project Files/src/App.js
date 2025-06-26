import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Products from './pages/Products';
import Cart from './pages/Cart';
import CheckoutSuccess from './pages/CheckoutSuccess';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/checkout-success" element={<CheckoutSuccess />} />
        <Route path="/checkout-success" element={<CheckoutSuccess />} />
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
  );
}

export default App;
