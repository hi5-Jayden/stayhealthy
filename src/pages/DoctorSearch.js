//src/pages/DoctorSearch.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  SimpleGrid,
  Heading,
  Text,
  Input,
  VStack,
  HStack,
  Card,
  CardBody,
  Badge,
  Button,
  InputGroup,
  InputLeftElement,
  Spinner,
  Center,
} from '@chakra-ui/react';
import { Search, Star } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useDoctor } from '../context/DoctorContext';
import SpecializationFilter from '../components/doctors/SpecializationFilter';

const DoctorSearch = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const {
    loading,
    error,
    filters,
    updateFilters,
    fetchDoctors,
    getFilteredDoctors,
  } = useDoctor();

  // Fetch doctors on mount
  useEffect(() => {
    fetchDoctors();
  }, [fetchDoctors]);

  const handleBookAppointment = (doctor) => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: '/doctors' } });
      return;
    }
    navigate(`/appointment/book`, { state: { doctor } });
  };

  const handleDoctorClick = (doctorId) => {
    navigate(`/doctors/${doctorId}`);
  };

  const filteredDoctors = getFilteredDoctors();

  if (error) {
    return (
      <Container maxW="6xl" py={8}>
        <Center minH="400px">
          <Text color="red.500">{error}</Text>
        </Center>
      </Container>
    );
  }

  return (
    <Container maxW="6xl" py={8}>
      <VStack spacing={8} align="stretch">
        <Box>
          <Heading size="xl" mb={4}>
            Find a Doctor
          </Heading>
          <Text color="gray.600">
            Find and book appointments with qualified healthcare specialists
          </Text>
        </Box>

        {/* Search and Filter Controls */}
        <VStack spacing={4}>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <Search className="text-gray-400" />
            </InputLeftElement>
            <Input
              placeholder="Search by doctor name or specialization"
              value={filters.searchQuery}
              onChange={(e) => updateFilters({ searchQuery: e.target.value })}
            />
          </InputGroup>

          <SpecializationFilter
            value={filters.specialization}
            onChange={(value) => updateFilters({ specialization: value })}
          />
        </VStack>

        {/* Doctors Grid */}
        {loading ? (
          <Center py={10}>
            <Spinner size="xl" color="blue.500" />
          </Center>
        ) : filteredDoctors.length === 0 ? (
          <Card>
            <CardBody>
              <Text textAlign="center" color="gray.600">
                No doctors found matching your criteria
              </Text>
            </CardBody>
          </Card>
        ) : (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
            {filteredDoctors.map((doctor) => (
              <Card
                key={doctor.id}
                variant="outline"
                cursor="pointer"
                onClick={() => handleDoctorClick(doctor.id)}
                _hover={{ transform: 'translateY(-4px)', shadow: 'md' }}
                transition="all 0.2s"
              >
                <CardBody>
                  <VStack spacing={4} align="stretch">
                    <HStack spacing={4}>
                      <Box
                        boxSize="100px"
                        borderRadius="lg"
                        overflow="hidden"
                        bg="gray.100"
                      >
                        <img
                          src="/api/placeholder/100/100"
                          alt={doctor.name}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                          }}
                        />
                      </Box>
                      <VStack align="start" flex={1}>
                        <Heading size="md">{doctor.name}</Heading>
                        <Text color="gray.600">{doctor.specialization}</Text>
                        <HStack>
                          <Star size={16} fill="gold" stroke="gold" />
                          <Text>{doctor.rating.toFixed(1)}</Text>
                          <Text color="gray.600">
                            • {doctor.experience} years exp.
                          </Text>
                        </HStack>
                      </VStack>
                    </HStack>

                    <Box>
                      <Text fontWeight="bold" color="blue.600">
                        ${doctor.consultationFee}
                      </Text>
                      <Badge
                        colorScheme={
                          doctor.availableSlots.length > 0 ? 'green' : 'red'
                        }
                        mt={2}
                      >
                        {doctor.availableSlots.length > 0
                          ? 'Available Today'
                          : 'Unavailable'}
                      </Badge>
                    </Box>

                    <Button
                      colorScheme="blue"
                      w="full"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleBookAppointment(doctor);
                      }}
                      isDisabled={doctor.availableSlots.length === 0}
                    >
                      Book Appointment
                    </Button>
                  </VStack>
                </CardBody>
              </Card>
            ))}
          </SimpleGrid>
        )}
      </VStack>
    </Container>
  );
};

export default DoctorSearch;
