// context/AuthContext.js
"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const getUserDataKey = (type) => {
    return user ? `${type}_${user.email}` : null;
  };

  useEffect(() => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("loggedUser"));
      if (storedUser) {
        setUser(storedUser);
      }
    } catch (error) {
      console.error("Erro ao carregar usuário do localStorage:", error);
      localStorage.removeItem("loggedUser");
    } finally {
      setLoading(false);
    }
  }, []);

  const login = (email, senha) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const foundUser = users.find(user => user.email.toLowerCase() === email.toLowerCase() && user.senha === senha);

    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem("loggedUser", JSON.stringify(foundUser));
      return true;
    }
    return false;
  };

  const cadastro = (nome, sobrenome, email, senha) => {
 
    const storedUsers = localStorage.getItem("users");
    const users = storedUsers ? JSON.parse(storedUsers) : [];

    const emailLower = email.toLowerCase();

    const emailAlreadyUsed = users.some(user => user.email.toLowerCase() === emailLower);

    if (emailAlreadyUsed) {
      return false;
    }

    const newUser = { nome, sobrenome, email, senha };
    const updatedUsers = [...users, newUser];

    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setUser(newUser);
    localStorage.setItem("loggedUser", JSON.stringify(newUser));

    return true;
  };


  const updateProfile = (currentEmail, updatedData) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const userIndex = users.findIndex(u => u.email.toLowerCase() === currentEmail.toLowerCase());

    if (userIndex === -1) {
      return { success: false, message: "Usuário não encontrado para atualização." };
    }

    if (updatedData.email && updatedData.email.toLowerCase() !== currentEmail.toLowerCase() &&
      users.some(u => u.email.toLowerCase() === updatedData.email.toLowerCase())) {
      return { success: false, message: "Este novo email já está em uso por outro usuário." };
    }

    users[userIndex] = { ...users[userIndex], ...updatedData };
    localStorage.setItem("users", JSON.stringify(users));

    if (user && user.email.toLowerCase() === currentEmail.toLowerCase()) {
      setUser(users[userIndex]);
      localStorage.setItem("loggedUser", JSON.stringify(users[userIndex]));
    }

    return { success: true, message: "Perfil atualizado com sucesso!" };
  };

  const updatePassword = (email, currentPassword, newPassword) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const userIndex = users.findIndex(u => u.email.toLowerCase() === email.toLowerCase());

    if (userIndex === -1) {
      return { success: false, message: "Usuário não encontrado." };
    }

    if (users[userIndex].senha !== currentPassword) {
      return { success: false, message: "Senha atual incorreta." };
    }

    users[userIndex].senha = newPassword;
    localStorage.setItem("users", JSON.stringify(users));

    if (user && user.email.toLowerCase() === email.toLowerCase()) {
      setUser({ ...user, senha: newPassword });
      localStorage.setItem("loggedUser", JSON.stringify({ ...user, senha: newPassword }));
    }

    return { success: true, message: "Senha alterada com sucesso!" };
  };

  const logout = () => {
    router.push("/login");

    setTimeout(() => {
      localStorage.removeItem("loggedUser");
      setUser(null);
      
    }, 4000);
  };

  const loadUserCart = () => {
    if (!user) return [];
    const cartKey = getUserDataKey('cart');
    try {
      const storedCart = JSON.parse(localStorage.getItem(cartKey));
      return storedCart || [];
    } catch (error) {
      console.error(`Erro ao carregar o carrinho para ${user.email}:`, error);
      localStorage.removeItem(cartKey);
      return [];
    }
  };

  const saveUserCart = (cartItems) => {
    if (!user) return;
    const cartKey = getUserDataKey('cart');
    try {
      localStorage.setItem(cartKey, JSON.stringify(cartItems));
    } catch (error) {
      console.error(`Erro ao salvar o carrinho para ${user.email}:`, error);
    }
  };

  const loadUserOrders = () => {
    if (!user) return [];
    const ordersKey = getUserDataKey('orders');
    try {
      const storedOrders = JSON.parse(localStorage.getItem(ordersKey));
      return storedOrders || [];
    } catch (error) {
      console.error(`Erro ao carregar pedidos para ${user.email}:`, error);
      localStorage.removeItem(ordersKey);
      return [];
    }
  };


  const saveUserOrder = (order) => {
    if (!user) return false;
    const ordersKey = getUserDataKey('orders');
    const existingOrders = loadUserOrders();
    const updatedOrders = [...existingOrders, { ...order, orderId: Date.now() }]; 
    try {
      localStorage.setItem(ordersKey, JSON.stringify(updatedOrders));
      return true;
    } catch (error) {
      console.error(`Erro ao salvar o pedido para ${user.email}:`, error);
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        cadastro,
        logout,
        updatePassword,
        updateProfile,
        loadUserCart,
        saveUserCart,
        loadUserOrders,
        saveUserOrder,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);