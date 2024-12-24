// src/pages/Reviews.js
import React from 'react';
import { Box, Container, Heading, Text, VStack } from '@chakra-ui/react';
import ReviewsList from '../components/reviews/ReviewsList';
import { useAuth } from '../context/AuthContext';

const Reviews = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Box py={8}>
      <Container maxW="1200px">
        <VStack spacing={6} align="stretch">
          <Box>
            <Heading size="xl" mb={4}>
              Patient Reviews
            </Heading>
            <Text color="gray.600">
              Read what our patients say about their experience with our doctors
              and services, or share your own experience.
            </Text>
          </Box>

          <ReviewsList showForm={isAuthenticated} />
        </VStack>
      </Container>
    </Box>
  );
};

export default Reviews;
