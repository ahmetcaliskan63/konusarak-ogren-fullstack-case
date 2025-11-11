import { useEffect } from 'react';
import { IoCheckmarkCircle, IoCloseCircle, IoInformationCircle, IoWarning, IoClose } from 'react-icons/io5';

export default function Toast({ type = 'info', message, onClose, duration = 4000 }) {
  useEffect(() => {
    if (duration && onClose) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const icons = {
    success: <IoCheckmarkCircle className="text-2xl" />,
    error: <IoCloseCircle className="text-2xl" />,
    warning: <IoWarning className="text-2xl" />,
    info: <IoInformationCircle className="text-2xl" />,
  };

  const styles = {
    success: 'bg-sentiment-positive-bg border-sentiment-positive text-sentiment-positive',
    error: 'bg-sentiment-negative-bg border-sentiment-negative text-sentiment-negative',
    warning: 'bg-yellow-900/20 border-yellow-600 text-yellow-500',
    info: 'bg-app-primary/10 border-app-primary text-app-primary',
  };

  return (
    <div 
      className={`flex items-center gap-3 px-4 py-3 rounded-lg border-l-4 backdrop-blur-sm shadow-lg animate-slide-in ${styles[type]}`}
      role="alert"
    >
      <div className="flex-shrink-0">
        {icons[type]}
      </div>
      <p className="flex-1 text-sm font-medium">
        {message}
      </p>
      {onClose && (
        <button
          onClick={onClose}
          className="flex-shrink-0 hover:opacity-70 transition-opacity"
          aria-label="Kapat"
        >
          <IoClose className="text-xl" />
        </button>
      )}
    </div>
  );
}

