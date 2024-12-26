// src/pages/Login.js
import React from 'react';
import { Container, Box } from '@chakra-ui/react';
import LoginForm from '../components/auth/LoginForm';

const Login = () => {
  return (
    <Box py={8}>
      <Container maxW="container.sm">
        <LoginForm />
      </Container>
    </Box>
  );
};

export default Login;
