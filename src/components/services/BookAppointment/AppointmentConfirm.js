import React from 'react';
import {
  VStack,
  Heading,
  Text,
  Button,
  useColorModeValue,
  HStack,
  Icon,
  Divider,
} from '@chakra-ui/react';
import { Calendar, Clock, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AppointmentConfirm = ({ appointmentData }) => {
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

      <Heading size="md">Appointment Confirmed!</Heading>

      <Text textAlign="center" color="gray.600">
        Your appointment has been scheduled successfully.
      </Text>

      <Divider />

      <VStack spacing="4" align="stretch" w="full">
        <HStack>
          <Icon as={Calendar} color="brand.primary.500" />
          <Text fontWeight="medium">
            {new Date(appointmentData?.date).toLocaleDateString()}
          </Text>
        </HStack>

        <HStack>
          <Icon as={Clock} color="brand.primary.500" />
          <Text fontWeight="medium">{appointmentData?.timeSlot}</Text>
        </HStack>

        <HStack justify="space-between">
          <Text color="gray.600">Doctor:</Text>
          <Text fontWeight="medium">{appointmentData?.doctorName}</Text>
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

export default AppointmentConfirm;
