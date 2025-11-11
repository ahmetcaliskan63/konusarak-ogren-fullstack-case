import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ChatContext = createContext();

export function ChatProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const savedUser = await AsyncStorage.getItem('vibechat_user');
      if (savedUser) {
        setCurrentUser(JSON.parse(savedUser));
      }
    } catch (err) {
      console.error('Kullanıcı bilgisi yüklenemedi:', err);
      await AsyncStorage.removeItem('vibechat_user');
    }
  };

  const login = async (user) => {
    try {
      setCurrentUser(user);
      await AsyncStorage.setItem('vibechat_user', JSON.stringify(user));
    } catch (err) {
      console.error('Kullanıcı kaydedilemedi:', err);
    }
  };

  const logout = async () => {
    try {
      setCurrentUser(null);
      setMessages([]);
      await AsyncStorage.removeItem('vibechat_user');
    } catch (err) {
      console.error('Çıkış yapılamadı:', err);
    }
  };

  const addMessage = (message) => {
    setMessages((prev) => [message, ...prev]);
  };

  const updateMessage = (messageId, updates) => {
    setMessages((prev) =>
      prev.map((msg) => (msg.id === messageId ? { ...msg, ...updates } : msg))
    );
  };

  const clearError = () => {
    setError(null);
  };

  const value = {
    currentUser,
    messages,
    loading,
    error,
    setMessages,
    setLoading,
    setError,
    login,
    logout,
    addMessage,
    updateMessage,
    clearError,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}
