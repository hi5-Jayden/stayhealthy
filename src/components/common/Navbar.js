import React from 'react';
import { Box, Container, HStack, Button, Link, Text } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <Box
      as="nav"
      bg="white"
      boxShadow="sm"
      position="sticky"
      top="0"
      zIndex="1000"
      h="80px"
      display="flex"
      alignItems="center"
    >
      <Container maxW="1200px">
        <HStack justify="space-between" align="center">
          {/* Logo */}
          <Link as={RouterLink} to="/" _hover={{ textDecoration: 'none' }}>
            <HStack spacing="2">
              <Text fontSize="24px" fontWeight="bold" color="#4169E1">
                StayHealthy
              </Text>
              <Box as="span" color="#4169E1" fontSize="24px" ml="-1">
                +
              </Box>
            </HStack>
          </Link>

          {/* Main Navigation */}
          <HStack spacing="8">
            <Link as={RouterLink} to="/" color="gray.700" fontWeight="500">
              Home
            </Link>
            <Link
              as={RouterLink}
              to="/appointment"
              color="gray.700"
              fontWeight="500"
            >
              Appointment
            </Link>
            <Link
              as={RouterLink}
              to="/services"
              color="gray.700"
              fontWeight="500"
            >
              Services
            </Link>
            <Link
              as={RouterLink}
              to="/reviews"
              color="gray.700"
              fontWeight="500"
            >
              Reviews
            </Link>
          </HStack>

          {/* Auth Buttons */}
          <HStack spacing="4">
            <Button
              as={RouterLink}
              to="/signup"
              color="#4169E1"
              variant="outline"
              borderColor="#4169E1"
              _hover={{ bg: 'blue.50' }}
            >
              Sign up
            </Button>
            <Button
              as={RouterLink}
              to="/login"
              bg="#4169E1"
              color="white"
              _hover={{ bg: 'blue.600' }}
            >
              Log In
            </Button>
          </HStack>
        </HStack>
      </Container>
    </Box>
  );
};

export default Navbar;
