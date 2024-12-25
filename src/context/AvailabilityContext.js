// src/context/AvailabilityContext.js
import React, { createContext, useContext, useState, useCallback } from 'react';
import { useToast } from '@chakra-ui/react';

const AvailabilityContext = createContext(null);

export const AvailabilityProvider = ({ children }) => {
  const [availabilityData, setAvailabilityData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const toast = useToast();

  // Fetch doctor's availability for a specific date
  const fetchDoctorAvailability = useCallback(
    async (doctorId, date) => {
      setLoading(true);
      setError(null);
      try {
        // In production, this would be a real-time API call
        // For now, simulating with mock data
        await new Promise((resolve) => setTimeout(resolve, 500));

        const mockTimeSlots = generateMockTimeSlots(date);

        setAvailabilityData((prev) => ({
          ...prev,
          [doctorId]: {
            ...prev[doctorId],
            [date]: mockTimeSlots,
          },
        }));

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
    [toast]
  );

  // Check if a specific time slot is available
  const checkSlotAvailability = useCallback(
    async (doctorId, date, timeSlot) => {
      try {
        // In production, this would be a real-time check
        await new Promise((resolve) => setTimeout(resolve, 200));

        const doctorSlots = availabilityData[doctorId]?.[date] || [];
        return doctorSlots.includes(timeSlot);
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
    [availabilityData, toast]
  );

  // Reserve a time slot
  const reserveTimeSlot = useCallback(
    async (doctorId, date, timeSlot) => {
      try {
        // In production, this would make an API call to reserve the slot
        await new Promise((resolve) => setTimeout(resolve, 300));

        setAvailabilityData((prev) => {
          const doctorSlots = [...(prev[doctorId]?.[date] || [])];
          const slotIndex = doctorSlots.indexOf(timeSlot);
          if (slotIndex > -1) {
            doctorSlots.splice(slotIndex, 1);
          }
          return {
            ...prev,
            [doctorId]: {
              ...prev[doctorId],
              [date]: doctorSlots,
            },
          };
        });

        return true;
      } catch (err) {
        toast({
          title: 'Error',
          description: 'Failed to reserve time slot',
          status: 'error',
          duration: 3000,
        });
        return false;
      }
    },
    [toast]
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

    return baseSlots;
  };

  const value = {
    availabilityData,
    loading,
    error,
    fetchDoctorAvailability,
    checkSlotAvailability,
    reserveTimeSlot,
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
