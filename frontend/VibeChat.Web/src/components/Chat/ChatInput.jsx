import { useState, useRef, useEffect } from 'react';
import { IoSend } from 'react-icons/io5';
import Button from '../Common/Button';

export default function ChatInput({ onSendMessage, disabled }) {
  const [content, setContent] = useState('');
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [content]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!content.trim() || disabled) {
      return;
    }

    const messageContent = content.trim();
    setContent('');
    
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }

    await onSendMessage(messageContent);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="sticky bottom-0 bg-app-bg border-t border-app-border backdrop-blur-sm bg-opacity-95">
      <div className="max-w-3xl mx-auto p-3 sm:p-4">
        <form onSubmit={handleSubmit} className="flex items-end gap-3">
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Mesajınızı yazın..."
              disabled={disabled}
              rows={1}
              className="w-full bg-app-surface border border-app-border text-app-text px-4 py-3 rounded-xl resize-none focus:outline-none focus:border-app-primary focus-visible:focus-ring transition-all duration-200 max-h-32 overflow-y-auto scrollbar-thin"
              style={{ minHeight: '48px' }}
            />
          </div>
          
          <Button
            type="submit"
            variant="primary"
            disabled={disabled || !content.trim()}
            className="px-4 py-3 h-12 flex items-center gap-2"
          >
            <IoSend className="text-lg" />
            <span className="hidden sm:inline">Gönder</span>
          </Button>
        </form>
      </div>
    </div>
  );
}

