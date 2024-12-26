// src/pages/InstantConsultation.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Container, Center, VStack, Heading, Text } from '@chakra-ui/react';

const InstantConsultation = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        state={{ from: '/services/instant-consultation' }}
        replace
      />
    );
  }

  return (
    <Container maxW="6xl" py={8}>
      {/* Rest of your consultation page content */}
    </Container>
  );
};

export default InstantConsultation;
