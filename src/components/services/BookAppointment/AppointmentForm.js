// src/components/services/BookAppointment/AppointmentForm.js
import React, { useState, useEffect } from 'react';
import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  Textarea,
  HStack,
  Text,
  useToast,
  Card,
  Avatar,
  Badge,
} from '@chakra-ui/react';
import { Calendar, Clock, User } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import { useAvailability } from '../../../context/AvailabilityContext';
import TimeSlotPicker from '../../booking/TimeSlotPicker';

const AppointmentForm = ({ doctor, onSubmit }) => {
  const { user } = useAuth();
  const { loading: availabilityLoading } = useAvailability();
  const [formData, setFormData] = useState({
    date: '',
    timeSlot: '',
    notes: '',
  });
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  // Reset time slot when date changes
  useEffect(() => {
    if (formData.timeSlot) {
      setFormData((prev) => ({ ...prev, timeSlot: '' }));
    }
  }, [formData.date]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.date || !formData.timeSlot) {
      toast({
        title: 'Error',
        description: 'Please select both date and time slot',
        status: 'error',
        duration: 3000,
      });
      return;
    }

    setLoading(true);
    try {
      await onSubmit({
        patientName: user.name,
        patientId: user.id,
        doctorId: doctor.id,
        doctorName: doctor.name,
        ...formData,
      });

      toast({
        title: 'Success',
        description: 'Appointment booked successfully',
        status: 'success',
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to book appointment',
        status: 'error',
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <VStack spacing={6} align="stretch" as="form" onSubmit={handleSubmit}>
      {/* Doctor Info Card */}
      <Card p={4}>
        <HStack spacing={4}>
          <Avatar
            size="lg"
            name={doctor.name}
            src={doctor.image || '/api/placeholder/100/100'}
          />
          <VStack align="start" spacing={1} flex={1}>
            <Text fontWeight="bold">{doctor.name}</Text>
            <Text color="gray.600">{doctor.specialization}</Text>
            <Badge colorScheme="blue">
              ${doctor.consultationFee} per visit
            </Badge>
          </VStack>
        </HStack>
      </Card>

      {/* Date Selection */}
      <FormControl isRequired>
        <FormLabel>Select Date</FormLabel>
        <Input
          type="date"
          value={formData.date}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, date: e.target.value }))
          }
          min={new Date().toISOString().split('T')[0]}
          max={
            new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)
              .toISOString()
              .split('T')[0]
          }
        />
        <Text fontSize="sm" color="gray.500" mt={1}>
          You can book appointments up to 3 months in advance
        </Text>
      </FormControl>

      {/* Time Slot Selection */}
      {formData.date && (
        <FormControl isRequired>
          <FormLabel>Select Time Slot</FormLabel>
          <TimeSlotPicker
            doctorId={doctor.id}
            selectedDate={formData.date}
            selectedSlot={formData.timeSlot}
            onSelectSlot={(slot) =>
              setFormData((prev) => ({ ...prev, timeSlot: slot }))
            }
          />
        </FormControl>
      )}

      {/* Notes */}
      <FormControl>
        <FormLabel>Additional Notes (Optional)</FormLabel>
        <Textarea
          value={formData.notes}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, notes: e.target.value }))
          }
          placeholder="Any specific concerns or information for the doctor..."
          rows={4}
          resize="vertical"
        />
      </FormControl>

      <Button
        type="submit"
        isLoading={loading || availabilityLoading}
        loadingText="Booking..."
        bgGradient="linear(to-r, brand.primary.500, #6F3AFA)"
        color="white"
        _hover={{ opacity: 0.9 }}
        isDisabled={!formData.date || !formData.timeSlot}
      >
        Book Appointment
      </Button>
    </VStack>
  );
};

export default AppointmentForm;
