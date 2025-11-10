import { format } from 'date-fns';
import { useState, useEffect } from 'react';
import {
  getSentimentEmoji,
  getSentimentChipClass,
  getSentimentLabel,
  formatScore,
  getScoreBarColor,
} from '../../utils/sentiment';

export default function ChatMessage({ message, isOwnMessage }) {
  const [animatedScore, setAnimatedScore] = useState(0);
  let formattedTime = '';
  let formattedDate = '';
  
  useEffect(() => {
    if (message.sentimentScore && !message.isOptimistic) {
      setAnimatedScore(0);
      const timeout = setTimeout(() => {
        setAnimatedScore(message.sentimentScore);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [message.sentimentScore, message.isOptimistic]);
  
  try {
    if (message.timestamp) {
      const date = new Date(message.timestamp);
      formattedTime = format(date, 'HH:mm');
      formattedDate = format(date, 'd MMM');
    }
  } catch (error) {
    formattedTime = '--:--';
    formattedDate = '--';
  }

  return (
    <div className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'} mb-3`}>
      <div className={`${isOwnMessage ? 'chat-bubble-right' : 'chat-bubble-left'} max-w-[85%] sm:max-w-[78%]`}>
        <div className="flex items-baseline gap-2 mb-1">
          <span className="text-sm font-medium text-app-text">
            {message.username || 'Anonim'}
          </span>
          <span className="text-xs text-app-text-muted">
            {formattedDate} • {formattedTime}
          </span>
        </div>

        <p className="text-[15px] leading-6 text-app-text whitespace-pre-wrap break-words">
          {message.content}
        </p>

        {message.sentiment && (
          <div className="mt-3 pt-3 border-t border-app-border space-y-2">
            <div className="flex items-center justify-between">
              <span className={getSentimentChipClass(message.sentiment)}>
                <span>{getSentimentEmoji(message.sentiment)}</span>
                <span>{getSentimentLabel(message.sentiment)}</span>
              </span>
              <span className="text-xs font-medium text-app-text-secondary">
                {formatScore(message.sentimentScore)}
              </span>
            </div>

            <div className="w-full bg-app-surface-secondary rounded-full h-1.5 overflow-hidden">
              <div
                className={`h-full transition-all duration-700 ease-out ${getScoreBarColor(message.sentiment)}`}
                style={{ width: formatScore(animatedScore) }}
              />
            </div>
          </div>
        )}

        {message.isOptimistic && (
          <div className="mt-2 flex items-center gap-1 text-xs text-app-text-muted">
            <div className="animate-spin h-3 w-3 border-2 border-app-text-muted border-t-transparent rounded-full" />
            <span>Gönderiliyor...</span>
          </div>
        )}
      </div>
    </div>
  );
}

