// src/components/appointments/AppointmentRescheduleModal.js
import React, { useState, useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Button,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Select,
  Text,
  useToast,
  HStack,
  Box,
} from '@chakra-ui/react';
import { Calendar, Clock } from 'lucide-react';

const AppointmentRescheduleModal = ({
  isOpen,
  onClose,
  appointment,
  onReschedule,
}) => {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    date: '',
    timeSlot: '',
  });

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setFormData({
        date: new Date(appointment?.date).toISOString().split('T')[0],
        timeSlot: appointment?.time || '',
      });
    }
  }, [isOpen, appointment]);

  // Generate available time slots based on the selected date
  const getAvailableSlots = (selectedDate) => {
    // In a real app, this would fetch from an API based on doctor's availability
    const baseSlots = [
      '09:00 AM',
      '09:30 AM',
      '10:00 AM',
      '10:30 AM',
      '11:00 AM',
      '11:30 AM',
      '02:00 PM',
      '02:30 PM',
      '03:00 PM',
      '03:30 PM',
      '04:00 PM',
      '04:30 PM',
    ];

    // Filter out past times if the selected date is today
    const today = new Date();
    const selected = new Date(selectedDate);

    if (selected.toDateString() === today.toDateString()) {
      const currentHour = today.getHours();
      return baseSlots.filter((slot) => {
        const [time, period] = slot.split(' ');
        const [hours] = time.split(':');
        const slotHour =
          parseInt(hours) + (period === 'PM' && hours !== '12' ? 12 : 0);
        return slotHour > currentHour;
      });
    }

    return baseSlots;
  };

  const [availableSlots, setAvailableSlots] = useState([]);

  useEffect(() => {
    if (formData.date) {
      setAvailableSlots(getAvailableSlots(formData.date));
    }
  }, [formData.date]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate selected date is in future
      const selectedDate = new Date(formData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (selectedDate < today) {
        throw new Error('Please select a future date');
      }

      // Validate time slot is still available
      if (!availableSlots.includes(formData.timeSlot)) {
        throw new Error('Selected time slot is no longer available');
      }

      // In real app, would make API call here
      await new Promise((resolve) => setTimeout(resolve, 1000));

      onReschedule({
        ...appointment,
        date: formData.date,
        time: formData.timeSlot,
      });

      toast({
        title: 'Appointment Rescheduled',
        description: 'Your appointment has been successfully rescheduled.',
        status: 'success',
        duration: 3000,
      });

      onClose();
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to reschedule appointment',
        status: 'error',
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDateChange = (e) => {
    const newDate = e.target.value;
    setFormData((prev) => ({
      ...prev,
      date: newDate,
      timeSlot: '', // Reset time slot when date changes
    }));
  };

  // Calculate minimum date (today)
  const minDate = new Date().toISOString().split('T')[0];

  // Calculate maximum date (3 months from today)
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 3);
  const maxDateString = maxDate.toISOString().split('T')[0];

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Reschedule Appointment</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <VStack spacing={6} align="stretch">
            {/* Current Appointment Info */}
            <Box bg="blue.50" p={4} borderRadius="md">
              <Text fontWeight="medium" mb={2}>
                Current Appointment:
              </Text>
              <HStack spacing={6}>
                <HStack>
                  <Calendar size={16} />
                  <Text>
                    {new Date(appointment?.date).toLocaleDateString()}
                  </Text>
                </HStack>
                <HStack>
                  <Clock size={16} />
                  <Text>{appointment?.time}</Text>
                </HStack>
              </HStack>
              <Text fontSize="sm" color="gray.600" mt={2}>
                with {appointment?.doctorName}
              </Text>
            </Box>

            {/* New Date Selection */}
            <FormControl isRequired>
              <FormLabel>Select New Date</FormLabel>
              <Input
                type="date"
                value={formData.date}
                onChange={handleDateChange}
                min={minDate}
                max={maxDateString}
              />
              <Text fontSize="xs" color="gray.500" mt={1}>
                You can schedule appointments up to 3 months in advance
              </Text>
            </FormControl>

            {/* New Time Selection */}
            <FormControl isRequired>
              <FormLabel>Select New Time</FormLabel>
              <Select
                value={formData.timeSlot}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    timeSlot: e.target.value,
                  }))
                }
                placeholder="Choose a time slot"
                isDisabled={!formData.date}
              >
                {availableSlots.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </Select>
            </FormControl>

            <Text fontSize="sm" color="gray.600">
              Note: Rescheduling is subject to doctor's availability. A
              confirmation will be sent to your registered email.
            </Text>
          </VStack>
        </ModalBody>

        <ModalFooter gap="3">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            isLoading={loading}
            isDisabled={!formData.date || !formData.timeSlot}
            bgGradient="linear(to-r, brand.primary.500, #6F3AFA)"
            color="white"
            _hover={{ opacity: 0.9 }}
          >
            Confirm Reschedule
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AppointmentRescheduleModal;
