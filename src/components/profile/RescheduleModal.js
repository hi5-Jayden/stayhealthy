import React, { useState } from 'react';
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
} from '@chakra-ui/react';
import { Calendar, Clock } from 'lucide-react';

const RescheduleModal = ({ isOpen, onClose, appointment, onReschedule }) => {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    date: '',
    timeSlot: '',
  });

  // Sample available time slots - would come from API based on selected date
  const availableSlots = [
    '09:00 AM',
    '10:00 AM',
    '11:00 AM',
    '02:00 PM',
    '03:00 PM',
    '04:00 PM',
  ];

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
    setFormData((prev) => ({
      ...prev,
      date: e.target.value,
      timeSlot: '', // Reset time slot when date changes
    }));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Reschedule Appointment</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <VStack spacing={6} align="stretch">
            {/* Current Appointment Info */}
            <VStack align="start" bg="gray.50" p={4} borderRadius="md">
              <Text fontWeight="medium">Current Appointment:</Text>
              <HStack spacing={4}>
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
            </VStack>

            {/* New Date Selection */}
            <FormControl isRequired>
              <FormLabel>Select New Date</FormLabel>
              <Input
                type="date"
                value={formData.date}
                onChange={handleDateChange}
                min={new Date().toISOString().split('T')[0]}
              />
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
              Note: Rescheduling is subject to doctor's availability
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

export default RescheduleModal;
