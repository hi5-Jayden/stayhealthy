// src/context/DoctorContext.js
import React, { createContext, useContext, useState, useCallback } from 'react';
import { useToast } from '@chakra-ui/react';

const DoctorContext = createContext(null);

export const DoctorProvider = ({ children }) => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    specialization: 'all',
    searchQuery: '',
    availability: 'all',
  });

  const toast = useToast();

  // Fetch all doctors
  const fetchDoctors = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // In production, this would be an API call
      const response = await window.fs.readFile('Sample Doctors Data.txt', {
        encoding: 'utf8',
      });
      const data = JSON.parse(response);
      setDoctors(data.doctors || []);
    } catch (err) {
      setError('Failed to fetch doctors');
      toast({
        title: 'Error',
        description: 'Failed to load doctors. Please try again.',
        status: 'error',
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  // Fetch single doctor by ID
  const fetchDoctorById = useCallback(
    async (id) => {
      setLoading(true);
      setError(null);
      try {
        // In production, this would be an API call
        const response = await window.fs.readFile('Sample Doctors Data.txt', {
          encoding: 'utf8',
        });
        const data = JSON.parse(response);
        const doctor = data.doctors.find((doc) => doc.id === id);

        if (!doctor) {
          throw new Error('Doctor not found');
        }

        return doctor;
      } catch (err) {
        setError('Failed to fetch doctor details');
        toast({
          title: 'Error',
          description: 'Failed to load doctor details. Please try again.',
          status: 'error',
          duration: 3000,
        });
        return null;
      } finally {
        setLoading(false);
      }
    },
    [toast]
  );

  // Update filters
  const updateFilters = useCallback((newFilters) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
    }));
  }, []);

  // Get filtered doctors
  const getFilteredDoctors = useCallback(() => {
    return doctors.filter((doctor) => {
      // Specialization filter
      if (
        filters.specialization !== 'all' &&
        doctor.specialization.toLowerCase() !==
          filters.specialization.toLowerCase()
      ) {
        return false;
      }

      // Search query filter
      if (filters.searchQuery) {
        const searchLower = filters.searchQuery.toLowerCase();
        const matchesName = doctor.name.toLowerCase().includes(searchLower);
        const matchesSpecialization = doctor.specialization
          .toLowerCase()
          .includes(searchLower);
        if (!matchesName && !matchesSpecialization) {
          return false;
        }
      }

      // Availability filter
      if (
        filters.availability === 'available' &&
        doctor.availableSlots.length === 0
      ) {
        return false;
      }

      return true;
    });
  }, [doctors, filters]);

  const value = {
    doctors,
    loading,
    error,
    filters,
    updateFilters,
    fetchDoctors,
    fetchDoctorById,
    getFilteredDoctors,
  };

  return (
    <DoctorContext.Provider value={value}>{children}</DoctorContext.Provider>
  );
};

export const useDoctor = () => {
  const context = useContext(DoctorContext);
  if (!context) {
    throw new Error('useDoctor must be used within a DoctorProvider');
  }
  return context;
};

export default DoctorContext;
