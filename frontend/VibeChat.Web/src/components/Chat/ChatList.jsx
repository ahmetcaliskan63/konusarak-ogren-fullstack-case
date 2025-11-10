import { useEffect, useRef, useState } from 'react';
import ChatMessage from './ChatMessage';

export default function ChatList({ messages, currentUserId, loading }) {
  const messagesEndRef = useRef(null);
  const containerRef = useRef(null);
  const [showScrollButton, setShowScrollButton] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
      setShowScrollButton(!isNearBottom);
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  if (loading && messages.length === 0) {
    return (
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 scrollbar-thin">
        <div className="max-w-3xl mx-auto space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className={`flex ${i % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
                <div className="bg-app-surface border border-app-border rounded-bubble p-3 max-w-[78%] space-y-2">
                  <div className="h-4 bg-app-border rounded w-24" />
                  <div className="h-12 bg-app-border rounded w-48" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (messages.length === 0) {
    return (
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 scrollbar-thin">
        <div className="max-w-3xl mx-auto h-full flex items-center justify-center">
          <div className="text-center border-2 border-dashed border-app-border rounded-card p-8 max-w-md">
            <div className="text-5xl mb-4">💬</div>
            <h3 className="text-lg font-medium text-app-text mb-2">
              Henüz mesaj yok
            </h3>
            <p className="text-sm text-app-text-secondary">
              İlk mesajı göndererek sohbete başla! AI duygu analizini göreceksin.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 scrollbar-thin">
      <div className="max-w-3xl mx-auto">
        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            message={message}
            isOwnMessage={message.userId === currentUserId}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {showScrollButton && (
        <button
          onClick={scrollToBottom}
          className="fixed bottom-24 right-4 sm:right-8 bg-app-primary hover:bg-app-primary-hover text-white p-3 rounded-full shadow-lg transition-all duration-200 z-10 focus-visible:focus-ring"
          aria-label="En alta kaydır"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </button>
      )}
    </div>
  );
}

