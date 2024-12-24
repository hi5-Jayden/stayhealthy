// src/pages/DoctorProfile.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Button,
  useToast,
  Center,
  Spinner,
  Text,
  VStack,
} from '@chakra-ui/react';
import { ArrowLeft } from 'lucide-react';
import { useDoctor } from '../context/DoctorContext';
import DoctorProfileComponent from '../components/doctors/DoctorProfile';

const DoctorProfilePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { fetchDoctorById, loading, error } = useDoctor();
  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
    const loadDoctor = async () => {
      const doctorData = await fetchDoctorById(id);
      if (doctorData) {
        setDoctor(doctorData);
      }
    };

    loadDoctor();
  }, [id, fetchDoctorById]);

  if (loading) {
    return (
      <Center minH="60vh">
        <Spinner size="xl" color="blue.500" />
      </Center>
    );
  }

  if (error || !doctor) {
    return (
      <Container maxW="1200px" py={8}>
        <Button
          leftIcon={<ArrowLeft size={16} />}
          variant="ghost"
          mb={6}
          onClick={() => navigate('/doctors')}
        >
          Back to Search
        </Button>
        <Center minH="40vh">
          <VStack spacing={4}>
            <Text color="red.500">{error || 'Doctor not found'}</Text>
            <Button colorScheme="blue" onClick={() => navigate('/doctors')}>
              View All Doctors
            </Button>
          </VStack>
        </Center>
      </Container>
    );
  }

  return (
    <Box py={4}>
      <Container maxW="1200px">
        <Button
          leftIcon={<ArrowLeft size={16} />}
          variant="ghost"
          mb={6}
          onClick={() => navigate('/doctors')}
        >
          Back to Search
        </Button>

        <DoctorProfileComponent doctor={doctor} />
      </Container>
    </Box>
  );
};

export default DoctorProfilePage;
