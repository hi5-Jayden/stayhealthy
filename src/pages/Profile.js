// src/pages/Profile.js
import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  SimpleGrid,
  VStack,
  HStack,
  Heading,
  Text,
  Button,
  Avatar,
  Card,
  CardBody,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Badge,
  List,
  ListItem,
  Divider,
  useDisclosure,
  Center,
  Spinner,
} from '@chakra-ui/react';
import { Edit2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import ProfileAppointmentsList from '../components/profile/ProfileAppointmentsList';
import MedicalReportsList from '../components/profile/MedicalReportsList';
import EditProfileModal from '../components/profile/EditProfileModal';
import ConsultationHistoryView from '../components/profile/ConsultationHistoryView';
import { ProfileSkeleton } from '../components/common/LoadingSkeletons';

// Profile page component
const Profile = () => {
  const { user } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const loadProfileData = async () => {
      setLoading(true);
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setProfileData({
          // In real app, this would come from API
          name: user?.name,
          email: user?.email,
          phone: user?.phone,
          type: user?.type,
          profilePicture: user?.profilePicture,
        });
      } catch (error) {
        console.error('Failed to load profile:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProfileData();
  }, [user]);

  if (loading) {
    return (
      <Container maxW="6xl" py={8}>
        <SimpleGrid columns={{ base: 1, md: 4 }} spacing={8}>
          {/* Profile Summary Skeleton */}
          <ProfileSkeleton />

          {/* Main Content Skeleton */}
          <Card gridColumn={{ base: 'span 1', md: 'span 3' }}>
            <CardBody>
              <VStack spacing={6} align="stretch">
                <HStack spacing={4}>
                  {[...Array(3)].map((_, i) => (
                    <Box
                      key={i}
                      height="10"
                      width="24"
                      bg="gray.100"
                      borderRadius="md"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                  ))}
                </HStack>
                <Box height="400px" bg="gray.50" borderRadius="lg" p={6}>
                  <Center h="full">
                    <Spinner size="xl" color="blue.500" />
                  </Center>
                </Box>
              </VStack>
            </CardBody>
          </Card>
        </SimpleGrid>
      </Container>
    );
  }

  return (
    <Container maxW="6xl" py={8}>
      <SimpleGrid columns={{ base: 1, md: 4 }} spacing={8}>
        {/* Profile Summary */}
        <Card gridColumn={{ base: 'span 1', md: 'span 1' }}>
          <CardBody>
            <VStack spacing={4} align="center">
              <Avatar
                size="2xl"
                name={profileData?.name}
                src={profileData?.profilePicture}
              />
              <VStack spacing={1}>
                <Heading size="md">{profileData?.name}</Heading>
                <Text color="gray.600">{profileData?.email}</Text>
                <Badge>{profileData?.type}</Badge>
              </VStack>
              <Button
                leftIcon={<Edit2 size={16} />}
                variant="outline"
                size="sm"
                w="full"
                onClick={onOpen}
              >
                Edit Profile
              </Button>
            </VStack>
          </CardBody>
        </Card>

        {/* Main Content */}
        <Card gridColumn={{ base: 'span 1', md: 'span 3' }}>
          <CardBody>
            <Tabs onChange={setActiveTab} colorScheme="blue">
              <TabList>
                <Tab>Appointments</Tab>
                <Tab>Medical Reports</Tab>
                <Tab>Personal Info</Tab>
              </TabList>

              <TabPanels>
                <TabPanel>
                  <ProfileAppointmentsList />
                </TabPanel>

                <TabPanel>
                  <MedicalReportsList />
                </TabPanel>

                <TabPanel>
                  <VStack align="stretch" spacing={6}>
                    <Heading size="md">Personal Information</Heading>
                    <List spacing={4}>
                      <ListItem>
                        <Text color="gray.600">Full Name</Text>
                        <Text fontWeight="medium">{profileData?.name}</Text>
                      </ListItem>
                      <Divider />
                      <ListItem>
                        <Text color="gray.600">Email</Text>
                        <Text fontWeight="medium">{profileData?.email}</Text>
                      </ListItem>
                      <Divider />
                      <ListItem>
                        <Text color="gray.600">Phone</Text>
                        <Text fontWeight="medium">{profileData?.phone}</Text>
                      </ListItem>
                      <Divider />
                      <ListItem>
                        <Text color="gray.600">Account Type</Text>
                        <Text fontWeight="medium">{profileData?.type}</Text>
                      </ListItem>
                    </List>
                  </VStack>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </CardBody>
        </Card>
      </SimpleGrid>

      {/* Edit Profile Modal */}
      <EditProfileModal
        isOpen={isOpen}
        onClose={onClose}
        currentUser={profileData}
      />
    </Container>
  );
};

export default Profile;
