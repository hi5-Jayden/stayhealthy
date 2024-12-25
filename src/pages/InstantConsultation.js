// src/pages/InstantConsultation.js
import React, { useState, useEffect } from 'react';
import {
  Container,
  VStack,
  HStack,
  Heading,
  Text,
  SimpleGrid,
  Select,
  InputGroup,
  InputLeftElement,
  Input,
  Button,
  Card,
  CardBody,
  useDisclosure,
  Badge,
  Spinner,
  Center,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useToast,
} from '@chakra-ui/react';
import { Search, Clock, Video, MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useDoctor } from '../context/DoctorContext';
import { useAvailability } from '../context/AvailabilityContext';
import ConsultForm from '../components/services/InstantConsult/ConsultForm';

const DoctorAvailabilityCard = ({ doctor, onConsult }) => {
  const { fetchDoctorAvailability } = useAvailability();
  const [isAvailable, setIsAvailable] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkAvailability = async () => {
      const today = new Date().toISOString().split('T')[0];
      const slots = await fetchDoctorAvailability(doctor.id, today);
      setIsAvailable(slots.length > 0);
      setChecking(false);
    };

    checkAvailability();

    // Set up periodic refresh
    const refreshInterval = setInterval(checkAvailability, 30000); // Refresh every 30 seconds

    return () => clearInterval(refreshInterval);
  }, [doctor.id, fetchDoctorAvailability]);

  return (
    <Card>
      <CardBody>
        <VStack align="stretch" spacing={4}>
          <HStack justify="space-between">
            <VStack align="start" spacing={1}>
              <Heading size="md">{doctor.name}</Heading>
              <Text color="gray.600">{doctor.specialization}</Text>
            </VStack>
            {checking ? (
              <Spinner size="sm" color="blue.500" />
            ) : (
              <Badge colorScheme={isAvailable ? 'green' : 'red'}>
                {isAvailable ? 'Available Now' : 'Unavailable'}
              </Badge>
            )}
          </HStack>

          <HStack>
            <Text fontWeight="medium">Experience:</Text>
            <Text>{doctor.experience} years</Text>
          </HStack>

          <HStack justify="space-between">
            <Text fontWeight="medium">Consultation Fee:</Text>
            <Text fontWeight="bold" color="blue.600">
              ${doctor.consultationFee}
            </Text>
          </HStack>

          <HStack spacing={4}>
            <Button
              leftIcon={<Video size={16} />}
              colorScheme="blue"
              variant="outline"
              flex="1"
              isDisabled={!isAvailable || checking}
              onClick={() => onConsult(doctor, 'video')}
            >
              Video Call
            </Button>
            <Button
              leftIcon={<MessageCircle size={16} />}
              colorScheme="blue"
              flex="1"
              isDisabled={!isAvailable || checking}
              onClick={() => onConsult(doctor, 'chat')}
            >
              Chat
            </Button>
          </HStack>
        </VStack>
      </CardBody>
    </Card>
  );
};

const InstantConsultation = () => {
  const { isAuthenticated } = useAuth();
  const { doctors, loading: loadingDoctors } = useDoctor();
  const navigate = useNavigate();
  const toast = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [consultationType, setConsultationType] = useState('chat');

  const handleConsult = (doctor, type) => {
    if (!isAuthenticated) {
      navigate('/login', {
        state: {
          from: '/services/instant-consultation',
          message: 'Please log in to start a consultation',
        },
      });
      return;
    }
    setSelectedDoctor(doctor);
    setConsultationType(type);
    onOpen();
  };

  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSearch =
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty =
      selectedSpecialty === 'all' ||
      doctor.specialization.toLowerCase() === selectedSpecialty.toLowerCase();
    return matchesSearch && matchesSpecialty;
  });

  const handleSubmitConsultation = async (data) => {
    try {
      // In real app, this would make an API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast({
        title: 'Consultation Started',
        description: `You will be connected to ${selectedDoctor.name} shortly.`,
        status: 'success',
        duration: 5000,
      });

      // Navigate to appropriate consultation interface
      if (consultationType === 'video') {
        navigate('/consultation/video', {
          state: { consultation: { ...data, type: 'video' } },
        });
      } else {
        navigate('/consultation/chat', {
          state: { consultation: { ...data, type: 'chat' } },
        });
      }

      onClose();
    } catch (error) {
      toast({
        title: 'Failed to start consultation',
        description: error.message || 'Please try again later',
        status: 'error',
        duration: 5000,
      });
    }
  };

  // Generate list of unique specialties from doctors
  const specialties = ['all', ...new Set(doctors.map((d) => d.specialization))];

  if (loadingDoctors) {
    return (
      <Center minH="60vh">
        <Spinner size="xl" color="blue.500" />
      </Center>
    );
  }

  return (
    <Container maxW="6xl" py={8}>
      <VStack spacing={8} align="stretch">
        {/* Header */}
        <VStack align="start" spacing={2}>
          <Heading size="xl">Instant Consultation</Heading>
          <Text color="gray.600">
            Connect with available doctors instantly for medical advice
          </Text>
        </VStack>

        {/* Search and Filter */}
        <HStack spacing={4}>
          <InputGroup maxW="400px">
            <InputLeftElement pointerEvents="none">
              <Search className="text-gray-400" />
            </InputLeftElement>
            <Input
              placeholder="Search by doctor name or specialization..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>

          <Select
            value={selectedSpecialty}
            onChange={(e) => setSelectedSpecialty(e.target.value)}
            maxW="200px"
          >
            {specialties.map((specialty) => (
              <option key={specialty} value={specialty.toLowerCase()}>
                {specialty === 'all' ? 'All Specialties' : specialty}
              </option>
            ))}
          </Select>
        </HStack>

        {/* Doctors Grid */}
        {filteredDoctors.length === 0 ? (
          <Card>
            <CardBody>
              <Text color="gray.600" textAlign="center">
                No doctors available matching your criteria
              </Text>
            </CardBody>
          </Card>
        ) : (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
            {filteredDoctors.map((doctor) => (
              <DoctorAvailabilityCard
                key={doctor.id}
                doctor={doctor}
                onConsult={handleConsult}
              />
            ))}
          </SimpleGrid>
        )}

        {/* Consultation Modal */}
        <Modal
          isOpen={isOpen}
          onClose={onClose}
          size="lg"
          closeOnOverlayClick={false}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              Start {consultationType === 'video' ? 'Video' : 'Chat'}{' '}
              Consultation
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <ConsultForm
                doctor={selectedDoctor}
                consultationType={consultationType}
                onSubmit={handleSubmitConsultation}
              />
            </ModalBody>
          </ModalContent>
        </Modal>
      </VStack>
    </Container>
  );
};

export default InstantConsultation;
