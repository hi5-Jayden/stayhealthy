// src/pages/Services.js
import React from 'react';
import {
  Box,
  Container,
  SimpleGrid,
  Heading,
  Text,
  Stack,
  Image,
  Button,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { MessageCircle, Calendar, Stethoscope, Heart } from 'lucide-react';

const ServiceCard = ({ title, description, icon: Icon, link, isPublic }) => (
  <Box
    bg="white"
    p="6"
    borderRadius="lg"
    boxShadow="md"
    transition="all 0.3s"
    _hover={{ transform: 'translateY(-4px)', boxShadow: 'lg' }}
  >
    <Stack spacing="4" align="flex-start">
      <Box
        p="3"
        borderRadius="full"
        bg="blue.50"
        color="#4169E1"
        display="inline-flex"
      >
        <Icon size={24} />
      </Box>
      <Heading size="md">{title}</Heading>
      <Text color="gray.600">{description}</Text>
      <Button
        as={RouterLink}
        to={link}
        variant="outline"
        colorScheme="blue"
        size="sm"
        mt="2"
      >
        {isPublic ? 'Learn More' : 'Get Started'}
      </Button>
    </Stack>
  </Box>
);

const Services = () => {
  const services = [
    {
      title: 'Instant Consultation',
      description:
        'Connect with doctors instantly for immediate medical advice and consultations from the comfort of your home.',
      icon: MessageCircle,
      link: '/services/instant-consult',
      isPublic: false,
    },
    {
      title: 'Book Appointment',
      description:
        'Schedule appointments with specialized doctors at your preferred time and date.',
      icon: Calendar,
      link: '/services/book-appointment',
      isPublic: false,
    },
    {
      title: 'Self Checkup',
      description:
        'Use our comprehensive self-assessment tools to monitor your health and identify potential concerns.',
      icon: Stethoscope,
      link: '/services/self-checkup',
      isPublic: true,
    },
    {
      title: 'Health Tips',
      description:
        'Access expert health advice and tips for maintaining a healthy lifestyle and preventing illness.',
      icon: Heart,
      link: '/services/health-tips',
      isPublic: true,
    },
  ];

  return (
    <Box as="section" py="12">
      <Container maxW="1200px">
        {/* Hero Section */}
        <Stack spacing="6" textAlign="center" mb="12">
          <Heading size="2xl">Our Services</Heading>
          <Text fontSize="xl" color="gray.600" maxW="800px" mx="auto">
            Access quality healthcare services from anywhere, anytime. Choose
            from our range of healthcare solutions designed to meet your needs.
          </Text>
        </Stack>

        {/* Services Grid */}
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing="8">
          {services.map((service) => (
            <ServiceCard key={service.title} {...service} />
          ))}
        </SimpleGrid>

        {/* Additional Info Section */}
        <Box mt="16">
          <SimpleGrid
            columns={{ base: 1, md: 2 }}
            spacing="8"
            alignItems="center"
          >
            <Stack spacing="6">
              <Heading size="lg">Why Choose StayHealthy?</Heading>
              <Box>
                <Text color="gray.600" mb="4">
                  ✓ Access to qualified healthcare professionals
                </Text>
                <Text color="gray.600" mb="4">
                  ✓ Convenient and easy-to-use platform
                </Text>
                <Text color="gray.600" mb="4">
                  ✓ Secure and private consultations
                </Text>
                <Text color="gray.600">
                  ✓ 24/7 availability for instant consultations
                </Text>
              </Box>
              <Button
                as={RouterLink}
                to="/signup"
                size="lg"
                bgGradient="linear(to-r, brand.primary.500, #6F3AFA)"
                color="white"
                _hover={{ opacity: 0.9 }}
                maxW="200px"
              >
                Get Started
              </Button>
            </Stack>
            <Box>
              <Image
                src="/api/placeholder/600/400"
                alt="Healthcare professionals"
                borderRadius="lg"
                w="full"
                h="auto"
              />
            </Box>
          </SimpleGrid>
        </Box>
      </Container>
    </Box>
  );
};

export default Services;
