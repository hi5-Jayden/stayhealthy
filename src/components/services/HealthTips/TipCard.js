import React from 'react';
import { Box, VStack, Text, Heading } from '@chakra-ui/react';

const TipCard = ({ title, content, icon }) => {
  return (
    <Box
      bg="white"
      p="6"
      borderRadius="lg"
      boxShadow="md"
      transition="all 0.3s"
      _hover={{ transform: 'translateY(-2px)', boxShadow: 'lg' }}
    >
      <VStack spacing="4" align="start">
        <Box fontSize="3xl">{icon}</Box>
        <Heading size="md">{title}</Heading>
        <Text color="gray.600">{content}</Text>
      </VStack>
    </Box>
  );
};

export default TipCard;
