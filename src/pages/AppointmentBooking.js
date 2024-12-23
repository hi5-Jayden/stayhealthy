import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
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
} from '@chakra-ui/react';
import { Calendar, Clock, User } from 'lucide-react';

const AppointmentBooking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const toast = useToast();
  const doctor = location.state?.doctor;

  const [formData, setFormData] = useState({
    date: '',
    timeSlot: '',
    notes: '',
  });

  if (!doctor) {
    return (
      <Container maxW="4xl" py={8}>
        <Card>
          <CardBody>
            <Text>No doctor selected. Please select a doctor first.</Text>
            <Button onClick={() => navigate('/doctors')} mt={4}>
              Find a Doctor
            </Button>
          </CardBody>
        </Card>
      </Container>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
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
              <Image
                src="/api/placeholder/150/150"
                alt={doctor.name}
                borderRadius="lg"
                boxSize="150px"
              />
              <VStack align="start" spacing={2}>
                <Heading size="md">{doctor.name}</Heading>
                <Text color="gray.600">{doctor.specialization}</Text>
                <Text>Experience: {doctor.experience} years</Text>
                <Text fontWeight="bold" color="blue.600">
                  Consultation Fee: ${doctor.consultationFee}
                </Text>
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
                  >
                    {doctor.availableSlots.map((slot) => (
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

                <Button type="submit" colorScheme="blue" size="lg" w="full">
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
