// context/CartContext.js
'use client';

import React, { useContext, createContext, useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext"; // Import useAuth

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user, loading: authLoading, loadUserCart, saveUserCart } = useAuth(); // Get new functions from AuthContext
  const [cartItems, setCartItems] = useState([]);
  const [loadingCart, setLoadingCart] = useState(true);

  // Load cart when user or authLoading changes
  useEffect(() => {
    if (!authLoading) {
      if (user) {
        setCartItems(loadUserCart()); // Use loadUserCart from AuthContext
      } else {
        setCartItems([]); // Clear cart if no user
      }
      setLoadingCart(false);
    }
  }, [user, authLoading, loadUserCart]); // Add loadUserCart to dependencies

  // Save cart whenever cartItems change, but only if not loading and user exists
  useEffect(() => {
    if (!loadingCart && user) {
      saveUserCart(cartItems); // Use saveUserCart from AuthContext
    }
  }, [user, cartItems, loadingCart, saveUserCart]); // Add saveUserCart to dependencies

  const addItemToCart = (item, quantityToAdd = 1) => {
    if (!user) {
      alert("Você precisa estar logado para adicionar itens ao carrinho!");
      return;
    }
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex((i) => i.id === item.id);

      if (existingItemIndex > -1) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + quantityToAdd,
        };
        return updatedItems;
      } else {
        return [...prevItems, { ...item, quantity: quantityToAdd }];
      }
    });
  };

  const removeItemFromCart = (itemId) => {
    if (!user) {
      alert("Você precisa estar logado para remover itens do carrinho!");
      return;
    }
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  const updateItemQuantity = (itemId, newQuantity) => {
    if (!user) {
      alert("Você precisa estar logado para atualizar o carrinho!");
      return;
    }
    if (newQuantity <= 0) {
      removeItemFromCart(itemId);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const clearCart = () => {
    if (!user) {
      alert("Você precisa estar logado para limpar o carrinho!");
      return;
    }
    setCartItems([]);
    saveUserCart([]); // Explicitly save an empty cart
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getSubtotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const priceAfterDiscount = item.price * (1 - (item.discountPercentage || 0) / 100);
      return total + priceAfterDiscount * item.quantity;
    }, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        loadingCart,
        addItemToCart,
        removeItemFromCart,
        updateItemQuantity,
        clearCart,
        getTotalItems,
        getSubtotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);