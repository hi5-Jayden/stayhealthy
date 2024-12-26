import React from 'react';
import { Box, VStack, Text } from '@chakra-ui/react';

const ServiceCard = ({ title, icon: Icon, onClick }) => {
  return (
    <Box
      as="button"
      onClick={onClick}
      bg="white"
      p="6"
      borderRadius="lg"
      borderWidth="1px"
      borderColor="gray.100"
      transition="all 0.2s"
      width="full"
      _hover={{
        transform: 'translateY(-2px)',
        borderColor: 'blue.200',
        bg: 'blue.50',
      }}
    >
      <VStack spacing="4" align="center">
        <Box
          p="3"
          borderRadius="full"
          bg="blue.50"
          color="#4169E1"
          display="inline-flex"
          transition="all 0.2s"
        >
          <Icon size={24} />
        </Box>
        <Text fontWeight="500" textAlign="center" color="gray.800">
          {title}
        </Text>
      </VStack>
    </Box>
  );
};

export default ServiceCard;
