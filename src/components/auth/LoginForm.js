// src/components/auth/LoginForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  VStack,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Link,
  useToast,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const LoginForm = ({ returnPath }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      const redirectPath = returnPath || '/';
      navigate(redirectPath);
      toast({
        title: 'Login successful',
        status: 'success',
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: 'Login failed',
        description: error.message,
        status: 'error',
        duration: 3000,
      });
    }
  };

  return (
    <VStack
      as="form"
      spacing="6"
      onSubmit={handleSubmit}
      maxW="400px"
      mx="auto"
    >
      <Heading>Welcome Back</Heading>

      <FormControl isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>

      <FormControl isRequired>
        <FormLabel>Password</FormLabel>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormControl>

      <Button
        type="submit"
        isLoading={loading}
        w="full"
        bg="#4169E1"
        color="white"
        _hover={{ bg: 'blue.600' }}
      >
        Log In
      </Button>

      <Text>
        Don't have an account?{' '}
        <Link as={RouterLink} to="/signup" color="#4169E1">
          Sign up
        </Link>
      </Text>
    </VStack>
  );
};

export default LoginForm;
