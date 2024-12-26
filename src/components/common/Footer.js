// src/components/common/Footer.js
import React from 'react';
import {
  Box,
  Container,
  SimpleGrid,
  Stack,
  Text,
  Heading,
  Link,
  HStack,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

// Reusable Logo Component
const Logo = ({ fontSize = '24px', spacing = '2' }) => (
  <HStack spacing={spacing}>
    <Text fontSize={fontSize} fontWeight="bold" color="#4169E1">
      StayHealthy
    </Text>
    <Box as="span" color="#4169E1" fontSize={fontSize} ml="-1">
      +
    </Box>
  </HStack>
);

const Footer = () => {
  return (
    <Box bg="white" color="gray.700" mt="auto">
      {' '}
      {/* Updated background color to match */}
      <Container maxW="1200px" py="12">
        <SimpleGrid columns={{ base: 1, md: 4 }} spacing="8">
          {/* Brand Column */}
          <Stack spacing="6">
            <Box>
              <Logo fontSize="20px" spacing="1" />
            </Box>
            <Text fontSize="sm">Your Health, Our Responsibility</Text>
          </Stack>

          {/* Services Links */}
          <Stack spacing="4">
            <Heading size="sm">Services</Heading>
            <Link as={RouterLink} to="/services/instant-consult" fontSize="sm">
              Instant Consultation
            </Link>
            <Link as={RouterLink} to="/services/book-appointment" fontSize="sm">
              Book Appointment
            </Link>
            <Link as={RouterLink} to="/services/self-checkup" fontSize="sm">
              Self Checkup
            </Link>
            <Link as={RouterLink} to="/services/health-tips" fontSize="sm">
              Health Tips
            </Link>
          </Stack>

          {/* Quick Links */}
          <Stack spacing="4">
            <Heading size="sm">Quick Links</Heading>
            <Link as={RouterLink} to="/about" fontSize="sm">
              About Us
            </Link>
            <Link as={RouterLink} to="/contact" fontSize="sm">
              Contact
            </Link>
            <Link as={RouterLink} to="/doctors" fontSize="sm">
              Find Doctors
            </Link>
            <Link as={RouterLink} to="/faq" fontSize="sm">
              FAQs
            </Link>
          </Stack>

          {/* Contact Info */}
          <Stack spacing="4">
            <Heading size="sm">Contact</Heading>
            <Text fontSize="sm">Email: contact@stayhealthy.com</Text>
            <Text fontSize="sm">Phone: (555) 123-4567</Text>
            <Text fontSize="sm">
              123 Healthcare Avenue,
              <br />
              Medical District, MD 12345
            </Text>
          </Stack>
        </SimpleGrid>

        {/* Copyright */}
        <Box
          borderTopWidth={1}
          borderColor="gray.200"
          mt="8"
          pt="8"
          textAlign="center"
        >
          <Text fontSize="sm">
            © {new Date().getFullYear()} StayHealthy. All rights reserved.
          </Text>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
