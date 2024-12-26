// src/pages/Login.js
import React from 'react';
import { Container, Box, Alert, AlertIcon } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';
import LoginForm from '../components/auth/LoginForm';

const Login = () => {
  const location = useLocation();
  const message = location.state?.message;

  return (
    <Box py={8}>
      <Container maxW="container.sm">
        {message && (
          <Alert status="info" mb={6} borderRadius="md">
            <AlertIcon />
            {message}
          </Alert>
        )}
        <LoginForm returnPath={location.state?.from} />
      </Container>
    </Box>
  );
};

export default Login;
