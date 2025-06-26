import { createContext, useContext, useState } from 'react';

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart(prev => {
      const exists = prev.find(p => p.id === product.id);
      const updatedCart = exists
        ? prev.map(p =>
            p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
          )
        : [...prev, { ...product, quantity: 1 }];

      console.log('🛒 Updated Cart:', updatedCart); // ✅ Debug tip
      return updatedCart;
    });
  };

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const incrementQty = (productId) => {
    setCart(prev =>
      prev.map(item =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrementQty = (productId) => {
    setCart(prev =>
      prev
        .map(item =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter(item => item.quantity > 0)
    );
  };

  return (
    <CartContext.Provider
      value={{ cart, setCart, addToCart, removeFromCart, incrementQty, decrementQty }}
    >
      {children}
    </CartContext.Provider>
  );
}
