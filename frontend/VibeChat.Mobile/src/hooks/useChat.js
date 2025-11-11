import { useContext, useCallback } from 'react';
import { ChatContext } from '../context/ChatContext';
import * as chatApi from '../api/chatApi';

export function useChat() {
  const context = useContext(ChatContext);

  if (!context) {
    throw new Error('useChat must be used within ChatProvider');
  }

  const {
    currentUser,
    messages,
    loading,
    error,
    setMessages,
    setLoading,
    setError,
    login: contextLogin,
    logout: contextLogout,
    addMessage,
    updateMessage,
    clearError,
  } = context;

  const loadMessages = useCallback(async () => {
    if (!currentUser) return;

    setLoading(true);
    setError(null);

    try {
      const data = await chatApi.getMessages(50);
      setMessages(data);
    } catch (err) {
      setError(err.message || 'Mesajlar yüklenemedi');
    } finally {
      setLoading(false);
    }
  }, [currentUser, setMessages, setLoading, setError]);

  const sendMessage = async (content) => {
    if (!currentUser || !content.trim()) return;

    const optimisticMessage = {
      id: `temp-${Date.now()}`,
      userId: currentUser.id,
      username: currentUser.username,
      content: content.trim(),
      timestamp: new Date().toISOString(),
      isOptimistic: true,
    };

    addMessage(optimisticMessage);

    try {
      const savedMessage = await chatApi.sendMessage(
        currentUser.id,
        content.trim()
      );

      updateMessage(optimisticMessage.id, {
        ...savedMessage,
        isOptimistic: false,
      });

      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === optimisticMessage.id
            ? { ...savedMessage, isOptimistic: false }
            : msg
        )
      );
    } catch (err) {
      setError(err.message || 'Mesaj gönderilemedi');
      setMessages((prev) =>
        prev.filter((msg) => msg.id !== optimisticMessage.id)
      );
      throw err;
    }
  };

  const login = async (username) => {
    setLoading(true);
    setError(null);

    try {
      const user = await chatApi.createUser(username);
      await contextLogin(user);
      return user;
    } catch (err) {
      setError(err.message || 'Giriş yapılamadı');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await contextLogout();
  };

  return {
    currentUser,
    messages,
    loading,
    error,
    loadMessages,
    sendMessage,
    login,
    logout,
    clearError,
  };
}

