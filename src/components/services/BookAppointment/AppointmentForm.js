import React, { useState } from 'react';
import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  Select,
  Textarea,
  HStack,
} from '@chakra-ui/react';
import { useAuth } from '../../../context/AuthContext';
import { useNotification } from '../../../context/NotificationContext';

const AppointmentForm = ({ doctor, availableSlots, onSubmit }) => {
  const { user } = useAuth();
  const { success, error } = useNotification();
  const [formData, setFormData] = useState({
    date: '',
    timeSlot: '',
    notes: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit({
        patientName: user.name,
        patientId: user.id,
        doctorId: doctor.id,
        doctorName: doctor.name,
        ...formData,
      });
      success('Appointment booked successfully');
    } catch (err) {
      error('Failed to book appointment');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <VStack as="form" onSubmit={handleSubmit} spacing="6" align="stretch">
      <HStack spacing="4">
        <FormControl isRequired>
          <FormLabel>Date</FormLabel>
          <Input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            min={new Date().toISOString().split('T')[0]}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Time Slot</FormLabel>
          <Select
            name="timeSlot"
            value={formData.timeSlot}
            onChange={handleChange}
            placeholder="Select time slot"
          >
            {availableSlots?.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </Select>
        </FormControl>
      </HStack>

      <FormControl>
        <FormLabel>Notes (Optional)</FormLabel>
        <Textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          placeholder="Any additional notes for the doctor..."
        />
      </FormControl>

      <Button
        type="submit"
        isLoading={loading}
        bgGradient="linear(to-r, brand.primary.500, #6F3AFA)"
        color="white"
        _hover={{ opacity: 0.9 }}
      >
        Book Appointment
      </Button>
    </VStack>
  );
};

export default AppointmentForm;
