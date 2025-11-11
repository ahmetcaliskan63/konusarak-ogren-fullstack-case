import { createContext, useState, useCallback } from 'react';
import Toast from '../components/Common/Toast';

export const NotificationContext = createContext();

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);

  const showNotification = useCallback((type, message, duration) => {
    const id = Date.now();
    setNotifications((prev) => [...prev, { id, type, message, duration }]);
  }, []);

  const success = useCallback((message, duration) => {
    showNotification('success', message, duration);
  }, [showNotification]);

  const error = useCallback((message, duration) => {
    showNotification('error', message, duration);
  }, [showNotification]);

  const warning = useCallback((message, duration) => {
    showNotification('warning', message, duration);
  }, [showNotification]);

  const info = useCallback((message, duration) => {
    showNotification('info', message, duration);
  }, [showNotification]);

  const removeNotification = useCallback((id) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  }, []);

  return (
    <NotificationContext.Provider value={{ success, error, warning, info }}>
      {children}
      <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 max-w-md">
        {notifications.map((notif) => (
          <Toast
            key={notif.id}
            type={notif.type}
            message={notif.message}
            duration={notif.duration}
            onClose={() => removeNotification(notif.id)}
          />
        ))}
      </div>
    </NotificationContext.Provider>
  );
}

