import React, { useEffect, useState } from 'react';
import {
  VStack,
  SimpleGrid,
  Button,
  Text,
  Skeleton,
  useToast,
} from '@chakra-ui/react';
import { Clock } from 'lucide-react';
import { useAvailability } from '../../context/AvailabilityContext';

const TimeSlotPicker = ({
  doctorId,
  selectedDate,
  onSelectSlot,
  selectedSlot,
}) => {
  const { fetchDoctorAvailability, checkSlotAvailability, loading } =
    useAvailability();
  const [availableSlots, setAvailableSlots] = useState([]);
  const [checking, setChecking] = useState(false);
  const toast = useToast();

  useEffect(() => {
    const loadAvailability = async () => {
      if (doctorId && selectedDate) {
        const slots = await fetchDoctorAvailability(doctorId, selectedDate);
        setAvailableSlots(slots);
      }
    };

    loadAvailability();
  }, [doctorId, selectedDate, fetchDoctorAvailability]);

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
        // Refresh availability
        const slots = await fetchDoctorAvailability(doctorId, selectedDate);
        setAvailableSlots(slots);
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

  if (loading) {
    return (
      <SimpleGrid columns={3} spacing={4}>
        {[1, 2, 3, 4, 5, 6].map((n) => (
          <Skeleton key={n} height="40px" borderRadius="md" />
        ))}
      </SimpleGrid>
    );
  }

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
    <SimpleGrid columns={3} spacing={4}>
      {availableSlots.map((slot) => (
        <Button
          key={slot}
          size="md"
          variant={selectedSlot === slot ? 'solid' : 'outline'}
          colorScheme="blue"
          isLoading={checking && selectedSlot === slot}
          onClick={() => handleSlotSelect(slot)}
        >
          {slot}
        </Button>
      ))}
    </SimpleGrid>
  );
};

export default TimeSlotPicker;
