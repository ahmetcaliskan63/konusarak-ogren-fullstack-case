import React, { createContext, useState, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from '../components/Common/Toast';

export const NotificationContext = createContext();

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);

  const showNotification = useCallback((type, message, duration) => {
    const id = Date.now();
    setNotifications((prev) => [...prev, { id, type, message, duration }]);
  }, []);

  const success = useCallback((message, duration = 4000) => {
    showNotification('success', message, duration);
  }, [showNotification]);

  const error = useCallback((message, duration = 4000) => {
    showNotification('error', message, duration);
  }, [showNotification]);

  const warning = useCallback((message, duration = 4000) => {
    showNotification('warning', message, duration);
  }, [showNotification]);

  const info = useCallback((message, duration = 4000) => {
    showNotification('info', message, duration);
  }, [showNotification]);

  const removeNotification = useCallback((id) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  }, []);

  return (
    <NotificationContext.Provider value={{ success, error, warning, info }}>
      {children}
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.toastContainer}>
          {notifications.map((notif) => (
            <Toast
              key={notif.id}
              type={notif.type}
              message={notif.message}
              duration={notif.duration}
              onClose={() => removeNotification(notif.id)}
            />
          ))}
        </View>
      </SafeAreaView>
    </NotificationContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 9999,
    pointerEvents: 'box-none',
  },
  toastContainer: {
    paddingTop: 8,
  },
});

