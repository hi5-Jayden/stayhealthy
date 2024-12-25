// src/components/booking/TimeSlotPicker.js
import React, { useEffect, useState, useCallback } from 'react';
import {
  VStack,
  SimpleGrid,
  Button,
  Text,
  Skeleton,
  useToast,
  Badge,
  Box,
  HStack,
  Tooltip,
} from '@chakra-ui/react';
import { Clock, AlertCircle, RefreshCw } from 'lucide-react';
import { useAvailability } from '../../context/AvailabilityContext';

const REFRESH_INTERVAL = 30000; // 30 seconds
const STALE_THRESHOLD = 60000; // 1 minute

const TimeSlotPicker = ({
  doctorId,
  selectedDate,
  onSelectSlot,
  selectedSlot,
}) => {
  const {
    fetchDoctorAvailability,
    checkSlotAvailability,
    subscribeToAvailability,
    unsubscribeFromAvailability,
    loading,
  } = useAvailability();

  const [availableSlots, setAvailableSlots] = useState([]);
  const [checking, setChecking] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(Date.now());
  const [isStale, setIsStale] = useState(false);
  const toast = useToast();

  // Function to load availability data
  const loadAvailability = useCallback(async () => {
    try {
      const slots = await fetchDoctorAvailability(doctorId, selectedDate);
      setAvailableSlots(slots);
      setLastUpdate(Date.now());
      setIsStale(false);
    } catch (error) {
      toast({
        title: 'Error loading availability',
        description: 'Could not fetch time slots. Please try again.',
        status: 'error',
        duration: 3000,
      });
    }
  }, [doctorId, selectedDate, fetchDoctorAvailability, toast]);

  // Handle real-time updates
  const handleAvailabilityUpdate = useCallback(
    (update) => {
      if (update.doctorId === doctorId && update.date === selectedDate) {
        setAvailableSlots(update.slots);
        setLastUpdate(Date.now());

        // If selected slot is no longer available, notify user
        if (selectedSlot && !update.slots.includes(selectedSlot)) {
          toast({
            title: 'Time slot no longer available',
            description: 'Please select another time slot',
            status: 'warning',
            duration: 5000,
            isClosable: true,
          });
          onSelectSlot(null);
        }
      }
    },
    [doctorId, selectedDate, selectedSlot, onSelectSlot, toast]
  );

  // Initial load and subscription setup
  useEffect(() => {
    if (doctorId && selectedDate) {
      loadAvailability();

      // Subscribe to real-time updates
      subscribeToAvailability(doctorId, handleAvailabilityUpdate);

      // Set up periodic refresh
      const refreshInterval = setInterval(() => {
        setIsStale(true);
        loadAvailability();
      }, REFRESH_INTERVAL);

      // Set up staleness checker
      const stalenessInterval = setInterval(() => {
        const timeSinceUpdate = Date.now() - lastUpdate;
        setIsStale(timeSinceUpdate > STALE_THRESHOLD);
      }, 5000);

      return () => {
        clearInterval(refreshInterval);
        clearInterval(stalenessInterval);
        unsubscribeFromAvailability(doctorId);
      };
    }
  }, [
    doctorId,
    selectedDate,
    loadAvailability,
    handleAvailabilityUpdate,
    subscribeToAvailability,
    unsubscribeFromAvailability,
    lastUpdate,
  ]);

  const handleSlotSelect = async (slot) => {
    setChecking(true);
    try {
      const isAvailable = await checkSlotAvailability(
        doctorId,
        selectedDate,
        slot
      );
      if (isAvailable) {
        onSelectSlot(slot);
      } else {
        toast({
          title: 'Slot no longer available',
          description: 'Please select a different time slot',
          status: 'warning',
          duration: 3000,
        });
        loadAvailability(); // Refresh the available slots
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Could not verify slot availability',
        status: 'error',
        duration: 3000,
      });
    } finally {
      setChecking(false);
    }
  };

  // Show loading state
  if (loading) {
    return (
      <SimpleGrid columns={3} spacing={4}>
        {[1, 2, 3, 4, 5, 6].map((n) => (
          <Skeleton key={n} height="40px" borderRadius="md" />
        ))}
      </SimpleGrid>
    );
  }

  // Show empty state
  if (!availableSlots.length) {
    return (
      <VStack py={4} px={2} bg="gray.50" borderRadius="md">
        <Clock size={24} className="text-gray-400" />
        <Text color="gray.600" textAlign="center">
          No available slots for this date
        </Text>
      </VStack>
    );
  }

  return (
    <VStack spacing={4} align="stretch">
      {/* Status Bar */}
      <HStack justify="space-between" fontSize="sm" color="gray.600">
        <HStack spacing={2}>
          <Text>Last updated: {new Date(lastUpdate).toLocaleTimeString()}</Text>
          {isStale && (
            <Tooltip label="Data may be outdated. Click to refresh">
              <Badge
                colorScheme="yellow"
                cursor="pointer"
                onClick={loadAvailability}
              >
                <HStack spacing={1}>
                  <RefreshCw size={12} />
                  <Text>Refresh</Text>
                </HStack>
              </Badge>
            </Tooltip>
          )}
        </HStack>
        <Text>{availableSlots.length} slots available</Text>
      </HStack>

      {/* Time Slots Grid */}
      <SimpleGrid columns={3} spacing={4}>
        {availableSlots.map((slot) => (
          <Button
            key={slot}
            size="md"
            variant={selectedSlot === slot ? 'solid' : 'outline'}
            colorScheme="blue"
            isLoading={checking && selectedSlot === slot}
            onClick={() => handleSlotSelect(slot)}
            position="relative"
          >
            {slot}
          </Button>
        ))}
      </SimpleGrid>

      {/* Real-time Update Indicator */}
      <Box textAlign="center">
        <Text fontSize="sm" color="gray.500">
          Availability updates automatically
        </Text>
      </Box>
    </VStack>
  );
};

export default TimeSlotPicker;
