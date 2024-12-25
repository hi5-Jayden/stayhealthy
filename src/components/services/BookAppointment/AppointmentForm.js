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
  FormErrorMessage,
  Alert,
  AlertIcon,
  Card,
  Avatar,
  Badge,
} from '@chakra-ui/react';
import { Calendar, Clock, User } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import { useAvailability } from '../../../context/AvailabilityContext';
import TimeSlotPicker from '../../booking/TimeSlotPicker';
import {
  validateField,
  validateForm,
  appointmentFormSchema,
  handleApiError,
} from '../../../utils/validation';

const AppointmentForm = ({ doctor, onSubmit }) => {
  const { user } = useAuth();
  const { loading: availabilityLoading } = useAvailability();
  const toast = useToast();

  const [formData, setFormData] = useState({
    date: '',
    timeSlot: '',
    phone: user?.phone || '',
    notes: '',
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  // Validate individual field on blur
  const handleBlur = (e) => {
    const { name, value } = e.target;
    const fieldErrors = validateField(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: fieldErrors,
    }));
  };

  // Handle field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: [],
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // Validate all fields
      const { isValid, errors: validationErrors } = validateForm(
        formData,
        appointmentFormSchema
      );

      if (!isValid) {
        setErrors(validationErrors);
        throw new Error('Please fix the form errors before submitting');
      }

      // Submit the form
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
        duration: 5000,
      });
    } catch (error) {
      const errorMessage = handleApiError(error);
      toast({
        title: 'Error',
        description: errorMessage,
        status: 'error',
        duration: 5000,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <VStack spacing={6} align="stretch" as="form" onSubmit={handleSubmit}>
      {/* Doctor Info */}
      <Card p={4}>
        <HStack spacing={4}>
          <Avatar
            size="lg"
            name={doctor.name}
            src={doctor.image || '/api/placeholder/100/100'}
          />
          <VStack align="start" spacing={1}>
            <Text fontWeight="bold">{doctor.name}</Text>
            <Text color="gray.600">{doctor.specialization}</Text>
            <Badge colorScheme="blue">
              ${doctor.consultationFee} per visit
            </Badge>
          </VStack>
        </HStack>
      </Card>

      {/* Form Fields */}
      <FormControl isRequired isInvalid={errors.date?.length > 0}>
        <FormLabel>Select Date</FormLabel>
        <Input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          onBlur={handleBlur}
          min={new Date().toISOString().split('T')[0]}
        />
        <FormErrorMessage>{errors.date?.[0]}</FormErrorMessage>
      </FormControl>

      {formData.date && (
        <FormControl isRequired isInvalid={errors.timeSlot?.length > 0}>
          <FormLabel>Select Time Slot</FormLabel>
          <TimeSlotPicker
            doctorId={doctor.id}
            selectedDate={formData.date}
            selectedSlot={formData.timeSlot}
            onSelectSlot={(slot) => {
              setFormData((prev) => ({ ...prev, timeSlot: slot }));
              setErrors((prev) => ({ ...prev, timeSlot: [] }));
            }}
          />
          <FormErrorMessage>{errors.timeSlot?.[0]}</FormErrorMessage>
        </FormControl>
      )}

      <FormControl isRequired isInvalid={errors.phone?.length > 0}>
        <FormLabel>Phone Number</FormLabel>
        <Input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Enter your phone number"
        />
        <FormErrorMessage>{errors.phone?.[0]}</FormErrorMessage>
      </FormControl>

      <FormControl>
        <FormLabel>Additional Notes (Optional)</FormLabel>
        <Textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          placeholder="Any specific concerns or information for the doctor..."
          rows={4}
          resize="vertical"
        />
      </FormControl>

      <Button
        type="submit"
        isLoading={submitting || availabilityLoading}
        loadingText="Booking..."
        bgGradient="linear(to-r, brand.primary.500, #6F3AFA)"
        color="white"
        _hover={{ opacity: 0.9 }}
        isDisabled={!formData.date || !formData.timeSlot || !formData.phone}
      >
        Book Appointment
      </Button>
    </VStack>
  );
};

export default AppointmentForm;
