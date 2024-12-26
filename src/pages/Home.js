// src/pages/Home.js
import React from 'react';
import {
  Box,
  Container,
  SimpleGrid,
  VStack,
  Heading,
  Text,
  Image,
  useDisclosure,
} from '@chakra-ui/react';
import { MessageCircle, Calendar, Stethoscope, Heart } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import ServiceCard from '../components/services/ServiceCard';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

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
      navigate('/login', {
        state: {
          from: service.path,
          message: `Please login to access ${service.title}`,
        },
      });
      return;
    }
    navigate(service.path);
  };

  return (
    <Box position="relative" bg="white" minH="100vh">
      {/* Main Container */}
      <Box position="relative">
        {/* Hero Section */}
        <Box
          bg="white"
          pt={{ base: '6', md: '12' }}
          pb={{ base: '32', md: '48' }}
        >
          <Container maxW="1200px">
            <SimpleGrid
              columns={{ base: 1, md: 2 }}
              spacing="12"
              alignItems="center"
            >
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

        {/* Services Section - Overlapping */}
        <Box
          position="absolute"
          left="0"
          right="0"
          bottom="0"
          transform="translateY(50%)"
          zIndex="1"
          px={4}
        >
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
      </Box>

      {/* Spacer to account for overlapping section */}
      <Box h={{ base: '32', md: '48' }} />
    </Box>
  );
};

export default Home;
