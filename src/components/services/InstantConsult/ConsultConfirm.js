import React from 'react';
import {
  VStack,
  Heading,
  Text,
  Button,
  useColorModeValue,
  HStack,
  Icon,
} from '@chakra-ui/react';
import { CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ConsultConfirm = ({ consultationData }) => {
  const navigate = useNavigate();
  const bgColor = useColorModeValue('white', 'gray.800');

  return (
    <VStack
      spacing="6"
      p="8"
      bg={bgColor}
      borderRadius="lg"
      boxShadow="md"
      align="center"
    >
      <Icon as={CheckCircle} boxSize="12" color="green.500" />

      <Heading size="md">Consultation Confirmed!</Heading>

      <Text textAlign="center" color="gray.600">
        Your consultation request has been submitted successfully. The doctor
        will connect with you shortly.
      </Text>

      <VStack spacing="4" align="stretch" w="full">
        <HStack justify="space-between">
          <Text color="gray.600">Doctor:</Text>
          <Text fontWeight="medium">{consultationData?.doctorName}</Text>
        </HStack>

        <HStack justify="space-between">
          <Text color="gray.600">Request Time:</Text>
          <Text fontWeight="medium">
            {new Date(consultationData?.timestamp).toLocaleString()}
          </Text>
        </HStack>
      </VStack>

      <Button
        onClick={() => navigate('/profile')}
        bgGradient="linear(to-r, brand.primary.500, #6F3AFA)"
        color="white"
        _hover={{ opacity: 0.9 }}
        w="full"
      >
        View in Profile
      </Button>
    </VStack>
  );
};

export default ConsultConfirm;
