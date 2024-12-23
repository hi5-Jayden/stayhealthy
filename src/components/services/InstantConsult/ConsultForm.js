import React, { useState } from 'react';
import {
  VStack,
  FormControl,
  FormLabel,
  Textarea,
  Button,
  useToast,
} from '@chakra-ui/react';
import { useAuth } from '../../../context/AuthContext';
import { useNotification } from '../../../context/NotificationContext';

const ConsultForm = ({ onSubmit, doctor }) => {
  const [symptoms, setSymptoms] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { success, error } = useNotification();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit({
        patientName: user.name,
        patientId: user.id,
        doctorId: doctor.id,
        symptoms,
        timestamp: new Date().toISOString(),
      });
      success('Consultation request submitted successfully');
      setSymptoms('');
    } catch (err) {
      error('Failed to submit consultation request');
    } finally {
      setLoading(false);
    }
  };

  return (
    <VStack as="form" onSubmit={handleSubmit} spacing="6" align="stretch">
      <FormControl isRequired>
        <FormLabel>Describe your symptoms</FormLabel>
        <Textarea
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
          placeholder="Please describe your symptoms in detail..."
          minH="150px"
        />
      </FormControl>

      <Button
        type="submit"
        isLoading={loading}
        bgGradient="linear(to-r, brand.primary.500, #6F3AFA)"
        color="white"
        _hover={{ opacity: 0.9 }}
      >
        Request Consultation
      </Button>
    </VStack>
  );
};

export default ConsultForm;
