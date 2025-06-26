// src/components/Navbar.js
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { darkMode, setDarkMode } = useTheme();
  const { cart } = useCart();

  return (
    <nav className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 shadow">
      <div className="text-xl font-bold dark:text-white">ShopEZ</div>
      <div className="space-x-6">
        <Link to="/" className="text-gray-700 dark:text-gray-200 hover:underline">Home</Link>
        <Link to="/products" className="text-gray-700 dark:text-gray-200 hover:underline">Products</Link>
        <Link to="/cart" className="text-gray-700 dark:text-gray-200 hover:underline">
          Cart ({cart.length})
        </Link>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="ml-4 px-2 py-1 rounded border dark:border-white border-gray-700 text-sm dark:text-white"
        >
          {darkMode ? '🌞 Light' : '🌙 Dark'}
        </button>
      </div>
    </nav>
  );
}
