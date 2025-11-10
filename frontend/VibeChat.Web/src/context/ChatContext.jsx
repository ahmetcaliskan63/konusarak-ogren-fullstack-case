import { createContext, useState, useEffect } from 'react';

export const ChatContext = createContext();

export function ChatProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('vibechat_user');
    if (savedUser) {
      try {
        setCurrentUser(JSON.parse(savedUser));
      } catch (err) {
        console.error('Kullanıcı bilgisi yüklenemedi:', err);
        localStorage.removeItem('vibechat_user');
      }
    }
  }, []);

  const login = (user) => {
    setCurrentUser(user);
    localStorage.setItem('vibechat_user', JSON.stringify(user));
  };

  const logout = () => {
    setCurrentUser(null);
    setMessages([]);
    localStorage.removeItem('vibechat_user');
  };

  const addMessage = (message) => {
    setMessages((prev) => [...prev, message]);
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

