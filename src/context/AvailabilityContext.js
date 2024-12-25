// src/context/AvailabilityContext.js
import React, { createContext, useContext, useState, useCallback } from 'react';
import { useToast } from '@chakra-ui/react';

const AvailabilityContext = createContext(null);

export const AvailabilityProvider = ({ children }) => {
  const [availabilityData, setAvailabilityData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [subscribers, setSubscribers] = useState(new Map());
  const toast = useToast();

  // Subscribe to real-time updates for a doctor
  const subscribeToAvailability = useCallback((doctorId, callback) => {
    setSubscribers((prev) =>
      new Map(prev).set(doctorId, [...(prev.get(doctorId) || []), callback])
    );
    return () => unsubscribeFromAvailability(doctorId, callback);
  }, []);

  // Unsubscribe from updates
  const unsubscribeFromAvailability = useCallback((doctorId, callback) => {
    setSubscribers((prev) => {
      const newMap = new Map(prev);
      const callbacks = prev.get(doctorId) || [];
      newMap.set(
        doctorId,
        callbacks.filter((cb) => cb !== callback)
      );
      return newMap;
    });
  }, []);

  // Notify subscribers of updates
  const notifySubscribers = useCallback(
    (doctorId, update) => {
      const doctorSubscribers = subscribers.get(doctorId) || [];
      doctorSubscribers.forEach((callback) => callback(update));
    },
    [subscribers]
  );

  // Fetch doctor's availability
  const fetchDoctorAvailability = useCallback(
    async (doctorId, date) => {
      setLoading(true);
      setError(null);
      try {
        // In production, this would be a real-time API call
        // Simulating with mock data and random delays
        await new Promise((resolve) =>
          setTimeout(resolve, Math.random() * 500)
        );

        const mockTimeSlots = generateMockTimeSlots(date);

        // Update availability data
        setAvailabilityData((prev) => ({
          ...prev,
          [doctorId]: {
            ...prev[doctorId],
            [date]: mockTimeSlots,
          },
        }));

        // Notify subscribers of the update
        notifySubscribers(doctorId, {
          doctorId,
          date,
          slots: mockTimeSlots,
          timestamp: Date.now(),
        });

        return mockTimeSlots;
      } catch (err) {
        setError('Failed to fetch availability');
        toast({
          title: 'Error',
          description: "Could not fetch doctor's availability",
          status: 'error',
          duration: 3000,
        });
        return [];
      } finally {
        setLoading(false);
      }
    },
    [toast, notifySubscribers]
  );

  // Check slot availability in real-time
  const checkSlotAvailability = useCallback(
    async (doctorId, date, timeSlot) => {
      try {
        // Simulate real-time check with random delay
        await new Promise((resolve) =>
          setTimeout(resolve, Math.random() * 200)
        );

        const doctorSlots = availabilityData[doctorId]?.[date] || [];
        const isAvailable = doctorSlots.includes(timeSlot);

        // Randomly simulate slot becoming unavailable (10% chance)
        if (isAvailable && Math.random() < 0.1) {
          const updatedSlots = doctorSlots.filter((slot) => slot !== timeSlot);
          setAvailabilityData((prev) => ({
            ...prev,
            [doctorId]: {
              ...prev[doctorId],
              [date]: updatedSlots,
            },
          }));

          notifySubscribers(doctorId, {
            doctorId,
            date,
            slots: updatedSlots,
            timestamp: Date.now(),
          });

          return false;
        }

        return isAvailable;
      } catch (err) {
        toast({
          title: 'Error',
          description: 'Could not verify slot availability',
          status: 'error',
          duration: 3000,
        });
        return false;
      }
    },
    [availabilityData, toast, notifySubscribers]
  );

  // Helper function to generate mock time slots
  const generateMockTimeSlots = (date) => {
    const slots = [];
    const selectedDate = new Date(date);
    const currentDate = new Date();

    // Base time slots
    const baseSlots = [
      '09:00',
      '09:30',
      '10:00',
      '10:30',
      '11:00',
      '11:30',
      '14:00',
      '14:30',
      '15:00',
      '15:30',
      '16:00',
      '16:30',
    ];

    // If selected date is today, only show future time slots
    if (selectedDate.toDateString() === currentDate.toDateString()) {
      const currentHour = currentDate.getHours();
      const currentMinutes = currentDate.getMinutes();

      return baseSlots.filter((slot) => {
        const [hours, minutes] = slot.split(':').map(Number);
        return (
          hours > currentHour ||
          (hours === currentHour && minutes > currentMinutes)
        );
      });
    }

    // Randomly remove some slots to simulate unavailability
    return baseSlots.filter(() => Math.random() > 0.3);
  };

  const value = {
    availabilityData,
    loading,
    error,
    fetchDoctorAvailability,
    checkSlotAvailability,
    subscribeToAvailability,
    unsubscribeFromAvailability,
  };

  return (
    <AvailabilityContext.Provider value={value}>
      {children}
    </AvailabilityContext.Provider>
  );
};

export const useAvailability = () => {
  const context = useContext(AvailabilityContext);
  if (!context) {
    throw new Error(
      'useAvailability must be used within an AvailabilityProvider'
    );
  }
  return context;
};

export default AvailabilityContext;
