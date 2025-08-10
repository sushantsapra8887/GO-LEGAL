import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Total item count for cart icon
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  // Total price calculation
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  // Add to cart
  const addToCart = (product) => {
  setCartItems((prevItems) => {
    const existingItemIndex = prevItems.findIndex((item) => item.id === product.id);

    if (existingItemIndex !== -1) {
      // Item exists: increase quantity
      const updatedItems = [...prevItems];
      updatedItems[existingItemIndex].quantity += 1;
      return updatedItems;
    }

    // Item not in cart: add it with quantity 1
    return [...prevItems, { ...product, quantity: 1 }];
  });
};

  // Remove an item completely
  const removeFromCart = (id, name) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => !(item.id === id && item.name === name))
    );
  };

  // Update quantity
  const updateQuantity = (id, name, amount) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item.id === id && item.name === name
            ? { ...item, quantity: Math.max(1, item.quantity + amount) }
            : item
        )
    );
  };

  // Clear all
  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        totalItems,
        totalPrice,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);