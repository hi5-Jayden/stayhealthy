// src/pages/InstantConsultation.js
import React, { useState, useEffect } from 'react';
import {
  Container,
  VStack,
  Heading,
  Text,
  SimpleGrid,
  Card,
  CardBody,
  HStack,
  Badge,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Textarea,
  useToast,
} from '@chakra-ui/react';
import { Video, Phone, MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useDoctor } from '../context/DoctorContext';

const ConsultationCard = ({ doctor, onConsult }) => {
  return (
    <Card>
      <CardBody>
        <VStack align="stretch" spacing={4}>
          <HStack justify="space-between">
            <VStack align="start" spacing={1}>
              <Heading size="md">{doctor.name}</Heading>
              <Text color="gray.600">{doctor.specialization}</Text>
            </VStack>
            <Badge
              colorScheme={doctor.isAvailable ? 'green' : 'red'}
              fontSize="sm"
            >
              {doctor.isAvailable ? 'Available Now' : 'Busy'}
            </Badge>
          </HStack>

          <HStack>
            <Text fontWeight="medium">Experience:</Text>
            <Text>{doctor.experience} years</Text>
          </HStack>

          <HStack>
            <Text fontWeight="medium">Consultation Fee:</Text>
            <Text>${doctor.consultationFee}</Text>
          </HStack>

          <HStack spacing={4}>
            <Button
              leftIcon={<Video size={16} />}
              colorScheme="blue"
              variant="outline"
              flex="1"
              isDisabled={!doctor.isAvailable}
            >
              Video
            </Button>
            <Button
              leftIcon={<Phone size={16} />}
              colorScheme="blue"
              variant="outline"
              flex="1"
              isDisabled={!doctor.isAvailable}
            >
              Audio
            </Button>
            <Button
              leftIcon={<MessageCircle size={16} />}
              colorScheme="blue"
              flex="1"
              onClick={() => onConsult(doctor)}
              isDisabled={!doctor.isAvailable}
            >
              Chat
            </Button>
          </HStack>
        </VStack>
      </CardBody>
    </Card>
  );
};

const ConsultationModal = ({ isOpen, onClose, doctor, onSubmit }) => {
  const [symptoms, setSymptoms] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!symptoms.trim()) {
      return;
    }

    setLoading(true);
    try {
      await onSubmit({ doctor, symptoms });
      onClose();
    } catch (error) {
      console.error('Failed to start consultation:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Start Consultation with {doctor?.name}</ModalHeader>
        <ModalBody>
          <FormControl isRequired>
            <FormLabel>Describe your symptoms</FormLabel>
            <Textarea
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              placeholder="Please describe your symptoms in detail..."
              minH="150px"
            />
          </FormControl>
        </ModalBody>
        <ModalFooter gap="3">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button
            colorScheme="blue"
            onClick={handleSubmit}
            isLoading={loading}
            isDisabled={!symptoms.trim()}
          >
            Start Consultation
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const InstantConsultation = () => {
  const { isAuthenticated } = useAuth();
  const { doctors, loading, error, fetchDoctors } = useDoctor();
  const navigate = useNavigate();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  useEffect(() => {
    fetchDoctors();
  }, [fetchDoctors]);

  const handleConsult = (doctor) => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: '/services/instant-consultation' } });
      return;
    }
    setSelectedDoctor(doctor);
    onOpen();
  };

  const handleSubmitConsultation = async (data) => {
    try {
      // In real app, this would make an API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast({
        title: 'Consultation Started',
        description: 'You will be connected to the doctor shortly.',
        status: 'success',
        duration: 5000,
      });

      navigate('/consultation/chat', { state: { consultation: data } });
    } catch (error) {
      toast({
        title: 'Failed to start consultation',
        description: error.message,
        status: 'error',
        duration: 5000,
      });
    }
  };

  const availableDoctors = doctors.filter((doctor) => doctor.isAvailable);

  return (
    <Container maxW="6xl" py={8}>
      <VStack spacing={8} align="stretch">
        <VStack align="start" spacing={2}>
          <Heading size="xl">Instant Consultation</Heading>
          <Text color="gray.600">
            Connect with available doctors instantly for medical advice
          </Text>
        </VStack>

        {availableDoctors.length === 0 ? (
          <Card>
            <CardBody>
              <Text color="gray.600" textAlign="center">
                No doctors are available right now. Please try again later.
              </Text>
            </CardBody>
          </Card>
        ) : (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
            {availableDoctors.map((doctor) => (
              <ConsultationCard
                key={doctor.id}
                doctor={doctor}
                onConsult={handleConsult}
              />
            ))}
          </SimpleGrid>
        )}
      </VStack>

      <ConsultationModal
        isOpen={isOpen}
        onClose={onClose}
        doctor={selectedDoctor}
        onSubmit={handleSubmitConsultation}
      />
    </Container>
  );
};

export default InstantConsultation;
