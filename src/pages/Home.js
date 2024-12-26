// src/pages/Home.js
import React, { useState } from 'react';
import {
  Box,
  Container,
  SimpleGrid,
  VStack,
  Heading,
  Text,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { MessageCircle, Calendar, Stethoscope, Heart } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import ServiceCard from '../components/services/ServiceCard';

const Home = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedService, setSelectedService] = useState(null);

  const services = [
    {
      title: 'Instant Consultation',
      icon: MessageCircle,
      path: '/services/instant-consultation',
      isProtected: true,
    },
    {
      title: 'Book Appointment',
      icon: Calendar,
      path: '/services/book-appointment',
      isProtected: true,
    },
    {
      title: 'Self Check-up',
      icon: Stethoscope,
      path: '/services/self-checkup',
      isProtected: false,
    },
    {
      title: 'Health Tips',
      icon: Heart,
      path: '/services/health-tips',
      isProtected: false,
    },
  ];

  const handleServiceClick = (service) => {
    if (service.isProtected && !isAuthenticated) {
      setSelectedService(service);
      onOpen();
    } else {
      navigate(service.path);
    }
  };

  const handleAuthAction = (action) => {
    onClose();
    navigate(`/${action}`);
  };

  return (
    <Box position="relative" bg="white">
      {/* Hero Section */}
      <Box pt="6" pb="0">
        <Container maxW="1200px">
          <SimpleGrid
            columns={{ base: 1, md: 2 }}
            spacing="12"
            alignItems="center"
          >
            {/* Left side content */}
            <VStack align="start" spacing="6">
              <Heading as="h1" size="2xl" lineHeight="1.2" color="gray.900">
                Your Health
                <Text
                  as="span"
                  display="block"
                  color="blue.500"
                  fontSize="inherit"
                >
                  Our Responsibility
                </Text>
              </Heading>
            </VStack>

            {/* Right side image */}
            <Box>
              <Image
                src="/assets/images/ui/hero-doctor.png"
                alt="Doctor with laptop"
                w="full"
                h="auto"
                objectFit="contain"
                loading="eager"
              />
            </Box>
          </SimpleGrid>
        </Container>
      </Box>

      {/* Services Section */}
      <Box position="relative" mt="-100px" px={4}>
        <Container maxW="1200px">
          <Box
            bg="white"
            borderRadius="xl"
            boxShadow="xl"
            overflow="hidden"
            py={8}
          >
            <VStack spacing={8}>
              <Heading as="h2" size="lg" textAlign="center" color="gray.900">
                Our Best Services
              </Heading>

              <SimpleGrid
                columns={{ base: 1, sm: 2, lg: 4 }}
                spacing="6"
                width="full"
                px={8}
              >
                {services.map((service) => (
                  <ServiceCard
                    key={service.title}
                    {...service}
                    onClick={() => handleServiceClick(service)}
                  />
                ))}
              </SimpleGrid>
            </VStack>
          </Box>
        </Container>
      </Box>

      {/* Auth Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Authentication Required</ModalHeader>
          <ModalBody>
            <Text>
              To access {selectedService?.title}, please sign up or log in to
              your account.
            </Text>
          </ModalBody>
          <ModalFooter gap="3">
            <Button
              variant="outline"
              onClick={() => handleAuthAction('signup')}
              borderColor="#4169E1"
              color="#4169E1"
              _hover={{ bg: 'blue.50' }}
            >
              Sign up
            </Button>
            <Button
              bg="#4169E1"
              color="white"
              onClick={() => handleAuthAction('login')}
              _hover={{ bg: 'blue.600' }}
            >
              Log in
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Home;
