import React from 'react';
import { Box, Heading, Text, VStack, Icon } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const ServiceCard = ({ title, description, icon: IconComponent, path }) => {
  const navigate = useNavigate();

  return (
    <Box
      as="button"
      onClick={() => navigate(path)}
      bg="white"
      borderRadius="12px"
      boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)"
      p="6"
      transition="all 0.3s ease-in-out"
      _hover={{
        transform: 'scale(1.02)',
        boxShadow: '0 6px 8px rgba(0, 0, 0, 0.15)',
      }}
    >
      <VStack spacing="4" align="center">
        <Icon as={IconComponent} boxSize="12" color="brand.primary.500" />
        <Heading size="md">{title}</Heading>
        <Text color="gray.600" textAlign="center">
          {description}
        </Text>
      </VStack>
    </Box>
  );
};

export default ServiceCard;
