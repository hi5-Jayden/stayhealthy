// src/pages/SignUp.js
import React from 'react';
import { Container, Box } from '@chakra-ui/react';
import SignupForm from '../components/auth/SignupForm';

const SignUp = () => {
  return (
    <Box py={8}>
      <Container maxW="container.sm">
        <SignupForm />
      </Container>
    </Box>
  );
};

export default SignUp;
