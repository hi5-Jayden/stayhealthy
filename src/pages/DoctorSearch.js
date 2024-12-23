import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  SimpleGrid,
  Heading,
  Text,
  Select,
  Input,
  VStack,
  HStack,
  Card,
  CardBody,
  Image,
  Badge,
  Button,
  useToast,
} from '@chakra-ui/react';
import { Search, Star } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const DoctorSearch = () => {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [specialization, setSpecialization] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const toast = useToast();

  useEffect(() => {
    // Simulate API call to fetch doctors
    const fetchDoctors = async () => {
      try {
        const response = await window.fs.readFile('Sample Doctors Data.txt', {
          encoding: 'utf8',
        });
        const data = JSON.parse(response);
        setDoctors(data.doctors || []);
        setFilteredDoctors(data.doctors || []);
      } catch (error) {
        console.error('Error fetching doctors:', error);
        toast({
          title: 'Error loading doctors',
          status: 'error',
          duration: 3000,
        });
      }
    };

    fetchDoctors();
  }, [toast]);

  useEffect(() => {
    const filtered = doctors.filter((doctor) => {
      const matchesSearch = doctor.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesSpecialization =
        specialization === 'all' ||
        doctor.specialization.toLowerCase() === specialization.toLowerCase();
      return matchesSearch && matchesSpecialization;
    });
    setFilteredDoctors(filtered);
  }, [searchTerm, specialization, doctors]);

  const handleBookAppointment = (doctor) => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: '/doctors' } });
      return;
    }
    navigate('/appointment/book', { state: { doctor } });
  };

  return (
    <Container maxW="6xl" py={8}>
      <VStack spacing={8} align="stretch">
        <Heading size="xl">Find a Doctor</Heading>

        {/* Search Controls */}
        <Card>
          <CardBody>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
              <Input
                placeholder="Search by doctor name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                leftElement={<Search className="text-gray-400" />}
              />
              <Select
                value={specialization}
                onChange={(e) => setSpecialization(e.target.value)}
              >
                <option value="all">All Specializations</option>
                <option value="Cardiologist">Cardiologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatrician">Pediatrician</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Orthopedist">Orthopedist</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Psychiatrist">Psychiatrist</option>
                <option value="General Physician">General Physician</option>
              </Select>
            </SimpleGrid>
          </CardBody>
        </Card>

        {/* Doctor Grid */}
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
          {filteredDoctors.map((doctor) => (
            <Card key={doctor.id} variant="outline">
              <CardBody>
                <VStack spacing={4} align="stretch">
                  <Image
                    src="/api/placeholder/200/200"
                    alt={doctor.name}
                    borderRadius="lg"
                  />
                  <VStack align="start" spacing={2}>
                    <Heading size="md">{doctor.name}</Heading>
                    <Text color="gray.600">{doctor.specialization}</Text>
                    <HStack>
                      <Star size={16} fill="gold" stroke="gold" />
                      <Text>{doctor.rating.toFixed(1)}</Text>
                      <Text color="gray.600">
                        • {doctor.experience} years exp.
                      </Text>
                    </HStack>
                    <Text fontWeight="bold" color="blue.600">
                      ${doctor.consultationFee}
                    </Text>
                    <Badge
                      colorScheme={
                        doctor.availableSlots.length > 0 ? 'green' : 'red'
                      }
                    >
                      {doctor.availableSlots.length > 0
                        ? 'Available Today'
                        : 'Unavailable'}
                    </Badge>
                    <Button
                      colorScheme="blue"
                      w="full"
                      onClick={() => handleBookAppointment(doctor)}
                      isDisabled={doctor.availableSlots.length === 0}
                    >
                      Book Appointment
                    </Button>
                  </VStack>
                </VStack>
              </CardBody>
            </Card>
          ))}
        </SimpleGrid>
      </VStack>
    </Container>
  );
};

export default DoctorSearch;
