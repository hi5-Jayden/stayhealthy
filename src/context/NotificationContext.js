// src/context/NotificationContext.js
import React, { createContext, useContext, useCallback, useState } from 'react';
import { useToast } from '@chakra-ui/react';

const NotificationContext = createContext(null);

export const NotificationProvider = ({ children }) => {
  const toast = useToast();
  const [notifications, setNotifications] = useState([]);

  const addNotification = useCallback(
    (type, message, options = {}) => {
      const { duration = 5000, priority = 'low', isToast = true } = options;
      const id = Date.now().toString();
      const newNotification = {
        id,
        type,
        message,
        timestamp: new Date().toISOString(),
        isRead: false,
        priority,
        ...options,
      };

      // Add to notifications array
      setNotifications((prev) => [newNotification, ...prev]);

      // Show toast for high priority or explicitly requested toast notifications
      if (isToast || priority === 'high') {
        toast({
          title: message,
          status: type,
          duration: duration,
          isClosable: true,
          position: 'top-right',
        });
      }

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

  const markAsRead = useCallback((id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  }, []);

  // Add appointment reminder
  const addAppointmentReminder = useCallback(
    (appointment) => {
      return addNotification(
        'appointment',
        `Appointment with ${appointment.doctorName} on ${new Date(
          appointment.date
        ).toLocaleDateString()} at ${appointment.time}`,
        {
          priority: 'high',
          appointmentId: appointment.id,
          title: 'Upcoming Appointment',
          isToast: false,
        }
      );
    },
    [addNotification]
  );

  // Add medication reminder
  const addMedicationReminder = useCallback(
    (medication) => {
      return addNotification('reminder', `Time to take ${medication.name}`, {
        priority: 'medium',
        medicationId: medication.id,
        title: 'Medication Reminder',
        isToast: false,
      });
    },
    [addNotification]
  );

  const value = {
    notifications,
    addNotification,
    removeNotification,
    clearAll,
    markAsRead,
    markAllAsRead,
    addAppointmentReminder,
    addMedicationReminder,
    unreadCount: notifications.filter((n) => !n.isRead).length,
    // Maintain existing helper functions for backward compatibility
    success: (message, duration) =>
      addNotification('success', message, { duration, isToast: true }),
    error: (message, duration) =>
      addNotification('error', message, { duration, isToast: true }),
    warning: (message, duration) =>
      addNotification('warning', message, { duration, isToast: true }),
    info: (message, duration) =>
      addNotification('info', message, { duration, isToast: true }),
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
