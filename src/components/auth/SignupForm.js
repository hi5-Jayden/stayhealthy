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
  RadioGroup,
  Radio,
  Stack,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const SignupForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    type: 'patient',
  });
  const { register, loading } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(formData);
      navigate('/');
      toast({
        title: 'Account created successfully',
        status: 'success',
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: 'Registration failed',
        description: error.message,
        status: 'error',
        duration: 3000,
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <VStack
      as="form"
      spacing="6"
      onSubmit={handleSubmit}
      maxW="400px"
      mx="auto"
    >
      <Heading>Create Account</Heading>

      <FormControl isRequired>
        <FormLabel>Full Name</FormLabel>
        <Input name="name" value={formData.name} onChange={handleChange} />
      </FormControl>

      <FormControl isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </FormControl>

      <FormControl isRequired>
        <FormLabel>Phone Number</FormLabel>
        <Input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />
      </FormControl>

      <FormControl isRequired>
        <FormLabel>Password</FormLabel>
        <Input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
      </FormControl>

      <FormControl as="fieldset">
        <FormLabel as="legend">Account Type</FormLabel>
        <RadioGroup
          value={formData.type}
          onChange={(value) =>
            setFormData((prev) => ({ ...prev, type: value }))
          }
        >
          <Stack direction="row">
            <Radio value="patient">Patient</Radio>
            <Radio value="doctor">Doctor</Radio>
          </Stack>
        </RadioGroup>
      </FormControl>

      <Button
        type="submit"
        isLoading={loading}
        w="full"
        bgGradient="linear(to-r, brand.primary.500, #6F3AFA)"
        color="white"
      >
        Sign Up
      </Button>

      <Text>
        Already have an account?{' '}
        <Link as={RouterLink} to="/login" color="brand.primary.500">
          Login
        </Link>
      </Text>
    </VStack>
  );
};

export default SignupForm;
