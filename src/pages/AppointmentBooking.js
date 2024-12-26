// src/pages/AppointmentBooking.js
import React, { useState } from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import {
  Box,
  Container,
  VStack,
  HStack,
  Heading,
  Text,
  Card,
  CardBody,
  Image,
  Button,
  FormControl,
  FormLabel,
  Select,
  Textarea,
  useToast,
  Input,
  Avatar,
  Badge,
} from '@chakra-ui/react';
import { Calendar, Clock, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const AppointmentBooking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const toast = useToast();
  const { isAuthenticated } = useAuth();
  const doctor = location.state?.doctor;

  const [formData, setFormData] = useState({
    date: '',
    timeSlot: '',
    notes: '',
  });

  // Protect route - redirect to login if not authenticated
  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        state={{ from: '/services/book-appointment' }}
        replace
      />
    );
  }

  // Redirect to doctors search if no doctor selected
  if (!doctor) {
    return (
      <Container maxW="4xl" py={8}>
        <Card>
          <CardBody>
            <VStack spacing={4} align="center">
              <Text>No doctor selected. Please select a doctor first.</Text>
              <Button
                onClick={() => navigate('/doctors')}
                bgGradient="linear(to-r, brand.primary.500, #6F3AFA)"
                color="white"
                _hover={{ opacity: 0.9 }}
              >
                Find a Doctor
              </Button>
            </VStack>
          </CardBody>
        </Card>
      </Container>
    );
  }

  // Get available time slots based on selected date
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.date || !formData.timeSlot) {
      toast({
        title: 'Required Fields Missing',
        description: 'Please select both date and time slot',
        status: 'error',
        duration: 3000,
      });
      return;
    }

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast({
        title: 'Appointment Booked!',
        description: 'Your appointment has been scheduled successfully.',
        status: 'success',
        duration: 5000,
      });

      navigate('/profile/appointments');
    } catch (error) {
      toast({
        title: 'Booking Failed',
        description: error.message,
        status: 'error',
        duration: 5000,
      });
    }
  };

  return (
    <Container maxW="4xl" py={8}>
      <VStack spacing={8} align="stretch">
        <Heading size="xl">Book Appointment</Heading>

        {/* Doctor Info Card */}
        <Card>
          <CardBody>
            <HStack spacing={6}>
              <Avatar
                size="xl"
                name={doctor.name}
                src={doctor.image || '/api/placeholder/150/150'}
              />
              <VStack align="start" spacing={2}>
                <Heading size="md">{doctor.name}</Heading>
                <Text color="gray.600">{doctor.specialization}</Text>
                <Text>Experience: {doctor.experience} years</Text>
                <Badge colorScheme="blue">
                  Consultation Fee: ${doctor.consultationFee}
                </Badge>
              </VStack>
            </HStack>
          </CardBody>
        </Card>

        {/* Booking Form */}
        <Card>
          <CardBody>
            <form onSubmit={handleSubmit}>
              <VStack spacing={6}>
                <FormControl isRequired>
                  <FormLabel>Select Date</FormLabel>
                  <Input
                    type="date"
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                    min={new Date().toISOString().split('T')[0]}
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Select Time Slot</FormLabel>
                  <Select
                    value={formData.timeSlot}
                    onChange={(e) =>
                      setFormData({ ...formData, timeSlot: e.target.value })
                    }
                    placeholder="Choose a time slot"
                    isDisabled={!formData.date}
                  >
                    {getAvailableSlots(formData.date).map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </Select>
                </FormControl>

                <FormControl>
                  <FormLabel>Additional Notes</FormLabel>
                  <Textarea
                    value={formData.notes}
                    onChange={(e) =>
                      setFormData({ ...formData, notes: e.target.value })
                    }
                    placeholder="Any specific concerns or information for the doctor..."
                    rows={4}
                  />
                </FormControl>

                <Button
                  type="submit"
                  w="full"
                  bgGradient="linear(to-r, brand.primary.500, #6F3AFA)"
                  color="white"
                  _hover={{ opacity: 0.9 }}
                  size="lg"
                >
                  Confirm Booking
                </Button>
              </VStack>
            </form>
          </CardBody>
        </Card>
      </VStack>
    </Container>
  );
};

export default AppointmentBooking;
