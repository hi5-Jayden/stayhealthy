import React from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { Box, Container, HStack, Button, Link, Text } from '@chakra-ui/react';

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

const Navbar = () => {
  const location = useLocation();

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
            <Logo />
          </Link>

          {/* Main Navigation */}
          <HStack spacing="8">
            {[
              { path: '/', label: 'Home' },
              { path: '/appointment', label: 'Appointment' },
              { path: '/services', label: 'Services' },
              { path: '/reviews', label: 'Reviews' },
            ].map(({ path, label }) => (
              <Link
                key={path}
                as={RouterLink}
                to={path}
                color="gray.700"
                fontWeight="500"
                position="relative"
                _after={{
                  content: '""',
                  position: 'absolute',
                  bottom: '-4px',
                  left: 0,
                  width: '100%',
                  height: '2px',
                  bg: '#4169E1',
                  transform:
                    location.pathname === path ? 'scaleX(1)' : 'scaleX(0)',
                  transition: 'transform 0.3s ease',
                }}
              >
                {label}
              </Link>
            ))}
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
