// src/context/BookingContext.js
import React, { createContext, useContext, useState, useCallback } from 'react';
import { useToast } from '@chakra-ui/react';
import { useAuth } from './AuthContext';

const BookingContext = createContext(null);

export const BookingProvider = ({ children }) => {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [bookingType, setBookingType] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const toast = useToast();
  const { user } = useAuth();

  const clearBookingData = () => {
    setSelectedDoctor(null);
    setSelectedDate(null);
    setSelectedTimeSlot(null);
    setBookingType(null);
    setError(null);
  };

  const validateBookingData = useCallback(() => {
    if (!user) {
      throw new Error('Please log in to book an appointment');
    }
    if (!selectedDoctor) {
      throw new Error('Please select a doctor');
    }
    if (!selectedDate) {
      throw new Error('Please select a date');
    }
    if (!selectedTimeSlot) {
      throw new Error('Please select a time slot');
    }
    if (!bookingType) {
      throw new Error('Please select booking type');
    }
  }, [user, selectedDoctor, selectedDate, selectedTimeSlot, bookingType]);

  const createBooking = useCallback(
    async (bookingData) => {
      setLoading(true);
      setError(null);

      try {
        validateBookingData();

        // In production, this would be an API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Simulate successful booking
        const booking = {
          id: Date.now().toString(),
          doctorId: selectedDoctor.id,
          doctorName: selectedDoctor.name,
          patientId: user.id,
          patientName: user.name,
          date: selectedDate,
          timeSlot: selectedTimeSlot,
          type: bookingType,
          status: 'confirmed',
          ...bookingData,
        };

        toast({
          title: 'Booking Confirmed',
          description: 'Your appointment has been scheduled successfully.',
          status: 'success',
          duration: 5000,
        });

        clearBookingData();
        return booking;
      } catch (err) {
        setError(err.message);
        toast({
          title: 'Booking Failed',
          description: err.message,
          status: 'error',
          duration: 5000,
        });
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [
      user,
      selectedDoctor,
      selectedDate,
      selectedTimeSlot,
      bookingType,
      toast,
      validateBookingData,
    ]
  );

  const getAvailableTimeSlots = useCallback(
    async (doctorId, date) => {
      try {
        // In production, this would be an API call
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Simulate time slots
        const slots = [
          '09:00 AM',
          '10:00 AM',
          '11:00 AM',
          '02:00 PM',
          '03:00 PM',
          '04:00 PM',
        ];

        return slots;
      } catch (err) {
        toast({
          title: 'Error',
          description: 'Failed to fetch available time slots',
          status: 'error',
          duration: 3000,
        });
        return [];
      }
    },
    [toast]
  );

  const value = {
    selectedDoctor,
    selectedDate,
    selectedTimeSlot,
    bookingType,
    loading,
    error,
    setSelectedDoctor,
    setSelectedDate,
    setSelectedTimeSlot,
    setBookingType,
    createBooking,
    clearBookingData,
    getAvailableTimeSlots,
  };

  return (
    <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};

export default BookingContext;
