// src/pages/DoctorProfile.js
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Container, Button, useToast } from '@chakra-ui/react';
import { ArrowLeft } from 'lucide-react';
import DoctorProfileComponent from '../components/doctors/DoctorProfile';

const DoctorProfilePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();

  // In a real app, fetch doctor data based on id
  const doctorData = {
    // ... doctor data would be fetched here
  };

  return (
    <Box py={4}>
      <Container maxW="1200px">
        <Button
          leftIcon={<ArrowLeft size={16} />}
          variant="ghost"
          mb={6}
          onClick={() => navigate(-1)}
        >
          Back to Search
        </Button>

        <DoctorProfileComponent doctor={doctorData} />
      </Container>
    </Box>
  );
};

export default DoctorProfilePage;
