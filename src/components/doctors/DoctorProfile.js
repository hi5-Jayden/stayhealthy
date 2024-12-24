import React, { useState } from 'react';
import {
  Box,
  Container,
  SimpleGrid,
  VStack,
  HStack,
  Heading,
  Text,
  Image,
  Button,
  Badge,
  Card,
  CardBody,
  Tab,
  Tabs,
  TabList,
  TabPanel,
  TabPanels,
  useDisclosure,
  Avatar,
} from '@chakra-ui/react';
import { Calendar, Clock, MapPin, Star, Award, FileText } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import ReviewsList from '../reviews/ReviewsList';
import AppointmentForm from '../services/BookAppointment/AppointmentForm';
import Modal from '../common/Modal';

const DoctorProfile = ({ doctor }) => {
  const { isAuthenticated } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedTab, setSelectedTab] = useState(0);

  // In a real app, these would come from an API
  const doctorInfo = {
    id: 'cardio-1',
    name: 'Dr. John Wilson',
    specialization: 'Cardiologist',
    experience: 15,
    rating: 4.8,
    image: 'dr-cardio-1.jpg',
    availableSlots: ['09:00', '10:00', '14:00'],
    consultationFee: 150,
    education: [
      'MD - Cardiology, Stanford University',
      'MBBS - Harvard Medical School',
    ],
    certifications: [
      'American Board of Cardiology',
      'European Society of Cardiology Member',
    ],
    expertise: [
      'Heart Disease Prevention',
      'Cardiac Rehabilitation',
      'Interventional Cardiology',
    ],
    location: 'Medical Center, 123 Healthcare Ave',
    languages: ['English', 'Spanish'],
  };

  return (
    <Container maxW="1200px" py={8}>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
        {/* Left Column - Doctor Info */}
        <Card gridColumn={{ base: 'span 1', md: 'span 2' }}>
          <CardBody>
            <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={6}>
              <VStack align="center" spacing={4}>
                <Avatar
                  size="2xl"
                  name={doctorInfo.name}
                  src="/api/placeholder/200/200"
                />
                <VStack spacing={1} align="center">
                  <Heading size="lg">{doctorInfo.name}</Heading>
                  <Text color="gray.600">{doctorInfo.specialization}</Text>
                  <HStack>
                    <Star size={16} fill="gold" stroke="gold" />
                    <Text>
                      {doctorInfo.rating} ({doctorInfo.reviews} reviews)
                    </Text>
                  </HStack>
                </VStack>
              </VStack>

              <VStack align="start" spacing={4}>
                <HStack>
                  <Award size={20} className="text-blue-500" />
                  <Text>{doctorInfo.experience} Years Experience</Text>
                </HStack>
                <HStack>
                  <MapPin size={20} className="text-blue-500" />
                  <Text>{doctorInfo.location}</Text>
                </HStack>
                <HStack>
                  <FileText size={20} className="text-blue-500" />
                  <Text>${doctorInfo.consultationFee} per visit</Text>
                </HStack>
                <Button
                  w="full"
                  bgGradient="linear(to-r, brand.primary.500, #6F3AFA)"
                  color="white"
                  _hover={{ opacity: 0.9 }}
                  onClick={onOpen}
                >
                  Book Appointment
                </Button>
              </VStack>
            </SimpleGrid>
          </CardBody>
        </Card>

        {/* Right Column - Availability */}
        <Card>
          <CardBody>
            <VStack align="stretch" spacing={4}>
              <Heading size="md">Available Time Slots</Heading>
              <VStack align="stretch">
                {doctorInfo.availableSlots.map((slot) => (
                  <Button
                    key={slot}
                    variant="outline"
                    leftIcon={<Clock size={16} />}
                    justifyContent="start"
                    onClick={onOpen}
                  >
                    {slot}
                  </Button>
                ))}
              </VStack>
            </VStack>
          </CardBody>
        </Card>
      </SimpleGrid>

      {/* Tabs Section */}
      <Box mt={8}>
        <Tabs onChange={setSelectedTab} colorScheme="blue">
          <TabList>
            <Tab>Overview</Tab>
            <Tab>Experience & Education</Tab>
            <Tab>Reviews</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                <VStack align="start" spacing={4}>
                  <Heading size="md">Expertise</Heading>
                  <VStack align="start" spacing={2}>
                    {doctorInfo.expertise.map((item, index) => (
                      <HStack key={index}>
                        <Box w={2} h={2} borderRadius="full" bg="blue.500" />
                        <Text>{item}</Text>
                      </HStack>
                    ))}
                  </VStack>
                </VStack>

                <VStack align="start" spacing={4}>
                  <Heading size="md">Languages</Heading>
                  <HStack spacing={2} flexWrap="wrap">
                    {doctorInfo.languages.map((lang) => (
                      <Badge key={lang} colorScheme="blue">
                        {lang}
                      </Badge>
                    ))}
                  </HStack>
                </VStack>
              </SimpleGrid>
            </TabPanel>

            <TabPanel>
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                <VStack align="start" spacing={4}>
                  <Heading size="md">Education</Heading>
                  <VStack align="start" spacing={2}>
                    {doctorInfo.education.map((edu, index) => (
                      <HStack key={index}>
                        <Box w={2} h={2} borderRadius="full" bg="blue.500" />
                        <Text>{edu}</Text>
                      </HStack>
                    ))}
                  </VStack>
                </VStack>

                <VStack align="start" spacing={4}>
                  <Heading size="md">Certifications</Heading>
                  <VStack align="start" spacing={2}>
                    {doctorInfo.certifications.map((cert, index) => (
                      <HStack key={index}>
                        <Box w={2} h={2} borderRadius="full" bg="blue.500" />
                        <Text>{cert}</Text>
                      </HStack>
                    ))}
                  </VStack>
                </VStack>
              </SimpleGrid>
            </TabPanel>

            <TabPanel>
              <ReviewsList
                doctorId={doctorInfo.id}
                showForm={isAuthenticated}
              />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>

      {/* Booking Modal */}
      <Modal isOpen={isOpen} onClose={onClose} title="Book Appointment">
        <AppointmentForm
          doctor={doctorInfo}
          onSubmit={async (data) => {
            // Handle appointment submission
            onClose();
          }}
        />
      </Modal>
    </Container>
  );
};

export default DoctorProfile;
