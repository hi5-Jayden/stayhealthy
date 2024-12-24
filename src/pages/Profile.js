// src/pages/Profile.js
import React, { useState } from 'react';
import {
  Box,
  Container,
  SimpleGrid,
  VStack,
  HStack, // Added missing import
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
} from '@chakra-ui/react';
import { Calendar, Clock, FileText, Edit2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext'; // Fixed import path
import { useNotification } from '../context/NotificationContext'; // Fixed import path

// Import the missing components
import ProfileAppointmentsList from '../components/profile/ProfileAppointmentsList';
import MedicalReportsList from '../components/profile/MedicalReportsList';
import EditProfileModal from '../components/profile/EditProfileModal';

const Profile = () => {
  const { user } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [activeTab, setActiveTab] = useState(0);

  return (
    <Container maxW="6xl" py={8}>
      <SimpleGrid columns={{ base: 1, md: 4 }} spacing={8}>
        {/* Profile Summary */}
        <Card gridColumn={{ base: 'span 1', md: 'span 1' }}>
          <CardBody>
            <VStack spacing={4} align="center">
              <Avatar size="2xl" name={user?.name} src={user?.profilePicture} />
              <VStack spacing={1}>
                <Heading size="md">{user?.name}</Heading>
                <Text color="gray.600">{user?.email}</Text>
                <Badge>{user?.type}</Badge>
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
                  <VStack align="stretch" spacing={4}>
                    <Heading size="md" mb={4}>
                      Your Appointments
                    </Heading>
                    <ProfileAppointmentsList />
                  </VStack>
                </TabPanel>

                <TabPanel>
                  <VStack align="stretch" spacing={4}>
                    <Heading size="md" mb={4}>
                      Medical Reports
                    </Heading>
                    <MedicalReportsList />
                  </VStack>
                </TabPanel>

                <TabPanel>
                  <VStack align="stretch" spacing={6}>
                    <Heading size="md">Personal Information</Heading>
                    <List spacing={4}>
                      <ListItem>
                        <Text color="gray.600">Full Name</Text>
                        <Text fontWeight="medium">{user?.name}</Text>
                      </ListItem>
                      <Divider />
                      <ListItem>
                        <Text color="gray.600">Email</Text>
                        <Text fontWeight="medium">{user?.email}</Text>
                      </ListItem>
                      <Divider />
                      <ListItem>
                        <Text color="gray.600">Phone</Text>
                        <Text fontWeight="medium">{user?.phone}</Text>
                      </ListItem>
                      <Divider />
                      <ListItem>
                        <Text color="gray.600">Account Type</Text>
                        <Text fontWeight="medium">{user?.type}</Text>
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
      <EditProfileModal isOpen={isOpen} onClose={onClose} currentUser={user} />
    </Container>
  );
};

export default Profile;
