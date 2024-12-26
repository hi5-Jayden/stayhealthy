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
  Card,
  CardBody,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { MessageCircle, Calendar, Stethoscope, Heart } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

// ServiceCard Component
const ServiceCard = ({
  title,
  icon: Icon,
  isSelected,
  isProtected,
  onClick,
}) => (
  <Card
    cursor="pointer"
    overflow="hidden"
    variant="outline"
    bg={isSelected ? 'blue.50' : 'white'}
    borderColor={isSelected ? 'blue.200' : 'gray.200'}
    onClick={onClick}
    _hover={{
      borderColor: 'blue.200',
      transform: 'translateY(-2px)',
      boxShadow: 'sm',
    }}
    transition="all 0.2s"
  >
    <CardBody>
      <VStack spacing="4" align="center">
        <Box
          p="3"
          borderRadius="full"
          bg={isSelected ? 'blue.100' : 'blue.50'}
          color="#4169E1"
          display="inline-flex"
        >
          <Icon size={24} />
        </Box>
        <Text fontWeight="500" textAlign="center" color="gray.800">
          {title}
        </Text>
      </VStack>
    </CardBody>
  </Card>
);

const Home = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedService, setSelectedService] = useState(null);

  const services = [
    {
      title: 'Instant Consultation',
      icon: MessageCircle,
      isSelected: false,
      isProtected: true,
      path: '/services/instant-consultation',
    },
    {
      title: 'Book Appointment',
      icon: Calendar,
      isSelected: true,
      isProtected: true,
      path: '/services/book-appointment',
    },
    {
      title: 'Self Check-up',
      icon: Stethoscope,
      isSelected: false,
      isProtected: false,
      path: '/services/self-checkup',
    },
    {
      title: 'Health Tips',
      icon: Heart,
      isSelected: false,
      isProtected: false,
      path: '/services/health-tips',
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
      <Box position="relative" mt="-200px" zIndex="1">
        <Container maxW="1200px">
          <VStack spacing={0}>
            <Heading
              as="h2"
              size="lg"
              bg="white"
              px="6"
              py="3"
              rounded="lg"
              shadow="sm"
              mb="-15px"
              zIndex="2"
              position="relative"
            >
              Our Best Services
            </Heading>

            <Card w="full" bg="white" shadow="xl" pt="12" pb="8">
              <CardBody>
                <SimpleGrid
                  columns={{ base: 1, sm: 2, lg: 4 }}
                  spacing="6"
                  width="full"
                  px={{ base: 4, md: 8 }}
                >
                  {services.map((service) => (
                    <ServiceCard
                      key={service.title}
                      {...service}
                      onClick={() => handleServiceClick(service)}
                    />
                  ))}
                </SimpleGrid>
              </CardBody>
            </Card>
          </VStack>
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
