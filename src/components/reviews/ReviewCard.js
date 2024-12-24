import React from 'react';
import { Box, HStack, VStack, Text, Avatar, Badge } from '@chakra-ui/react';
import { Star } from 'lucide-react';

const ReviewCard = ({ review }) => {
  const { patientName, rating, comment, date, doctorName, appointmentType } =
    review;

  return (
    <Box
      p={6}
      bg="white"
      borderRadius="lg"
      boxShadow="sm"
      borderWidth="1px"
      borderColor="gray.200"
    >
      <VStack align="stretch" spacing={4}>
        <HStack spacing={4} justify="space-between">
          <HStack spacing={3}>
            <Avatar name={patientName} size="sm" />
            <Box>
              <Text fontWeight="medium">{patientName}</Text>
              <Text fontSize="sm" color="gray.600">
                {new Date(date).toLocaleDateString()}
              </Text>
            </Box>
          </HStack>
          <HStack spacing={1}>
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={16}
                fill={i < rating ? 'gold' : 'transparent'}
                stroke={i < rating ? 'gold' : 'gray'}
              />
            ))}
          </HStack>
        </HStack>

        <VStack align="start" spacing={2}>
          <HStack>
            <Badge colorScheme="blue">{doctorName}</Badge>
            <Badge colorScheme="purple">{appointmentType}</Badge>
          </HStack>
          <Text color="gray.700">{comment}</Text>
        </VStack>
      </VStack>
    </Box>
  );
};

export default ReviewCard;
