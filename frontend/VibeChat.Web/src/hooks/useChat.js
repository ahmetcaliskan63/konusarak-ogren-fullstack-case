import { useContext } from 'react';
import { ChatContext } from '../context/ChatContext';
import { createUser, getMessages, sendMessage as sendMessageApi } from '../api/chatApi';

export function useChat() {
  const context = useContext(ChatContext);

  if (!context) {
    throw new Error('useChat hook ChatProvider içinde kullanılmalıdır');
  }

  const {
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
  } = context;

  const handleLogin = async (username) => {
    if (!username || username.trim().length < 3) {
      throw new Error('Kullanıcı adı en az 3 karakter olmalıdır');
    }

    setLoading(true);
    setError(null);

    try {
      const user = await createUser(username.trim());
      login(user);
      return user;
    } catch (err) {
      const errorMessage = err.message || 'Giriş yapılırken bir hata oluştu';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const loadMessages = async () => {
    setLoading(true);
    setError(null);

    try {
      const fetchedMessages = await getMessages();
      setMessages(fetchedMessages);
    } catch (err) {
      const errorMessage = err.message || 'Mesajlar yüklenirken bir hata oluştu';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async (content) => {
    if (!currentUser) {
      throw new Error('Mesaj göndermek için giriş yapmalısınız');
    }

    if (!content || content.trim().length === 0) {
      throw new Error('Mesaj boş olamaz');
    }

    const tempMessage = {
      id: `temp-${Date.now()}`,
      content: content.trim(),
      userId: currentUser.id,
      username: currentUser.username,
      timestamp: new Date().toISOString(),
      sentiment: null,
      sentimentScore: null,
      isOptimistic: true,
    };

    addMessage(tempMessage);

    try {
      const sentMessage = await sendMessageApi(currentUser.id, content.trim());
      
      updateMessage(tempMessage.id, {
        ...sentMessage,
        isOptimistic: false,
      });

      return sentMessage;
    } catch (err) {
      setMessages((prev) => prev.filter((msg) => msg.id !== tempMessage.id));
      
      const errorMessage = err.message || 'Mesaj gönderilirken bir hata oluştu';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  return {
    currentUser,
    messages,
    loading,
    error,
    handleLogin,
    logout,
    loadMessages,
    sendMessage,
    clearError,
  };
}

