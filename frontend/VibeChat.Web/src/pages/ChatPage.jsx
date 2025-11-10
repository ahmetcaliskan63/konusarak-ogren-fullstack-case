import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useChat } from '../hooks/useChat';
import ChatList from '../components/Chat/ChatList';
import ChatInput from '../components/Chat/ChatInput';
import Button from '../components/Common/Button';
import { IoLogOutOutline } from 'react-icons/io5';

export default function ChatPage() {
  const { currentUser, messages, loading, error, loadMessages, sendMessage, logout, clearError } = useChat();
  const navigate = useNavigate();
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (!currentUser) {
      navigate('/');
      return;
    }

    loadMessages().catch((err) => {
      console.error('Mesajlar yüklenemedi:', err);
    });
  }, [currentUser, navigate]);

  const handleSendMessage = async (content) => {
    setSending(true);
    try {
      await sendMessage(content);
    } catch (err) {
      console.error('Mesaj gönderilemedi:', err);
    } finally {
      setSending(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!currentUser) {
    return null;
  }

  return (
    <div className="h-screen flex flex-col bg-app-bg">
      <header className="sticky top-0 z-20 bg-app-surface border-b border-app-border backdrop-blur-sm bg-opacity-95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <h1 className="text-lg sm:text-xl font-bold text-app-text">VibeChat</h1>
                  <span className="px-2 py-0.5 text-xs font-medium bg-app-primary text-white rounded-full">
                    MVP
                  </span>
                </div>
                <p className="hidden sm:block text-xs text-app-text-secondary mt-0.5">
                  AI destekli duygu analizi ile sohbet et
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-app-surface-secondary border border-app-border rounded-lg">
                <div className="w-8 h-8 rounded-full bg-app-primary text-white flex items-center justify-center font-semibold text-sm">
                  {currentUser.username.charAt(0).toUpperCase()}
                </div>
                <span className="text-sm font-medium text-app-text">
                  {currentUser.username}
                </span>
              </div>

              <Button
                onClick={handleLogout}
                variant="ghost"
                className="p-2"
                title="Çıkış"
              >
                <IoLogOutOutline className="text-xl" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {error && (
        <div className="bg-sentiment-negative-bg border-l-4 border-sentiment-negative px-4 py-3">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <p className="text-sm text-sentiment-negative">{error}</p>
            <button
              onClick={clearError}
              className="text-sentiment-negative hover:text-app-text transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      )}

      <ChatList
        messages={messages}
        currentUserId={currentUser.id}
        loading={loading}
      />

      <ChatInput
        onSendMessage={handleSendMessage}
        disabled={sending}
      />
    </div>
  );
}

