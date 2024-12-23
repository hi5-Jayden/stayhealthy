import React, { createContext, useContext, useCallback, useState } from 'react';
import { useToast } from '@chakra-ui/react';

const NotificationContext = createContext(null);

export const NotificationProvider = ({ children }) => {
  const toast = useToast();
  const [notifications, setNotifications] = useState([]);

  const addNotification = useCallback(
    (type, message, duration = 5000) => {
      const id = Date.now().toString();

      // Add to notifications array
      setNotifications((prev) => [...prev, { id, type, message }]);

      // Show toast notification
      toast({
        title: message,
        status: type,
        duration: duration,
        isClosable: true,
        position: 'top-right',
        onCloseComplete: () => {
          // Remove from notifications array when toast closes
          setNotifications((prev) => prev.filter((n) => n.id !== id));
        },
      });

      return id;
    },
    [toast]
  );

  const removeNotification = useCallback((id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const clearAll = useCallback(() => {
    setNotifications([]);
  }, []);

  const value = {
    notifications,
    addNotification,
    removeNotification,
    clearAll,
    success: (message, duration) =>
      addNotification('success', message, duration),
    error: (message, duration) => addNotification('error', message, duration),
    warning: (message, duration) =>
      addNotification('warning', message, duration),
    info: (message, duration) => addNotification('info', message, duration),
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      'useNotification must be used within a NotificationProvider'
    );
  }
  return context;
};

export default NotificationContext;
