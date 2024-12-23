import React, { useState } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  VStack,
  Card,
  CardBody,
  Image,
  Badge,
  HStack,
  Button,
  Select,
  useDisclosure,
} from '@chakra-ui/react';
import { Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DoctorCard = ({ doctor, onSelect }) => (
  <Card
    variant="outline"
    cursor="pointer"
    _hover={{ borderColor: 'blue.200', transform: 'translateY(-2px)' }}
    transition="all 0.2s"
  >
    <CardBody>
      <VStack spacing="4">
        <Image
          src="/api/placeholder/200/200"
          alt={doctor.name}
          borderRadius="lg"
          boxSize="200px"
          objectFit="cover"
        />
        <VStack spacing="2" align="start" w="full">
          <Heading size="md">{doctor.name}</Heading>
          <Text color="gray.600">{doctor.specialization}</Text>
          <HStack>
            <Star size={16} fill="gold" stroke="gold" />
            <Text>{doctor.rating.toFixed(1)}</Text>
            <Text color="gray.600">• {doctor.experience} years exp.</Text>
          </HStack>
          <Text fontWeight="bold" color="blue.600">
            ${doctor.consultationFee}
          </Text>
          <Badge
            colorScheme={doctor.availableSlots.length > 0 ? 'green' : 'red'}
          >
            {doctor.availableSlots.length > 0
              ? 'Available Today'
              : 'Unavailable'}
          </Badge>
          <Button
            onClick={() => onSelect(doctor)}
            colorScheme="blue"
            w="full"
            isDisabled={doctor.availableSlots.length === 0}
          >
            Book Appointment
          </Button>
        </VStack>
      </VStack>
    </CardBody>
  </Card>
);

const AppointmentPage = () => {
  const navigate = useNavigate();
  const [selectedSpecialization, setSelectedSpecialization] = useState('all');
  const { isOpen, onClose } = useDisclosure();

  // Sample doctors data
  const doctors = [
    {
      id: 'cardio-1',
      name: 'Dr. John Wilson',
      specialization: 'Cardiologist',
      experience: 15,
      rating: 4.8,
      image: 'dr-cardio-1.jpg',
      availableSlots: ['09:00', '10:00', '14:00'],
      consultationFee: 150,
    },
    {
      id: 'derm-1',
      name: 'Dr. Sarah Miller',
      specialization: 'Dermatologist',
      experience: 8,
      rating: 4.9,
      image: 'dr-derm-1.jpg',
      availableSlots: ['11:00', '15:00', '16:00'],
      consultationFee: 130,
    },
  ];

  const specializations = [
    'All Specializations',
    'Cardiologist',
    'Dermatologist',
    'Pediatrician',
    'Neurologist',
    'Orthopedist',
    'Gynecologist',
    'Psychiatrist',
    'General Physician',
  ];

  const handleDoctorSelect = (doctor) => {
    navigate('/login', { state: { from: '/appointment' } });
  };

  return (
    <Box py="12">
      <Container maxW="1200px">
        {/* Header Section */}
        <VStack spacing="6" mb="12" align="start">
          <Heading size="xl">Book an Appointment</Heading>
          <Text color="gray.600">
            Choose from our experienced doctors and book your appointment
            instantly.
          </Text>

          {/* Filter Section */}
          <Card w="full" variant="outline">
            <CardBody>
              <SimpleGrid columns={{ base: 1, md: 3 }} spacing="4">
                <Select
                  value={selectedSpecialization}
                  onChange={(e) => setSelectedSpecialization(e.target.value)}
                >
                  {specializations.map((spec) => (
                    <option key={spec} value={spec.toLowerCase()}>
                      {spec}
                    </option>
                  ))}
                </Select>
              </SimpleGrid>
            </CardBody>
          </Card>
        </VStack>

        {/* Doctors Grid */}
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing="6">
          {doctors.map((doctor) => (
            <DoctorCard
              key={doctor.id}
              doctor={doctor}
              onSelect={handleDoctorSelect}
            />
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default AppointmentPage;
